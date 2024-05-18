import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

function Logout({children}) {
    const { logout,user }  = useContext(UserContext)
    console.log('logout',user)

    useEffect(()=>{
        logout()
    })


    if(!user){
        return <Navigate to='/login' replace={true} ></Navigate>
    }

    return children;
}

export default Logout;