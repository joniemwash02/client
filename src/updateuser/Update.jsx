import React, { useEffect, useState } from "react";
import "./update.css";
import { Link, useNavigate, useParams} from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const users = {
    name: "",
    email: "",
    adress: "",
  };
  const [user, setUser] = useState(users);
  const navigate = useNavigate();
  const {id}=useParams();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  useEffect(()=>{
   try {
     const response= axios.get(`http://localhost:5000/api/user/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    
   } catch (error) {
    console.log(error)
    
   }
  }, [id])
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/update/user/${id}`, user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="addUser">
      <Link to={"/"} type="button" class="btn btn-secondary">
        <i class="fa-solid fa-backward"></i> Back
      </Link>
      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={user.name}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Enter your email"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="adress">Adress: </label>
          <input
            type="text"
            id="adress"
            name="adress"
            autoComplete="off"
            value={user.adress}
            placeholder="Enter your Adress"
            required
            onChange={inputHandler}
          />
        </div>
        <div className="inputGroup">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
