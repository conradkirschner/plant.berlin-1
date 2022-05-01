/**
 * My first web component
 */
const template = document.createElement('template');
template.innerHTML = `
    <link rel="stylesheet" href="https://d19vzq90twjlae.cloudfront.net/leaflet-0.7/leaflet.css" />
    <div id="map" style=" width:100%; height: 100%;"></div>
`;

/**
 * Use the lat,long,zoom from parent as init values
 * populate it to parent if changed
 */
export class MapComponent extends HTMLElement{
    geojsonFile = "/api/protected/tiles/tiles/custom/baumbestandnew";

    map = null;
    params = null;
    currentDraw = null;
    blocker = false;

    postEvent = (name,data) => {
        this.blocker = true;
        setTimeout(() => {this.blocker = false}, 1000)
        const checkEvent = new CustomEvent(name, {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: data,
        });
        this.dispatchEvent(checkEvent);

    }
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));


        this.addEventListener('error',(event) => {
            console.log(event);
        });


        if(!window.leafletLoaded) {
            this.loadLeaflet();
        }
    }

    static get observedAttributes() {
        return ['lat', 'long', 'zoom'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.blocker) return;
        if (this.params) {
            this.params[name] = newValue;
        }
        console.log(`${name}'s value has been changed from ${oldValue} to ${newValue}`);
        if (this.map) {
            this.map.setView([this.params['lat'], this.params['long']], this.params.zoom);
        }
    }
    loadLeaflet() {
        window.leafletLoaded = true; // avoid loading it twice

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://d19vzq90twjlae.cloudfront.net/leaflet-0.7/leaflet.js";
        script.async = true;
        script.crossorigin="anonymous";
        this.shadowRoot.appendChild(script);

        script.onload = () => {
            this._initMap();
            if(!window.d3Loaded) {
                this.map.options.maxZoom = 19;

                this.loadD3()
            }
        }
    }
    loadD3() {
        window.d3Loaded = true; // avoid loading it twice
        const d3Loader = document.createElement('script');
        d3Loader.type = 'text/javascript';
        d3Loader.src = "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js";
        d3Loader.async = true;
        d3Loader.crossorigin="anonymous";
        d3Loader.onload = () => {
            this._initOverlay();
        }
        this.shadowRoot.appendChild(d3Loader);
    }
    connectedCallback(){
        const lat =  this.getAttribute("lat");
        const long =  this.getAttribute("long");
        const zoom =  this.getAttribute("zoom");
        this.params = {lat,long,zoom};
        this.render();
    }
    disconnectedCallback() {
        this.map.removeEventListener('dragend');
        this.map.removeEventListener('zoomed');

    }
    render(){
        console.log("rendering");
        this._updateMap();
        this._updateD3();
        this.h3;
    }
    _updateMap() {
        if(! this.map) {
            return;
        }
        this.map.setView([this.params['lat'], this.params['long']], this.params.zoom);
        console.log('updated map',[this.params['lat'], this.params['long']], this.params.zoom);
    }
    _updateD3() {
        if(! this.map) return;
        if (this.currentDraw && this.currentDraw.length !== 0) {
            for (let i = 0 ; i < this.currentDraw[0].length; i++) {
                this.currentDraw[0][i].remove();
            }
        }
    }
    _initMap() {
        console.info("[MAP] parameter:" , this.params)
        this.map = L.map(this.shadowRoot.getElementById("map")).setView([this.params['lat'], this.params['long']], this.params.zoom);
        this.map.addEventListener('dragend', (ev) => {
            this.postEvent("positionChanged",{
                position: this.map.getCenter(),
                zoom: this.map.getZoom()
            })
        });
        this.map.addEventListener('zoomend', (ev) => {
            if (this.map.getZoom() <= 20) return;
            console.log(ev);
            this.postEvent("positionChanged",{
               position: this.map.getCenter(),
               zoom: this.map.getZoom()
            })
        });

        const mapLink =
            '<a href="http://openstreetmap.org">OpenStreetMap</a> Contributors & '+
            '<a href="https://www.govdata.de/dl-de/by-2-0">„dl-de/by-2-0" - "Geoportal Berlin / Baumbestand Berlin".</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink ,
                maxZoom: 20,
            }).addTo( this.map);

        /* Initialize the SVG layer */
        this.map._initPathRoot()
    }
    _initOverlay() {
        const limit = 500;
        const testBaumIds = ["00008100:00169344"];


        const clicked = async (data) => {
            this.postEvent('checked', {data, dom: null});
        }

        const svg = d3.select(this.shadowRoot.getElementById("map")).select("svg"),
            g = svg.append("g");

        const getTileURL = (mapBoundaries) => {
            return `${this.geojsonFile}/${mapBoundaries._northEast.lat}/${mapBoundaries._northEast.lng}/${mapBoundaries._southWest.lat}/${mapBoundaries._southWest.lng}?limit=${limit}`
        }
        const loadD3 = () => {
            d3.json(getTileURL(this.map.getBounds()), (collection) => {
                if (!collection) {
                    this.postEvent("error", new Error("Could not connect to tile server"))
                    return;
                }
                /* Add a LatLng object to each item in the dataset */
                collection.features.forEach((d) => {
                    d.LatLng = new L.LatLng(d.geometry.coordinates[1],
                        d.geometry.coordinates[0])
                })
                this._updateD3()

                // collection.features = [collection.features[0], collection.features[1]]
                this.currentDraw = g.selectAll("features")
                    .data(collection.features)
                    .enter().append("circle")
                    .style("stroke", "black")
                    .style("opacity", .6)
                    .style("fill", (e)=> {
                        /*
enum BaumscheibenTypes {
    isEmpty = 0,
    notAllowed = 1,
    isPlanted = 2,
    notDefined = 3,
}
* */
                        if (e.properties.baumscheibenStatus === 0) {
                            return 'green';
                        }
                        if (e.properties.baumscheibenStatus === 1) {
                            return 'red';
                        }
                        if (e.properties.baumscheibenStatus === 2) {
                            return 'gray';
                        }
                        if (e.properties.baumscheibenStatus === 3) {
                            return 'blue';
                        }
                        return 'blue';
                    })

                    .attr("data-json", (e) => JSON.stringify({result: (e.properties.baumid.indexOf(testBaumIds[0]) !== -1)}))
                    .attr("r", 1.1*(this.params.zoom))
                    .on("click", clicked)
                    .on("touch", clicked)
                    .on("touchstart", clicked);

                this.currentDraw.attr("transform",
                        (d) => {
                            return "translate("+
                                this.map.latLngToLayerPoint(d.LatLng).x +","+
                                this.map.latLngToLayerPoint(d.LatLng).y +")";
                        }
                    )
            })
        }
        this.map.on("moveend", loadD3);
        loadD3();
    }
}
window.customElements.define('map-component', MapComponent);
