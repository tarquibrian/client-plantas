import React, { useState, useEffect, useRef } from "react";


const API = process.env.REACT_APP_API;

export const Users = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [editing, setEditing] = useState(false);//para poder cambiar el estado de falso a verdadero
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [Administrador, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(API)
    if (!editing) {
      const res = await fetch(`${API}/Administrador`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //'Accept': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          email,
          contrasena
        }),
      });
      const data = await res.json();
      console.log(data)
      await getUsers();

      setNombre('');
      setEmail('');
      setContrasena('');

    } else {
      const res = await fetch(`${API}/Administrador/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          contrasena
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();

    setNombre("");
    setEmail("");
    setContrasena("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/Administrador`);
    const data = await res.json();
    setUsers(data);
  };

  const deleteUsers = async (id) => {
    const userResponse = window.confirm("¿Está seguro de que desea eliminarlo?");
    if (userResponse) {
      const res = await fetch(`${API}/Administrador/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/Administrado/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setNombre(data.nombre);
    setEmail(data.email);
    setContrasena(data.contrasena);
    nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              className="form-control"
              placeholder="Usuario"
              ref={nameInput}
              autoFocus
            />
          </div>

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

          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setContrasena(e.target.value)}
              value={contrasena}
              className="form-control"
              placeholder="Contraseña"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Crear"}
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>             
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Administrador.map((user) => (
              <tr key={user._id}>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.contrasena}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editUser(user._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUsers(user._id)}
                  >
                    Elimimar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

