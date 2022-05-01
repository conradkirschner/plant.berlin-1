import {BaumscheibenTypes, createNewBaumscheibe} from "../../api-client";

export const BaumscheibenStatusButtons = ({baumId, setBaumscheibenData, refreshAPI}: {baumId: string, setBaumscheibenData: (any)=> void, refreshAPI: ()=> void}) => {
    const reportPlanting = async () => {
        await createNewBaumscheibe(baumId, BaumscheibenTypes.isPlanted);
        setBaumscheibenData({
            status:  BaumscheibenTypes.isPlanted,
            created: 0,
            username: "",
        });
        refreshAPI();
    }
    const reportAvailable = async () => {
        await createNewBaumscheibe(baumId, BaumscheibenTypes.isEmpty)
        setBaumscheibenData({
            status:  BaumscheibenTypes.isEmpty,
            created: 0,
            username: "",
        });
        refreshAPI();

    }
    const reportNotAllowed = async () => {
        await createNewBaumscheibe(baumId, BaumscheibenTypes.notAllowed)
        setBaumscheibenData({
            status:  BaumscheibenTypes.notAllowed,
            created: 0,
            username: "",
        });
        refreshAPI();

    }

    return (
        <div className={"w-full text-2xl text-center mt-5 mb-5"}>
            <button onClick={reportPlanting} className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                Jetzt Bepflanzung melden
            </button>
            <button onClick={reportAvailable} className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                Verfügbar für neue Bepflanzung
            </button>
            <button onClick={reportNotAllowed} className="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                Nicht geeignet für eine Bepflanzung
            </button>
        </div>
    )
}
