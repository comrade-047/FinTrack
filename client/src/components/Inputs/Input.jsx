import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6";
import { useState } from "react";
const Input = ({ type, placeholder, value, onChange, label }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return (
        
        <div className="mb-4">
            <label className="text-[13px] text-slate-800">{label}</label>
            <div className="input-box ">
                <input
                    type={type == "password" ? passwordVisible ? "text" : "password" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=>onChange(e)}
                    className="w-full bg-transparent outline-none "

                    
                />
                {type === "password" && (
                <>
                    {passwordVisible ? (
                        <FaRegEye
                            size={22}
                            className="text-violet-500 cursor-pointer "
                            onClick={()=>togglePasswordVisibility()}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer "
                            onClick={()=>togglePasswordVisibility()}
                        />
                        )
                    }       
                    </>
                )}
            </div>
            
        </div>
    );
}
export default Input;