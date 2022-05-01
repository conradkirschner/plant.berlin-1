
const template = document.createElement('template');
template.innerHTML = `
<?xml version="1.0" encoding="UTF-8"?>
<style>body {
  text-align: center;
}
g {
stroke: "green"
}

svg {
  top: 30vh;
  position: relative;
}
</style>
<svg width="237px" height="255px" viewBox="0 0 237 255" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
    <title>Page 1</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Welcome" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g transform="translate(-589.000000, -2185.000000)" stroke="#000000" stroke-width="4">
            <g id="Page-1" transform="translate(591.000000, 2187.000000)">
                <g class="stems">
                  <path class="main-stem" d="M133.4414,160.118 L133.4414,31.451" id="Stroke-7"></path>
                  <path class="outer-stems" style="-webkit-transition-delay: 2s;
  transition-delay: 2s;" d="M133.4416,146.522 L72.3706,85.451" id="Stroke-15"></path>
                  <path class="outer-stems" d="M133.8455,146.522 194.9165,85.451" id="Stroke-13"></path>
              </g>
                <g class="leaves">
                  <path d="M133.4414,98.0008 C133.4414,98.0008 185.4414,78.0008 133.4414,0.0008 C81.4414,78.0008 133.4414,98.0008 133.4414,98.0008" id="Stroke-1"></path>
                  <path d="M159.3208,121.0467 C159.3208,121.0467 200.5998,139.3927 215.5058,64.8617 C140.9748,79.7687 159.3208,121.0467 159.3208,121.0467" id="Stroke-3"></path>
                  <path d="M107.9663,121.0467 C107.9663,121.0467 66.6873,139.3927 51.7813,64.8617 C126.3123,79.7687 107.9663,121.0467 107.9663,121.0467" id="Stroke-5"></path>
                  <g class="leaves-detail">
                    <path d="M90.75,103.8309 L90.75,90.9489" id="Stroke-9"></path>
                    <path d="M175.25,103.8309 L175.25,90.9489" id="Stroke-11"></path>
                    <path d="M77.4316,104.8309 L90.3126,104.8309" id="Stroke-23"></path>
                    <path d="M147.0195,56.3377 L133.4415,69.9157" id="Stroke-25"></path>
                    <path d="M141.5762,43.1444 L133.4412,51.2794" id="Stroke-27"></path>
                    <path d="M119.8633,56.3377 L133.4413,69.9157" id="Stroke-17"></path>
                    <path d="M125.3066,43.1444 L133.4416,51.2794" id="Stroke-19"></path>
                    <path d="M175.25,104.8309 L188.131,104.8309" id="Stroke-21"></path>
                  </g>
                </g>
                <g class="hand">
                  <polyline id="Stroke-29" points="0 176.951 39 176.951 39 250.451 0 250.451"></polyline>
                  <path d="M39,191.201 C39,191.201 47,192.701 48.5,193.451 C50,194.201 58.25,190.951 70,186.701 C81.75,182.451 79.126,179.451 90.313,179.951 C101.5,180.451 103.176,180.201 109.963,182.201 C116.75,184.201 119.75,185.701 128,185.701 C136.25,185.701 145,183.951 154.5,182.201 C164,180.451 164.818,179.937 165.75,179.896 C169,179.753 174.5,178.201 176.5,183.701 C178.5,189.201 178.25,194.118 175.25,197.451" id="Stroke-31"></path>
                  <path d="M225,199.5516 C225,189.5336 219.25,187.9506 213,187.4356 C206.75,186.9196 198.25,191.9506 189.75,195.1176 C181.25,198.2836 163.75,200.4506 156.553,202.2006 C149.355,203.9506 141.25,205.9506 129.374,208.7006 C117.498,211.4506 122,208.9506 106.5,213.7006 C91,218.4506 92.25,217.4506 92.25,217.4506" id="Stroke-33"></path>
                  <path d="M64.0483,188.6473 C70.1213,172.4103 98.5983,160.1183 132.8343,160.1183 C167.8373,160.1183 196.8373,172.9633 202.0113,189.7403" id="Stroke-35"></path>
                  <path d="M144.0479,227.5828 C150.0479,226.5828 158.0479,223.9168 164.3809,221.5828 C170.7149,219.2498 188.2499,212.3678 197.9169,208.7838 C207.5839,205.2008 222.4169,200.9028 224.9999,199.5518 C227.5839,198.2008 233.4169,201.9508 232.9999,211.7008 C232.9999,211.7008 200.4999,223.7008 190.7499,227.4508 C180.9999,231.2008 175.9999,233.2008 168.9999,236.4448 C161.9999,239.6888 151.7499,241.2008 151.7499,241.2008 L146.4999,241.2008 C141.2499,241.2008 109.4999,236.2008 108.7499,235.7008 C107.9999,235.2008 78.4999,231.9508 67.7499,231.7008 C56.9999,231.4508 38.9999,235.4508 38.9999,235.7008" id="Stroke-37"></path>
                </g>
            </g>
        </g>
    </g>
</svg>

`;

export class PlantAnimationComponent extends HTMLElement{
    params = {handcolor: "black", stemcolor: "brown", leafcolor: "green"};
    blockUpdate = false;

    postEvent = (name,data) => {
        if (name === "positionChanged") {
            this.blockUpdate = true;
            setTimeout(() => {this.blockUpdate = false;}, 350);
        }
        const publishEvent = new CustomEvent(name, {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: data,
        });
        this.dispatchEvent(publishEvent);
    }
    constructor(){
        super();
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        // this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }
    static get observedAttributes() {
        return ['handcolor', 'stemcolor', "leafcolor"];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (this.blockUpdate) return;

        if (oldVal !== newVal) {
            this.params[attrName] = newVal;
            this.render();
            console.log("attr:changed", attrName, oldVal, newVal)
        }
    }
    connectedCallback(){
        // this.h3 = this.getAttribute("name")
        console.log("connected")
        this.render();
    }
    disconnectedCallback() {
        console.log('disconnected from the DOM');
    }
    render(){
        console.log("rendering");


        this._drawHand();
        this._drawMainStem();
        this._drawStems();
        this._drawLeaves();
    }
        _drawHand() {
            var paths = this.shadowRoot.querySelectorAll('.hand');
            for (var i = 0; i < paths.length; i++) {
                var path = paths[i];
                path.style.stroke = this.params.handcolor;
            }
        }
        _drawMainStem() {
            var paths = this.shadowRoot.querySelectorAll('.main-stem');
            for (var i = 0; i < paths.length; i++) {
                var path = paths[i];
                var length = path.getTotalLength();
                path.style.transition = path.style.WebkitTransition = 'none';
                path.style.strokeDasharray = length + ' ' + length;
                path.style.strokeDashoffset = length;
                path.getBoundingClientRect();
                path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 4s 0s ease-in-out';
                path.style.strokeDashoffset = '0';
                path.style.stroke = this.params.stemcolor;
            }
        }

        _drawStems() {
            var paths = this.shadowRoot.querySelectorAll('.outer-stems');
            for (var i = 0; i < paths.length; i++) {
                var path = paths[i];
                var length = path.getTotalLength();
                path.style.transition = path.style.WebkitTransition = 'none';
                path.style.strokeDasharray = length + ' ' + length;
                path.style.strokeDashoffset = length;
                path.getBoundingClientRect();
                path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 3s 1s ease-in-out';
                path.style.strokeDashoffset = '0';
                path.style.stroke = this.params.stemcolor;

            }
        }


        _drawLeaves() {
            var paths = this.shadowRoot.querySelectorAll('.leaves path');
            for (var i = 0; i < paths.length; i++) {
                var path = paths[i];
                var length = path.getTotalLength();
                path.style.transition = path.style.WebkitTransition = 'none';
                path.style.strokeDasharray = length + ' ' + length;
                path.style.strokeDashoffset = length;
                path.getBoundingClientRect();
                path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 4s 2.5s ease-in-out';
                path.style.strokeDashoffset = '0';
                path.style.stroke = this.params.leafcolor;

            }
        }
}
window.customElements.define('plant-animation-component', PlantAnimationComponent);
