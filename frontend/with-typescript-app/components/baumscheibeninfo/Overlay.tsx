import {useState} from "react";
import {BaseDataTab} from "./BaseDataTab";
import {BaumscheibenTab} from "./BaumscheibenTab";
import {MessagesTab} from "./MessagesTab";

const Overlay = ({title, stammDaten, setData, baumscheibenData, setBaumscheibenData, refreshAPI}) => {
    enum TabSelection {
        Stammdaten,
        Baumscheiben,
        Messages,
    }

    const [selectedTab, setSelectedTab] = useState(TabSelection.Stammdaten);

    const modalState = {isOpen: true}

    const toggleModalAction = () => {
        setData(null);
    }

    const changeTab = (tab: TabSelection) => {
        setSelectedTab(tab);
    }
    return (<>
        <div
            style={{zIndex: 100000}} className={""}>
            <div
                className={`${(modalState.isOpen) ? "" : "  pointer-none-events"} absolute sm:static bg-white top-0 right-0 w-full h-full`}>

                <div onClick={toggleModalAction}
                     className="  cursor-pointer flex flex-col items-center mt-1 mr-1 text-white text-sm z-50">
                    <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                         viewBox="0 0 18 18">
                        <path
                            d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                    </svg>
                </div>

                <div className=" ol text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">{title}</p>
                        <div className="modal-close cursor-pointer z-50" onClick={toggleModalAction}>
                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18"
                                 height="18" viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                            </svg>
                        </div>
                    </div>
                    <div style={{borderBottom: "2px solid #eaeaea"}}>
                        <ul className='flex cursor-pointer'>
                            <li onClick={() => {
                                changeTab(TabSelection.Stammdaten)
                            }}
                                className={`py-2 px-6 bg-white rounded-t-lg  ${(selectedTab === TabSelection.Stammdaten) ? 'text-gray-500 bg-gray-200' : ''} `}>Stammdaten
                            </li>
                            <li onClick={() => {
                                changeTab(TabSelection.Baumscheiben)
                            }}
                                className={`py-2 px-6 bg-white rounded-t-lg  ${(selectedTab === TabSelection.Baumscheiben) ? 'text-gray-500 bg-gray-200' : ''} `}>Baumscheibe
                            </li>
                            {(baumscheibenData?.status !== 3) && <li onClick={() => {
                                changeTab(TabSelection.Messages)
                            }}
                                className={`py-2 px-6 bg-white rounded-t-lg  ${(selectedTab === TabSelection.Messages) ? 'text-gray-500 bg-gray-200' : ''} `}>Nachrichten
                            </li>}
                        </ul>
                    </div>
                    {selectedTab === TabSelection.Stammdaten &&
                    <div id="Stammdaten">
                        <BaseDataTab {...stammDaten} />
                    </div>
                    }
                    {selectedTab === TabSelection.Baumscheiben &&
                    <div id="BaumscheibenDaten">
                        <BaumscheibenTab refreshAPI={refreshAPI} setBaumscheibenData={setBaumscheibenData} baumscheibenData={baumscheibenData}
                                         baumId={stammDaten.baumid}/>
                    </div>
                    }
                    {(selectedTab === TabSelection.Messages && baumscheibenData?.status !== 3) &&
                    <div id="Kommentare">
                        <MessagesTab baumId={stammDaten.baumid}/>
                    </div>
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Overlay;
