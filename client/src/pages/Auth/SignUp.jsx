import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AuthLayout from '../../components/Layout/AuthLayout';
import Input from '../../components/Inputs/Input';
import ProfilePicSelector from '../../components/Inputs/ProfilePicSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from "../../utils/uploadImage";
const SignUp = ()=>{

    const[profilePic, setProfilePic] = useState(null);
    const[fullName, setFullName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const[error, setError] = useState(null);

    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate();

    // handle sign up
    const handleSignUp = async (e) => { 
        e.preventDefault();

        let profilePicUrl = "";

        if(!fullName){
            setError("Please enter your full name");
            return;
        }
        
        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }
        if(!password){
            setError("Please enter your password");
            return;
        }

        setError("");
        //signUp api call 
        try{
            
            //upload image if present
            if(profilePic){
                const imageUploadRes = await uploadImage(profilePic);
                // console.log("Image upload response:", imageUploadRes);
                profilePicUrl = imageUploadRes.url || "";
                // console.log("Profile picture URL:", profilePicUrl);
            }

            // console.log({
            //     fullName,
            //     email,
            //     password,
            //     profilePicUrl
            // });

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
                fullName,
                email,
                password,
                profileImageUrl: profilePicUrl
            });
            console.log("SignUp response:", response);
            const {token, user} = response.data;

            if(token){
                localStorage.setItem("token",token);
                updateUser(user);
                // localStorage.setItem("user",JSON.stringify(user));
                navigate("/dashboard");
            }
        }
        catch(err){
            if(err.response && err.response.data.message){
                setError(err.response.data.message);
            }else{
                setError("Something went wrong");
            }
        }
    }

    return (
        <AuthLayout>
            <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
                <h3 className='text-xl font-semibold text-black'>Create an account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Join us to start tracking your expenses and income.
                </p>

                <form onSubmit={handleSignUp}>
                    
                    <ProfilePicSelector image={profilePic} setImage={setProfilePic} />

                    <div className='flex flex-col '>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4'>
                            <Input
                                value={fullName}
                                onChange={({target})=> setFullName(target.value)}
                                label="Full Name"
                                placeholder="John Doe"
                                type="text"
                            />

                            <Input
                                value = {email}
                                onChange = {({target})=> setEmail(target.value)}
                                label = "Email Address"
                                placeholder = "john@gmail.com"
                                type = "text"
                            />
                        </div>

                       <div className='col-span-2 -mt-4'>
                             <Input
                                value = {password}
                                onChange = {({target})=> setPassword(target.value)}
                                label = "Password"
                                placeholder = "Min. 8 characters"
                                type = "password"
                            />
                       </div>
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Sign Up
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp;