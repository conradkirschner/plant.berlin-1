import axios from "axios";

export const resolveAddress = async (streetname) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(streetname)}&format=json&polygon=0&addressdetails=0`);
        return [response?.data[0].lat, response?.data[0].lon];
    } catch (e) {
        throw new Error("Could not find address")
    }

}
