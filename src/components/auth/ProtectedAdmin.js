import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({children}) {
    const { isLoggedIn, userInfo, }  = useContext(UserContext)
    if(!isLoggedIn){
        return <Navigate to='/login' replace={true} ></Navigate>
    }

    if( isLoggedIn && userInfo && userInfo.role!=="admin"){
        return <Navigate to='/' replace={true} ></Navigate>
    }

    return children;
}

export default ProtectedAdmin;