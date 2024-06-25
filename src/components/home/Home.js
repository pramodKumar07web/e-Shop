import HomeStyle from "./Home.module.css";
import ProductList from "../products/ProductList";

function Home() {

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className={HomeStyle.vh}>
        <div className={HomeStyle.search_container}>
          <select className={HomeStyle.select} name="" id="">
            <option value="Select">Select</option>
          </select>
          <div className={HomeStyle.searchBar}>
            <i className="searchIcon fa fa-search"></i>
            <input
              className={HomeStyle.input}
              type="text"
              placeholder="Search by name"
            />
          </div>
          <div className={HomeStyle.search}><i className="searchIcon fa fa-search"></i>
          </div>
          
        </div>
       <ProductList/>
      </div>
    </>
  );
}

export default Home;
