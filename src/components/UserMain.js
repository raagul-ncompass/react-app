import { useEffect, useState } from "react";
import { ShowUser } from "./EditUser";

export const GetUserData = ({ setRes, users, setUsers }) => {
  const [user, setUser] = useState({
    Customer_ID: "",
    Customer_Name: "",
    Customer_Email: "",
    Contact: "",
    location: "",
    Password: "",
    Address: "",
    Gender: "",
    age: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedVal = await fetch(
          `${process.env.REACT_APP_API}/user-details/alluserdata`
        ).then((res) => res.json());
        setUsers(fetchedVal);
      } catch (err) {
        setRes(err.message);
      }
    };
    fetchUsers();
    console.log(`${process.env.REACT_APP_API}`);
  }, [setRes, setUsers]);
  const DeleteUserDB = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/user-details/delete/userdata/${id}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());
      if (response.flage === true) {
        const deletedUsers = users.filter((user) => user.Customer_ID !== id);
        setUsers(deletedUsers);
      }
      setRes(response.message);
    } catch (err) {
      setRes(err.message);
    }
  };

  const UpdateUserDB = async (user) => {
    setRes("");
    console.log(user)
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Customer_ID: user.Customer_ID,
        Customer_Name: user.Customer_Name,
        Contact: Number(user.Contact),
        Customer_Email: user.Customer_Email,
        location: user.location,
        age:user.age,
      }),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/user-details/update/userdata/${user.Customer_ID}`,
        requestOptions
      ).then((res) => res.json());
      if (response.flage !== true) {
        setRes(response.message);
        return;
      }
      setUsers(
        users.map((editUser) => {
          if (editUser.Customer_ID === user.Customer_ID) {
            return Object.assign(editUser, user);
          }
          return editUser;
        })
      );
      setRes(response.message);
    } catch (err) {
      setRes(err.message);
    }
  };
  return (
    <>
      {/* <button className="LinktoButton" onClick={()=>fetchUsers()} >refresh</button> */}
      <ShowUser
        user={user}
        setUser={setUser}
        users={users}
        DeleteUserDB={DeleteUserDB}
        UpdateUserDB={UpdateUserDB}
      />
    </>
  );
};
