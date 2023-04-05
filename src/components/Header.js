import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import '../styles/general.css'
import light from '../assets/icons8-light.gif'
import night from '../assets/icons8-night.gif'

const Header = () => {
    const dispacth = useDispatch()
    const { themeState } = useSelector(state => state)
    console.log(themeState);
    return (
        <nav style={{ position: "relative" }}
            className=
            {`navbar navbar-expand-sm navbar-dark ${themeState === "light" ? "headerBgLight" : "headerBgDark"}`}>

            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>
                    Library
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="#">
                                kitap islemleri
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div style={{ position: "absolute", right: "20px" }}>
                {
                    themeState === "light" ?
                        (<button
                            onClick={() => dispacth(
                                {
                                    type: actionTypes.themeActions.CHANGE_THEME,
                                    payload: "dark"
                                })}
                            className="btn btn-sm btn-secondary">
                            <img style={{width:'20px', height:'20px',marginRight:'10px'}} src={night}></img>
                            <span>
                                Dark
                            </span>
                        </button>)
                        : (<button
                            onClick={() => dispacth(
                                {
                                    type: actionTypes.themeActions.CHANGE_THEME,
                                    payload: "light"
                                })}
                            className="btn btn-sm btn-warning">
                                <img style={{width:'20px', height:'20px',marginRight:'10px'}} src={light}></img>
                            <span>
                                Light
                            </span>
                        </button>)
                }
            </div>
        </nav>
    )
}

export default Header