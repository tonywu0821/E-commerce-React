import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  //const [product, setProduct] = useState({}) ;
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState("");
  
  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  // async function getProductDetails(){
  //   const { data } = await axios.get(`https://fakestoreapi.com/products/${match.params.id}`);
  //   setProduct(data);
  //   setLoading(false);
  //   setError("");
  // }
  useEffect(() => {
    //getProductDetails()
    // console.log("product:"+product.id);
    // console.log("match:"+match);
    // console.log("history:"+history);
    // console.log("getProductDetails");
    if (product && match.params.id !== product.id) {
     dispatch(getProductDetails(match.params.id));
    }
    // console.log("product:"+product.id);
    // console.log("match:"+match);
    // console.log("history:"+history);
    // console.log("getProductDetails");
  }, []);

  const addToCartHandler = () => {
    dispatch(addToCart(product.id, qty));
    //history.push(`/cart`);
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="left__info">
              <p className="left__name">{product.title}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>${product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {//product.countInStock > 0 ? "In Stock" : "Out of Stock"
                  1 > 0 ? "In Stock" : "Out of Stock"
                  }
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[0,1,2,3,4,5,6,7,8,9].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
