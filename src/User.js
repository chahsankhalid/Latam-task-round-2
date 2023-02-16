import React from "react";
import { useLocation,useNavigate } from "react-router-dom";

export default function User() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('authenticated');
    navigate("/")
  };
  return (
    <>
      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{state.id}</th>
              <td>{state.name}</td>
              <td>{state.email}</td>
              <td>{state.phone}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary" onClickCapture={logout}>Logout</button>
      </div>
    </>
  );
}
