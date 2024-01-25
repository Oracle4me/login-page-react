import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Dashboard() {
  const listName = ['No', 'Email']
  const [users, setUsers] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const isLoggedIn = Boolean(token);
      setIsLoggedIn(isLoggedIn);
      if (isLoggedIn) {
        getUsers();
      }
    };

    checkLoginStatus();
  }, []);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/users', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('Your not login anymoreb');
      } else {
        console.error('Error fetching users:', error);
      }
    }
  };
  return (
    <div className="container mt-5">
      <div className='mx-6'>
        <h1 className='mb-2'>Welcome Back User</h1>
        <table className="table table-striped text-center">
          <thead key='table-header'>
            <tr>
              {listName.map((list) => (
                <th
                  key={list}
                  scope='col'
                >{list}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.email}>
                <th scope='row'>{index + 1}</th>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard