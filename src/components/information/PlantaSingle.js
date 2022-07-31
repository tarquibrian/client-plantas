import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
    console.log(result.data);
  };
  return (
    <>
      <div className="container">
        <h1>
          nombre: <br /> {planta.nombre_planta}
        </h1>
        <h3>
          nombre cientifico: <br /> {planta.nombre_cientifico}
        </h3>
        <h3>
          propiedades: <br /> {planta.propiedades}
        </h3>
        <h3>
          descripcion: <br /> {planta.descripcion}
        </h3>
        <h3>
          conocimiento ancestral: <br /> {planta.conocimiento_ancestral}
        </h3>
      </div>
    </>
  );
};
