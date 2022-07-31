import React, { useState, useRef } from "react";
//import Form from "react-bootstrap/Form";

import { Form } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { allowedNodeEnvironmentFlags } from "process";
//import Button from "react-bootstrap/Button";
//import "./login.css";

const API = process.env.REACT_APP_API;

export function Login() {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  let [setUsers] = useState([]);

  const nameInput = useRef(null);
  let History = useHistory();
  function validateForm() {
    return email.length > 0 && contrasena.length > 0;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios
        .post(`${API}/Administrador-login`, { email, contrasena })
        .then((response) => {
          console.log(response);
          window.location.href = "/About";
        })
        .catch(function (e) {
          console.log(e);
        });
    } catch (error) {
      if (error.resonse.status === 500) {
        alert("contrasena invalida");
      }
    }

    // try {
    //   const res = await fetch(`${API}/Administrador-login`, {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //       //'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email,
    //       contrasena,
    //     }),
    //   });
    //   const data = await res.json();
    //   console.log(data);
    //   // await getUsers();
    //   // setEmail("");
    //   // setContrasena("");
    //   // nameInput.current.focus();
    //   // History.push("About");
    // } catch (error) {
    //   if(error.response.status == 401) {
    //     alert("contrasena invalida")
    //   }
    // }
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/Administrador`);
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div>
      <div className="body"></div>
      <div class="grad"></div>
      <div class="header">
        <div>
          AGRECOL
          <span>Andes</span>
        </div>
      </div>
      <div className="col-md-8">
        <form onSubmit={handleSubmit} className="login">
          <center>
            <h2 className="login-text">LOGIN</h2>
          </center>

          <br />
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Email"
              ref={nameInput}
              autoFocus
            />
          </div>
          <br />

          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setContrasena(e.target.value)}
              value={contrasena}
              className="form-control"
              placeholder="Contraseña"
            />
          </div>

          <div className="d-grid gap col-6 mx-auto">
            <h1></h1>
            <h1></h1>
            <button
              className="btn btn-primary btn-block"
              block="true"
              size="lg"
              type="submit"
              disabled={!validateForm()}
              value="Login"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
