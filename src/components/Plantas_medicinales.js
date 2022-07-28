import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export const Plantas_medicinales = () => {

  const [nombre_cientifico, setNombre_cientifico] = useState('');
  const [nombre_planta, setNombre_planta] = useState('');
  const [propiedades, setPropiedades] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [conocimiento_ancestral, setConocimiento_ancestral] = useState('');
  const [imagen, setImagen] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');


  const [editing, setEditing] = useState(false)
  const [id, setId] = useState('');

  const nameInput = useRef(null);

  let [Plantas_medicinales, setPlantas_medicinales] = useState([]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(API)
        if (!editing) {
          const res = await fetch(`${API}/Plantas_medicinales`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              //'Accept': 'application/json'
            },
            body: JSON.stringify({
              nombre_cientifico,
              nombre_planta,
              propiedades,
              descripcion,
              conocimiento_ancestral,
              imagen,
              latitud,
              longitud
            }),
          });
          const data = await res.json();
          console.log(data)
          await getPlantas_medicinales();
    
          setNombre_cientifico('');
          setNombre_planta('');
          setPropiedades('');
          setDescripcion('');
          setConocimiento_ancestral('');
          setImagen('');
          setLatitud('');
          setLongitud('');
      
    } 


  else {
    const res = await fetch(`${API}/Plantas_medicinales/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_cientifico,
        nombre_planta,
        propiedades,
        descripcion,
        conocimiento_ancestral,
        imagen,
        latitud,
        longitud
      }),
    });
    const data = await res.json();
    console.log(data);
    setEditing(false);
    setId("");
  }
  await getPlantas_medicinales();

    setNombre_cientifico('');
    setNombre_planta('');
    setPropiedades('');
    setDescripcion('');
    setConocimiento_ancestral('');
    setImagen('');
    setLatitud('');
    setLongitud('');
  nameInput.current.focus();
};


  const getPlantas_medicinales = async () => {
    const res = await fetch(`${API}/Plantas_medicinales`);
    const data = await res.json();
    setPlantas_medicinales(data);
  };

  const deletePlantas_medicinales = async (id) => {
    const PlantaResponse = window.confirm("¿Está seguro de que desea eliminarlo?");
    if (PlantaResponse) {
      const res = await fetch(`${API}/Plantas_medicinales/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getPlantas_medicinales();
    }
  };

  const editPlantas_medicinale = async (id) => {
    const res = await fetch(`${API}/Plantas_medicinale/${id}`);
    const data = await res.json(); //lo convertimos en un json

    setEditing(true);
    setId(id)

    // Reset
    setNombre_cientifico(data.nombre_cientifico);
    setNombre_planta(data.nombre_planta);
    setPropiedades(data.propiedades);
    setDescripcion(data.descripcion);
    setConocimiento_ancestral(data.conocimiento_ancestral);
    setImagen(data.imagen);
    setLatitud(data.latitud);
    setLongitud(data.longitud);

    nameInput.current.focus();
  };

  useEffect(() => {
    getPlantas_medicinales();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="nombre_cientifico"
              onChange={(e) => setNombre_cientifico(e.target.value)}
              value={nombre_cientifico}
              className="form-control"
              placeholder="Nombre cientifico"
              ref={nameInput}
              autoFocus
            />
          </div>

          <div className="form-group">
            <input
              type="nombre_planta"
              onChange={(e) => setNombre_planta(e.target.value)}
              value={nombre_planta}
              className="form-control"
              placeholder="Nombre planta"
            />
          </div>

          <div className="form-group">
            <input
              type="propiedades"
              onChange={(e) => setPropiedades(e.target.value)}
              value={propiedades}
              className="form-control"
              placeholder="Propiedades"
            />
          </div>

          <div className="form-group">
            <input
              type="descripcion"
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
              className="form-control"
              placeholder="Descripcion"
            />
          </div>

          <div className="form-group">
            <input
              type="conocimiento_ancestral"
              onChange={(e) => setConocimiento_ancestral(e.target.value)}
              value={conocimiento_ancestral}
              className="form-control"
              placeholder="Conocimiento ancestral"
            />
          </div>

          <div className="form-group">
            <input
              type="latitud"
              onChange={(e) => setLatitud(e.target.value)}
              value={latitud}
              className="form-control"
              placeholder="Latitud"
            />
          </div>

          <div className="form-group">
            <input
              type="longitud"
              onChange={(e) => setLongitud(e.target.value)}
              value={longitud}
              className="form-control"
              placeholder="Longitud"
            />
          </div>

          <div className="form-group" >
            <input
              type="file"
              name="imagen"
              accept=".JPG .MOV .jpg .png"
              onChange={(e) => setImagen(e.target.value)}
              value={imagen}
              className="form-control"
              placeholder="Imagen"

            /> 
            <input type="submit"/>

          </div>

          <button className="btn btn-primary btn-block">
            {editing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
      <div className="col-md-2">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre cientifico</th>
              <th>Nombre planta</th>
              <th>Propiedades</th>
              <th>Descripcion</th>
              <th>Conocimiento ancestral</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            
            {Plantas_medicinales.map((Plantas_medicinale) => (
              <tr key={Plantas_medicinale._id}>
                <td>{Plantas_medicinale.nombre_cientifico}</td>
                <td>{Plantas_medicinale.nombre_planta}</td>
                <td>{Plantas_medicinale.propiedades}</td>
                <td>{Plantas_medicinale.descripcion}</td>
                <td>{Plantas_medicinale.conocimiento_ancestral}</td>
                <td>{Plantas_medicinale.latitud}</td>
                <td>{Plantas_medicinale.longitud}</td>
                <td>{Plantas_medicinale.imagen}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editPlantas_medicinale(Plantas_medicinale._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deletePlantas_medicinales(Plantas_medicinale._id)}
                  >
                    Eliminar
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