import {GalleryImage} from "./GalleryImage";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {getPicturesOfBaumscheibe, uploadPictureOfBaumscheibe} from "../../api-client";
/* @source https://stackoverflow.com/a/36281449 */
async function getBase64(file) {
    return new Promise(((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
           resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error);
        };
    }))
}

const UploadPicture = ({baumId, showUploadFile, setShowUploadFile}) => {
    const [imageToUpload, setImageToUpload] = useState({
        file: null,
        base64: null,
    });

    const showUploadPictureButtonClick = () => {
        setShowUploadFile(!showUploadFile);
    }

    const uploadPictureButtonChange = async (event) => {
        const fileList = event.target.files;
        setImageToUpload({
            base64: await getBase64(fileList[0]),
            file: fileList[0]
        });
    }

    const uploadPictureButtonClick = async () => {
        console.log('base64', imageToUpload);
        const response = await uploadPictureOfBaumscheibe(baumId, imageToUpload.file);
        if (response) {
            setShowUploadFile(false);
            setImageToUpload({
                file: null,
                base64: null,
            });
        }

    }

    return (<div className="mt-3 mb-3">
        <div className="w-full flex flex-wrap w-full justify-end ">
            <button onClick={showUploadPictureButtonClick} className="bg-green-500  hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                Neues Foto hochladen
            </button>
        </div>
        <div className={`flex justify-center mb-5 mt-1 ${showUploadFile?'':'hidden'}` } >

            <div style={{width:"250px", height:"250px"}} className="w-full rounded-lg shadow-xl bg-gray-50">
                <div className="m-4"  >
                    <div  className="flex items-center justify-center pb-5 ">
                        <label
                            className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center ">
                                {imageToUpload.base64 && <img width="100%" height="100%" src={imageToUpload.base64} alt="preview-image-of-upload"/> }
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Bild auswählen</p>
                            </div>
                            <input onChange={uploadPictureButtonChange} accept="image/*" type="file" className="opacity-0"/>
                        </label>
                    </div>
                </div>
                <div className="flex justify-center p-2">
                    <button onClick={uploadPictureButtonClick} className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">
                        Jetzt teilen
                    </button>
                </div>
            </div>
        </div>

    </div>);

}
export const ImageGallery = ({baumId}) => {
    const session = useSession()
    const [imageList, setImageList] = useState([]);
    const [showUploadFile, setShowUploadFile] = useState(false);

    useEffect(() => {
        async function apiFetch() {
            const list = await getPicturesOfBaumscheibe(baumId);
            setImageList(list);
        }
        apiFetch();
    }, [showUploadFile])
console.log(session);
    return (
        <div className={"mt-3"}>
            {session.status!="unauthenticated" &&
            <UploadPicture baumId={baumId} showUploadFile={showUploadFile} setShowUploadFile={setShowUploadFile}/>
            }
            <hr />
            <div className="container grid grid-cols-3 gap-2 mx-auto">
                {imageList.map((image, index) => <GalleryImage key={index} imageURL={`/api/protected/baumscheibe/image/${image.pictureLink}`}/>)}
            </div>
        </div>
    );
}
