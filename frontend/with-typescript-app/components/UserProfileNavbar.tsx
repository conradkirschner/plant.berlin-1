import { useSession, signIn, signOut } from "next-auth/react"
import {useState} from "react";
import Image from 'next/image';

export const UserProfileNavbar = () => {
    const session = useSession();
    const [isOpen, setIsOpen] = useState(false);
    console.log('USER PROFILE ',session);
    const loggedOut = (
        <div className={"absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"}>
        <button onClick={() => {signIn()}} type="button" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only" >Login</span>
            Login
        </button>
    </div>
    );
    const loggedIn = (

        <ul className="flex items-center cursor-default	">
            <li className="h-10 w-10" onClick={() => {
                setIsOpen(!isOpen);
            }}>
                <div className="h-full w-full rounded-full mx-auto bg-white">
                    <Image priority src="/images/tabler-icon-user.png"
                           width="50" height="50"
                           alt="profile woman" />
                </div>
            </li>
            <div style={{top: "50px", zIndex: 100}} className={`${!isOpen?'hidden':''} w-full sm:w-64 absolute bg-white p-3 right-0 mt-2 rounded-md shadow-lg  `}>
                <div className={"m-2"}>Meine Baumscheiben</div>
                <div className={"m-2"}>Account Einstellungen</div>
                <div onClick={() => {signOut()}} className={"m-2"}>Logout</div>
            </div>

        </ul>

    );

    if(session.status==="unauthenticated") {
        return loggedOut;
    }
    return loggedIn;


}
