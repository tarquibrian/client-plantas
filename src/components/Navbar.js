import React from 'react'
import {Link} from 'react-router-dom'

export const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    
        <Link className="navbar-brand" to="/"> | AGRECOL Andes | </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/About">Informacion</Link>
              
            </li>

            <li>
              <Link className="nav-link" to="/Users">Usuarios</Link>
            </li>

            <li>
              <Link className="nav-link" to="/Plantas_medicinales">Plantas_medicinales</Link>
            </li>

            <li>
              <Link className="nav-link" to="/Geolocalizacion">Geolocalizacion</Link>
            </li>

            <li>
              <Link className="nav-link" to="/Login">Login</Link>
            </li>

           

          </ul>
        </div>
      </nav>
);