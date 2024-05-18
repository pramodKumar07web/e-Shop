import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";

function Protected({children}) {
    const { isLoggedIn }  = useContext(UserContext)
    if(!isLoggedIn){
        return <Navigate to='/login' replace={true} ></Navigate>
    }

    return children;
}

export default Protected;