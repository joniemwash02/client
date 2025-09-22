import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await axios.get("http://localhost:5000/api/users");
        setUsers(responce.data);
      } catch (error) {
        console.log("error while fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="usertable">
      <Link to="/add" type="button" class="btn btn-primary">
        Add User <i class="fa-solid fa-user-plus"></i>
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Adress</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index +1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.adress}</td>
                <td className="action-btn">
                  <button type="button" class="btn btn-info">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button type="button" class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
