import axios from "axios";
import {serviceMap} from "../serviceConfiguration";

export enum BaumscheibenTypes {
    isEmpty,
    notAllowed,
    isPlanted,
    notDefined,
}

export const getBaumscheibenData = async (baumId: string) => {
   return await axios.get(`/api/protected/baumscheibe/baumscheibe/${baumId}`);
}

export const createNewBaumscheibe = async (baumId:string, type:BaumscheibenTypes) => {
    const result = await axios.post(`/api/protected/baumscheibe/baumscheibe/`, {
        baumid:baumId,
        type: type,
    });
}

export const updateBaumscheibenStatus = async (baumId:string, type:BaumscheibenTypes) => {
    const result = await axios.patch(`/api/protected/baumscheibe/baumscheibe/`, {
        baumid:baumId,
        type: type,
    });
}
export const getUserName = async (userId: number) =>  {
    return await axios.get(`/api/protected/user/${userId}`);
}
export const getRating = async (baumId: string) => {
    const response = await axios.get(`/api/protected/baumscheibe/baumscheibe/votes/${baumId}`);
    return response.data;
}
export const sendRating = async (baumId: string, rating: number) => {
    await axios.post(`/api/protected/baumscheibe/baumscheibe/votes`, {
        to: baumId,
        rating,
    });

}
/**
 * Uploads picture - Client Side Only Function
 * @param baumId
 * @param picture
 */
export const uploadPictureOfBaumscheibe = async (baumId: string, picture:any) => {
    const formData = new FormData();
    formData.append('file',picture)
    formData.append('to', baumId)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    const response = await axios.post(`/api/protected/baumscheibe/baumscheibe/${baumId}/pictures`, formData, config);
    return (response.status === 200);
}

export const getPicturesOfBaumscheibe = async (baumId: string) => {
    const response = await axios.get(`/api/protected/baumscheibe/baumscheibe/${baumId}/pictures`);
    return response?.data;
}

export const postNewComment = async (baumId: string, message: string) => {
    const response = await axios.post(`/api/protected/baumscheibe/baumscheibe/${baumId}/messages`, {
        message
    });
    return (response.status === 200);
}

export const getComments = async (baumId) => {
    const response = await axios.get(`/api/protected/baumscheibe/baumscheibe/${baumId}/messages`);
    return response?.data;
}

export const getUsername = async (userId) => {
    const response = await axios.get(`/api/protected/user/${userId}`);
    return response?.data;

}
export async function onClick() {
    const myEvent = new CustomEvent('x-increment', {
        bubbles: true,  // bubble event to containing elements
        composed: true, // let the event pass through the shadowDOM boundary
        detail: {       // an object to hold any custom data that's attached to this event
            amount: 1,
        }
    });

    window.dispatchEvent(myEvent);
}
