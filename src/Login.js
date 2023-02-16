import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input, Button } from "antd";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const login = () => {
    let item = { email, password };
    // --------------Api to login user-------------
    fetch("https://apingweb.com/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp.result);
        // setData(resp.result);
        if (resp.status === 400) {
          // ----------Alert toasters to beautify the alerts--------
          toast.error("User does not exist", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          // ----------Alert toasters to beautify the alerts--------
          toast.success("Login successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",

            
        });
        localStorage.setItem("authenticated", true);
        navigate("/user",{
            state: {
                id: resp.result.id,
                name: resp.result.name,
                email: resp.result.email,
                phone: resp.result.phone,
            }
        });
        }
      });
    });
  };
  return (
    <div>
      <>
        <section id="loginpage">
          <div className="login-div">
            <img src={"./images/Logo.svg"} alt="logo" className="mainlogo" />
            <Input
              type="text"
              value={email}
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Input
              type="password"
              value={password}
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button type="primary" onClick={login}>
              Login
            </Button>
            <ToastContainer />
          </div>
        </section>
      </>
    </div>
  );
};
export default Login;
