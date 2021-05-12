import React from 'react'
import "./UserScreen.css";
import {  useSelector } from "react-redux";
import { Link } from 'react-router-dom';


const UserScreen = () => {
  const userDetail = useSelector((state) => state.getUser);
  const { user } = userDetail;
  
  return (
    <> 
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
