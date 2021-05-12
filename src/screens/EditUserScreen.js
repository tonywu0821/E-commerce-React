import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import "./EditUserScreen.css";
// Actions
import { getUser, updateUserProfile } from "../redux/actions/userActions";


const EditUserScreen = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.getUser);
  const { user, loading } = userDetail;

  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");

  useEffect(()=>{
    if(loading === false){
      setFirstName(user.name.firstname);
      setlastName(user.name.lastname);
      setEmail(user.email);
      setPassword(user.password);
      setStreet(user.address.street);
      setNumber(user.address.number);
      setCity(user.address.city);
      setZipcode(user.address.zipcode);
      }
  }, [loading]);
  
  const onSubmitForm = (e) => {
    e.preventDefault();
    const updatedData = {
      name:{firstname:firstName,lastname:lastName},
      email,
      password,
      address:{street,number,city,zipcode}
    }
    dispatch(updateUserProfile(updatedData))
  }
  

  return (
    <>
    {console.log("editscreen!")}
    <div className="editscreen">
      <div>
      <h2>Edit Profile</h2>
      {loading !== false ? (
        <h2>Loading...</h2>
      ) : (
        <div className="editscreen__form">
          <form onSubmit={(e) => onSubmitForm(e)}>
            <div class="form-row">
              <div className="form-group col-md-6"> 
                <label>First Name </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={firstName}
                    onChange={(e)=> setFirstName(e.target.value)}
                    />      
              </div>
              <div className="form-group col-md-6"> 
                <label>Last Name </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={lastName}
                    onChange={(e)=> setlastName(e.target.value)}
                    />      
              </div>
            </div>

            <div class="form-row">
              <div className="form-group col-md-6"> 
                <label>Email </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />      
              </div>
              <div className="form-group col-md-6"> 
                <label>Password </label>
                <input type="text"
                    required
                    className="form-control"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
              </div>
            </div>

            <div class="form-row">
              <div className="form-group col-md-2"> 
                <label>Street Number </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={number}
                    onChange={(e)=> setNumber(e.target.value)}
                    />      
              </div>
              <div className="form-group col-md-4"> 
                <label>Street </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={street}
                    onChange={(e)=> setStreet(e.target.value)}
                    />
              </div>
              <div className="form-group col-md-3"> 
                <label>City </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={city}
                    onChange={(e)=> setCity(e.target.value)}
                    />
              </div>
              <div className="form-group col-md-3"> 
                <label>Zip Code </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={zipcode}
                    onChange={(e)=> setZipcode(e.target.value)}
                    />
              </div>
            </div>

            <div className="form-group">
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className="input-group mr-2">
                  <input type="submit" value="Submit" className="btn btn-primary" /> 
                </div>
                <div className="btn-group" role="group">
                  <Link to="/user">
                    <input type="button" value="Cancel" className="btn btn-danger" />
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      
    </div>
    </div>
    </>
  )
}

export default EditUserScreen
