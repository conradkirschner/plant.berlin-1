export const BaseDataTab = ({namenr, hausnr, bezirk, kennzeich, pflanzjahr, standalter, eigentuemer, kronedurch, stammumfg}) => {
    return (<>
        <div style={{gap: "20px"}} className={"w-full inline-flex flex-wrap gap-32 text-center"}>
            <div className={"w-full mt-5"}>
                <div className={"font-bold"}>Straße</div>
                <div>{namenr} {hausnr}</div>
            </div>
            <div className={"w-full mt-5"}>
                <div className={"font-bold"}>Bezirksamt</div>
                <div>{bezirk} </div>
            </div>
            <div className={"w-full mt-5"}>
                <div className={"font-bold"}>Kennzeichen</div>
                <div>{kennzeich}</div>
            </div>
            <div className={"w-full mt-5"}>
                <div className={"font-bold"}>Pflanzjahr (Standalter)</div>
                <div>{pflanzjahr} ({standalter})</div>
            </div>
            <div className={"w-full mt-5"}>
                <div className={"font-bold"}>Eigentümer</div>
                <div>{eigentuemer} </div>
            </div>
            <div className={"w-full mt-5"}>
                <div className={"font-bold"}>Kronendurchmesser</div>
                <div>{kronedurch} m</div>
            </div>
            <div className={"w-full mt-5"}>
                <div className={"font-bold"}>Stammumfang</div>
                <div>{stammumfg} cm</div>
            </div>
        </div>
    </>);

}
