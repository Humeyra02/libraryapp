import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import '../styles/general.css'
import light from '../assets/giphy.gif'
import night from '../assets/moon.gif'

const Header = () => {
    const dispacth = useDispatch()
    const { themeState, booksState, categoriesState } = useSelector(state => state)

    return (
        <nav className={`navbar navbar-expand 
        ${themeState === "light" ? "light-theme navbar-light" : "dark-theme navbar-dark"}`}>
            <div className="container-my-3 d-flex justify-items-center align-content-center">
                <Link className="navbar-brand" to={"/"}>
                    <p style={{ paddingLeft: "5px" }}>Library</p>
                </Link>
                
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav ">

                        <li className="nav-item">
                            <Link className="nav-link active d-flex justify-content-center align-items-center"
                                style={{ fontSize: "17px", maxWidth: "100px" }}
                                aria-current="page" to={"/categories"}>
                                Category Operations
                            </Link>
                        </li>
                        <div style={{ padding: 0, margin: "10px", maxWidth: "300px" }}>
                            <p
                                className={`
                                ${themeState === "light" ? " category-light " :
                                 " category-dark "}`}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingLeft: "30px",
                                    paddingRight: "30px",
                                    backgroundColor: "white",
                                    borderRadius: "10px",
                                    maxWidth:"300px"
                                }} >
                                Total Books: 
                                "{booksState.books.length}"
                                <br />
                                Total Categories:
                                "{categoriesState.categories.length}"
                            </p>
                        </div>
                    </ul>
                </div>
            </div>
            <div style={{ position: "absolute", right: "5px", top: "22px" }}>
                {
                    themeState === "light" ?
                        (<button
                            onClick={() => dispacth(
                                {
                                    type: actionTypes.themeActions.CHANGE_THEME,
                                    payload: "dark"
                                })}
                            className="btn btn-sm ">
                            <img style={{ width: '30px', height: '30px', margin: 0, padding: 0 }} src={night}></img>
                        </button>)
                        : (<button
                            onClick={() => dispacth(
                                {
                                    type: actionTypes.themeActions.CHANGE_THEME,
                                    payload: "light"
                                })}
                            className="btn btn-sm ">
                            <img style={{ width: '30px', height: '30px', margin: 0, padding: 0 }} src={light}></img>

                        </button>)
                }
            </div>
        </nav>
    )
}

export default Header