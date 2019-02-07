import React, { Component } from 'react';
import './Navbar.scss';

class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="null">Dinr</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="null">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="null">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="null">Pricing</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown link
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="null">Action</a>
                            <a className="dropdown-item" href="null">Another action</a>
                            <a className="dropdown-item" href="null">Something else here</a>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;