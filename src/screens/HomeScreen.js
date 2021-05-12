import "./HomeScreen.css";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import axios from "axios";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([])
  const [filters, setFilter] = useState({
    category: "",
    searchTerm: ""
  });
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    getCategories();
  }, [])

  useEffect(() => {
    console.log(filters);
  },[filters])

  const getCategories = async () => {
    try {
      const {data} = await axios.get('https://fakestoreapi.com/products/categories');
      console.log("getCategories")
      console.log(data);
      setCategories(data);
    } catch(error) {
      console.error(error.response);
    }
  }

  function filiterProducts(filters){
    console.log("filiterProducts");
    console.log(filters);
    let filiteredProducts = [...products];
    for (let key in filters) {
      console.log(key);
      if(key === 'category' && filters[key].length > 0){
        filiteredProducts = filiteredProducts.filter((product)=> product.category === filters[key])
      } else if(key === 'searchTerm' && filters[key].length > 0){
        filiteredProducts = filiteredProducts.filter((product)=> product.title.includes(filters[key]))
      }
    }
    return filiteredProducts.map((product) => (
      <Product
        key={product.id}
        name={product.title}
        description={product.description}
        price={product.price}
        imageUrl={product.image}
        category={product.category}
        productId={product.id}
      />
    ))
  }


  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Product Gallary</h2>
      <div className="homescreen__category">
        <span>Filter by categories:</span> 
          <select value={filters.category} onChange={(e) => setFilter({...filters,category:e.target.value})}>
              {['',...categories].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
          </select>
      </div>
        
      <div className="homescreen__search">
        <input value = {filters.searchTerm} onChange = {e => setFilter({...filters,searchTerm:e.target.value})}type="text" placeholder="Search.."/>
      </div>
      <div className="homescreen__products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          filiterProducts(filters)    
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
