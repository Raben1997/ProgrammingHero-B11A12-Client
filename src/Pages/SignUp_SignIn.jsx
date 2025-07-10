import { useState } from "react";
import SignInForm from "../Component/SignInForm/SignInForm";
import SignUpForm from "../Component/SignUpForm/SignUpForm";


const SignUp_SignIn = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="sec-gap">
            <div className="container">
                <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-md h-[600px] [perspective:1000px]">
                        <div className={`absolute inset-0 transition-transform duration-700 transform-style preserve-3d ${isSignUp ? "rotate-y-180" : ""}`}>
                            <SignInForm onToggle={() => setIsSignUp(true)} />
                            <SignUpForm onToggle={() => setIsSignUp(false)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp_SignIn;
