import Overlay from "../components/baumscheibeninfo/Overlay";
import {useEffect, useState} from "react";
import {BaumscheibenTypes, getBaumscheibenData, getUserName} from "../api-client";

const DisplayModal = ({data, setData}) => {
    const [baumscheibenData, setBaumscheibenData] = useState(null);
    const [refreshTrigger, setRefresh] = useState(0);
    const refreshAPI = () => {
        setRefresh(refreshTrigger+1);
    }
    useEffect(() => {
        async function fetchBaumscheibenInfo() {
            const requestedBaumscheibenData = await getBaumscheibenData(data.properties.baumid);
            if (requestedBaumscheibenData.status === 204) {
                setBaumscheibenData({status: BaumscheibenTypes.notDefined});
                return;
            }
            if (requestedBaumscheibenData.status === 200) {
                const usernameRequest = await getUserName( requestedBaumscheibenData.data.createFrom.userId);
                if (usernameRequest.status !== 200) return;
                setBaumscheibenData({
                    status: requestedBaumscheibenData.data.type,
                    created: requestedBaumscheibenData.data.createdAt,
                    username: usernameRequest.data.anzeigeName,
                });
            }
        }
        fetchBaumscheibenInfo();
    }, [refreshTrigger])
    return (<>
        <Overlay refreshAPI={refreshAPI} setBaumscheibenData={setBaumscheibenData} setData={setData} baumscheibenData={baumscheibenData}
    title={data.properties.art_dtsch + " (" + data.properties.gattung_deutsch + ")"}
    stammDaten={data.properties}/>
    </>)
}
export default DisplayModal;
