import geojsonvt from 'geojson-vt';
import {readFileSync} from "fs";
import * as Path from "path";
var BoundingBox = require('boundingbox')


function inBounds(point:[number, number], bounds: Array<[number, number]>) {
    var bbox = new BoundingBox({ minlat: bounds[0][0], minlon:  bounds[0][1], maxlat: bounds[1][0], maxlon:  bounds[1][1] })
    var bbox2 = new BoundingBox({ lat: point[0], lon: point[1] })
    const result = bbox2.within(bbox);
    // console.log({point, bounds}, result);
    return result;
}

function *filter(array: any[], condition:(any:any) => boolean, maxSize:number) {
    if (!maxSize || maxSize > array.length) {
        maxSize = array.length;
    }
    let count = 0;
    let i = 0;
    while ( count< maxSize && i < array.length ) {
        if (condition(array[i])) {
            yield array[i];
            count++;
        }
        i++;
    }
}

export class GeoJSONLoaded {
    geoJSON: string | any;
    loaded= false;
    filename: string | undefined;
    geoJSONtileIndex: any;

    constructor(filename: string) {
        this.filename = filename;
    }

    async load() {
        console.log(__dirname);
        const fileText = readFileSync(Path.join(__dirname, "../../../data/"+this.filename+'.geojson'), 'utf-8').toString();
        // build an initial index of tiles
        if (typeof fileText === "string") {
            this.geoJSON =JSON.parse(fileText) as any;
            this.geoJSONtileIndex = geojsonvt(this.geoJSON)

            this.loaded = true;
        }
    }
    async getTileExtract(z: number,x: number,y: number) {
        if (!this.loaded) {
            await this.load();
        }
        // build an initial index of tiles


// request a particular tile
        var features = this.geoJSONtileIndex.getTile(z, x, y);
        if (!features) {
            return {};
        }
// show an array of tile coordinates created so far
        console.log(this.geoJSONtileIndex.tileCoords); // [{z: 0, x: 0, y: 0}, ...]
        console.log(features.length); // [{z: 0, x: 0, y: 0}, ...]
        return features
    }
    async getOwnExtract(slat: number,slong:number,nlat:number,nlong:number, limit: number) {
        if (!this.loaded) {
            await this.load();
        }
        debugger;
        const result = Array.from( filter(this.geoJSON.features, (e:any)=> {
            const isInBounding = inBounds( [
                    e.geometry.coordinates[1],
                    e.geometry.coordinates[0]
                ],
                [
                    [nlat,nlong],
                    [slat, slong]
                ]
            );
            return isInBounding;
        }, limit ) )

        debugger;
        return {features: result};
    }
}
