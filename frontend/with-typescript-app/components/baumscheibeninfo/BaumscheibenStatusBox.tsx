import {RatingSlider} from "./RatingSlider";
import {BaumscheibenStatusButtons} from "./BaumscheibenStatusButtons";
import {BaumscheibenTypes, getRating, sendRating, updateBaumscheibenStatus} from "../../api-client";
import {useEffect, useState} from "react";



export const BaumscheibenStatusBox = ({status, baumId, user, created, setBaumscheibenData, refreshAPI}) => {
    return (
        <>
            {(status === BaumscheibenTypes.isPlanted)?<BaumscheibenStatusExist baumId={baumId} user={user} created={created}/>:''}
            {(status === BaumscheibenTypes.notAllowed)?<BaumscheibenStatusNotAllowed/>:''}
            {(status === BaumscheibenTypes.isEmpty)?<BaumscheibenStatusCanBePlanted refreshAPI={refreshAPI} setBaumscheibenData={setBaumscheibenData} baumId={baumId}/>:''}
            {(status === BaumscheibenTypes.notDefined)?<BaumscheibenStatusButtons refreshAPI={refreshAPI} setBaumscheibenData={setBaumscheibenData} baumId={baumId}/>:''}
        </>

    )
}

const BaumscheibenStatusExist = ({user, created, baumId}) => {
    const [rating, setRating] = useState(null);
    const [ratingAPI, setRatingAPI] = useState(null);
    useEffect(() => {
        const apiCall = async () => {
            const ratingFromAPI = await getRating(baumId);
            setRatingAPI(ratingFromAPI);
        }
        apiCall()
    }, [baumId, rating]);
    return (
        <div className={"w-full text-2xl text-center mt-5 mb-5"}>
            <span
                className="inline-flex items-center justify-center px-2 py-1
                 text-xs font-bold leading-none text-indigo-100 bg-indigo-700 rounded">
                Existierende Baumscheibe
            </span>
            <div>Gemeldet von {user} am {new Date(created).toLocaleDateString()}</div>
            <div>Jetzt Bewerten: </div>
            <div>
                <RatingSlider enabled={true} rating={rating} callback={async (rating) => {
                    await sendRating(baumId,rating);
                    setRating(rating);
                }}/>
                ({ratingAPI}/5)
            </div>
        </div>
    )
}

const BaumscheibenStatusNotAllowed = () => {
    return (
        <div className={"w-full text-2xl text-center mt-5 mb-5"}>
            <span
                className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-700 rounded">
                Dieser Standort eignet sich nicht für eine Baumscheibe
            </span>
        </div>
    )
}

const BaumscheibenStatusCanBePlanted = ({baumId, setBaumscheibenData, refreshAPI}) => {
    const reportPlanting = async () => {
        await updateBaumscheibenStatus(baumId, BaumscheibenTypes.isPlanted);
        refreshAPI();
    }
    return (
        <div className={"w-full text-2xl text-center mt-5 mb-5"}>
            <div
                className="flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-700 rounded">
                Dieser Standort ist noch nicht bepflanzt!
            </div>
            <button onClick={reportPlanting} className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                Jetzt Bepflanzung melden
            </button>
        </div>
    )
}
