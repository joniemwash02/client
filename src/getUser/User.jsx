import React, { useEffect, useState } from "react";
import "./user.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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

  const deleteUser = async (userId) => {
    try {
      const response = await axios
        .delete(`http://localhost:5000/api/delete/user/${userId}`)
        .then((response) => {
          setUsers((prevUser) =>
            prevUser.filter((user) => user._id !== userId)
          );
          toast.success(response.data.message, { position: "top-right" });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="usertable">
      <Link to="/add" type="button" class="btn btn-primary">
        Add User <i class="fa-solid fa-user-plus"></i>
      </Link>
        {users.length === 0 ? (
          <div className="noData">
            <h3>no data to display</h3>
            <p>Kindy add new user</p>
          </div>
        ) : (
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
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.adress}</td>
                  <td className="action-btn">
                    <Link
                      to={"/update/" + user._id}
                      type="button"
                      class="btn btn-info"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button
                      onClick={() => deleteUser(user._id)}
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
      
      </table>
        )}
    </div>
  );
};

export default User;
