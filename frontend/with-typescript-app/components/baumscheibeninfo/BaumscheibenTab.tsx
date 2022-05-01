import {GalleryImage} from "./GalleryImage";
import {BaumscheibenStatusBox} from "./BaumscheibenStatusBox";
import {ImageGallery} from "./ImageGallery";


export const BaumscheibenTab = ({baumId, baumscheibenData, setBaumscheibenData, refreshAPI}) => {

    return (
        <>
            <BaumscheibenStatusBox
                refreshAPI={refreshAPI}
                status={baumscheibenData.status}
                baumId={baumId}
                created={baumscheibenData?.created}
                user={baumscheibenData?.username}
                setBaumscheibenData={setBaumscheibenData}
            />
       <ImageGallery baumId={baumId}/>
    </>);
}
