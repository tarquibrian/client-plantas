import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/about.css";
const API = process.env.REACT_APP_API;
export const PlantaSingle = () => {
  const [planta, setPlanta] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    getPlanta();
  }, []);

  const getPlanta = async () => {
    const result = await axios.get(`${API}/Plantas_medicinale/` + path);
    setPlanta(result.data);
  };
  return (
    <>
      <div>
        <img
          className="planta-img"
          src={process.env.REACT_APP_API + "/file/" + planta.imagen}
          alt="img"
        />
      </div>
      <div className="container mt-4 mb-4">
        <h3 className="planta-title">
          nombre de la planta: <span>{planta.nombre_planta}</span>
        </h3>
        <h3>
          nombre cientifico: <span>{planta.nombre_cientifico}</span>
        </h3>
        <h3>
          propiedades: <span>{planta.propiedades}</span>
        </h3>
        <h3>
          descripcion: <span>{planta.descripcion}</span>
        </h3>
        <h3>
          conocimiento ancestral: <span>{planta.conocimiento_ancestral}</span>
        </h3>
      </div>
      <Link to={"/About"}>
        <button className="btn btn-info">ATRAS</button>
      </Link>
    </>
  );
};
