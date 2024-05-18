import Home from "../components/Home";
import Navbar from "../components/navbar/Navbar";

function HomePage() {
    return ( 
        <div>
            <Navbar/>
            <Home></Home>
            {/* </Navbar> */}
        </div>
     );
}

export default HomePage;