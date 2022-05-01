import {useEffect,useState} from "react";
import {resolveAddress} from "../api-client/external-address-resolver";
// 52.520008, 13.404954,12
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "map-component": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {lat: number, long: number, zoom:number, load: boolean};
        }
    }
}

export default function Map({setData,data, lat,long,zoom, height, followPosition}) {

    const [position,setPostion] = useState({lat: 52.518831258,long:  13.385498458,zoom: null});
    const [addressInput,setAddressInput] = useState("");

    useEffect(() => {
        let myPosition;
        import("../public/web-components/map.js")
        import("../public/web-components/plant-animation.js")

        const handler = event => {
            const zoom = event.detail.zoom;
            const lat = event.detail.position.lat;
            const long = event.detail.position.lng;
            setPostion({lat,long,zoom})
            // setPostion([myPosition.coords.latitude, myPosition.coords.longitude, 1])

        }
        const checkHandler = event => {
            const data =event.detail.data;
            setData(data);
        }
        if (followPosition !== null) {
            setInterval(GPStoMap, followPosition);
        }
        GPStoMap();
        function GPStoMap() {
            navigator.geolocation.getCurrentPosition(function(position) {
                myPosition= position;
                setPostion({lat:position.coords.latitude,long:position.coords.longitude,zoom})

                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            });
        }
        // window.addEventListener("check", handler)
        window.addEventListener("error",(event) => console.error(JSON.stringify(`${event.type}: ${event.message}\n`)));
        window.addEventListener("checked", checkHandler)
        window.addEventListener("positionChanged", handler)

        // clean up
        return () => {
            window.removeEventListener("checked", handler)
            window.removeEventListener("positionChanged", handler)
        }
    }, []) // empty array => run only once



    const changeAddressInput = (event) => {
        setAddressInput(event.target.value)
    }
    const resolveAddressInput = async () => {
        try {
            const [lat, long] = await resolveAddress(addressInput);
            console.log(lat,long);
            const eventSetGPS = new CustomEvent('x-increment', {
                bubbles: true,  // bubble event to containing elements
                composed: true, // let the event pass through the shadowDOM boundary
                detail: {       // an object to hold any custom data that's attached to this event
                    lat, long
                }
            });
            // @ts-ignore
            eventSetGPS.lat= lat;
            // @ts-ignore
            eventSetGPS.long = long;
            // @ts-ignore
            eventSetGPS.zoom = zoom;
            window.dispatchEvent(eventSetGPS);

            setPostion({lat, long, zoom: 18})
        } catch (e) {
            console.error(e.message);
        }

    }
    return (<div className={"w-full"} style={{height}}>
        <div  className="m-2"><label htmlFor={"addressInput"}>
            <input id={"addressInput"}  onChange={changeAddressInput} placeholder="Dein Straßenname" value={addressInput}
                   className="px-3 py-3 mr-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-1/2"
            />
            <button
                className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                onClick={resolveAddressInput}>Auf Adresse zentrieren</button>
        </label>
        </div>
        <map-component lat={position.lat} long={position.long} zoom={position.zoom} load={true}/>
    </div>)
    return (
        <iframe style={{height:"50vh"}} className={"w-full"} src={"http://localhost:3001/map/map-full-geojson.html#lat="+position[0]+"&long="+position[1]+"&zoom=18"}></iframe>)
}

