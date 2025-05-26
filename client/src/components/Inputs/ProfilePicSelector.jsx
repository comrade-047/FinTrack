import { useRef, useState} from "react"

import {LuUser,LuUpload,LuTrash} from "react-icons/lu"
const ProfilePicSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            // update the image state
            setImage(file);

            //generate a preview URL
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };
    
    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ?(
                <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full relative">
                    <LuUser className="text-4xl text-primary"/>

                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={onChooseFile}
                    >
                        <LuUpload className="" />
                    </button>
                </div>
            ):(
                <div className="relative ">
                    <img
                        src={preview}
                        alt="profile photo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash className="" />
                    </button>
                </div>
            )}
        </div>
    );
}
export default ProfilePicSelector;