import HomeStyle from "./Home.module.css";
import ProductList from "../products/ProductList";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

function Home() {
  const {setResults} = useContext(UserContext);
  const [query, setQuery] = useState('');
  console.log('query',query)
 const navigate = useNavigate()
  
 

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.get(`http://localhost:3005/search?query=${query}`);
        setResults(response.data);
        if(response.data){
          navigate('/search-page')
        }
    } catch (error) {
        console.error('Error fetching search results', error);
    }
};


  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className={HomeStyle.vh}>
        <form onSubmit={handleSearch}>
        <div className={HomeStyle.search_container}>
          {/* <select className={HomeStyle.select} name="" id="">
            <option value="Select">Select</option>
          </select> */}
          <div className={HomeStyle.searchBar}>
            <i className="searchIcon fa fa-search"></i>
            <input
              className={HomeStyle.input}
              type="text"
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
            />
          </div>
          <button type="submit" className={HomeStyle.search}>
            <i className="searchIcon fa fa-search"></i>
          </button>
          
        </div>
        </form>
       <ProductList/>
      </div>
    </>
  );
}

export default Home;
