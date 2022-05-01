import {GeoJSONLoaded} from "../Model/GeoJSON";

interface IDictionary {
    [index: string]: GeoJSONLoaded;
}
const cache:IDictionary= {};

export const getGeoJSON = async (filename: string) => {
    if (cache[filename]) {
        return cache[filename];
    }
    cache[filename] = new GeoJSONLoaded(filename);
    await cache[filename].load();
    return cache[filename];
}
