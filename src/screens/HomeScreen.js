import "./HomeScreen.css";
import { useState,useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";

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
  const [sortConfig, setSortConfig] = useState('');
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    try {
      const {data} = await axios.get('https://fakestoreapi.com/products/categories');
      //console.log("getCategories")
      //console.log(data);
      setCategories(data);
    } catch(error) {
      console.error(error.response);
    }
  }

  function filiterProducts(filters,sortConfig){
    //console.log("filiterProducts");
    //console.log(filters);
    let filiteredProducts = [...products];
    for (let key in filters) {
      //console.log(key);
      if(key === 'category' && filters[key].length > 0){
        filiteredProducts = filiteredProducts.filter((product)=> product.category === filters[key])
      } else if(key === 'searchTerm' && filters[key].length > 0){
        filiteredProducts = filiteredProducts.filter((product)=> product.title.includes(filters[key]))
      }
    }
    if (sortConfig && sortConfig.length > 0) {
      filiteredProducts.sort((a,b) => {
        if (a.price < b.price) {
          return sortConfig === "ascending" ? -1 : 1;
        }
        if (a.price > b.price) {
          return sortConfig === "ascending" ? 1 : -1;
        }
        return 0;
      })
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
        <span>Filter by category:</span> 
          <select value={filters.category} onChange={(e) => setFilter({...filters,category:e.target.value})}>
              {['',...categories].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
          </select>
      </div>
      <div className="homescreen__price">
        <select value={sortConfig} onChange={(e)=>setSortConfig(e.target.value)}>
          <option key="Sort by:" value = "">
            {"Sort by Price"}
          </option>
          <option key="ascending" value = "ascending">
            {"Price: Low to High"}
          </option>
          <option key="descending" value = "descending">
            {"Price: High to Low"}
          </option>
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
          filiterProducts(filters, sortConfig)    
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
