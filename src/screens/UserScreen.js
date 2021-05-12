import React from 'react'
import "./UserScreen.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

// Actions
import { getUser, updateUserProfile } from "../redux/actions/userActions";


const UserScreen = () => {
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.getUser);
  const { user, loading, error } = userDetail;
  
  useEffect(() => {
    console.log("UserScreen useEffect!");
  },[loading]);


  /*
        <p>User fullname:{user.name.firstname + " " + user.name.lastname}</p>
        <p>User email:{user.email}</p>
        <p>User password:{user.password}</p>
        <p>User address city:{user.address.city}</p>
        <p>User address street:{user.address.street}</p>
        <p>User address number:{user.address.number}</p>
        <p>User address zipcode:{user.address.zipcode}</p>
  */
  return (
    <> 
      {console.log("userscreen")}
      {console.log(userDetail)}
      {console.log(userDetail.loading === false)}
      <div className="userscreen">
        <h2>User profile</h2>
        {userDetail.loading !== false ? (
          <h2>Loading...</h2>
        ) : (
          <div className="userscreen__profile">
            <label>Name:</label>
            <input className =""value={user.name.firstname + " " + user.name.lastname} disabled/><br/>
            <label>Email:</label>
            <input className =""value={user.email} disabled/><br/>
            <label>Password:</label>
            <input className =""value={user.password} disabled/><br/>
            <label>City:</label>
            <input className =""value={user.address.city} disabled/><br/>
            <label>Address:</label>
            <input className =""value={user.address.number + " " + user.address.street} disabled/><br/>
            <label>Zip Code:</label>
            <input className =""value={user.address.zipcode} disabled/><br/>
            <Link className ="userscreen__edit" to={"/user/edit"} >
              edit user
            </Link>
          </div>
        )}
    </div>
    </>
  )
}

export default UserScreen
