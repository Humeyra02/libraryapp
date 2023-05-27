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
        <nav className={`navbar navbar-expand-sm ${themeState === "light" ? "light-theme navbar-light" : "dark-theme navbar-dark"}`}>
            <div className="container-my-3 d-flex justify-items-center align-content-center">
                <Link className="navbar-brand" to={"/"}>
                    Library
                </Link>
                <button
                    className="navbar-toggler"
                    type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link active d-flex justify-content-center align-items-center"
                                style={{ fontSize: "17px" }}
                                aria-current="page" to={"/categories"}>
                                Category Operations
                            </Link>

                        </li>

                        <div style={{ padding: 0, margin: 0 }}>
                            <p
                                className={`
                                ${themeState === "light" ? " category-light " : " category-dark "}`}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    paddingLeft: "30px",
                                    paddingRight: "30px",
                                    backgroundColor: "white",
                                    borderRadius: "10px"
                                }} >
                                Toplam Kitap Sayisi:_
                                {booksState.books.length}
                                <br />
                                Toplam Kategori Sayisi:_
                                {categoriesState.categories.length}
                            </p>
                        </div>
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
                            className="btn btn-sm ">
                            <img style={{ width: '20px', height: '20px', marginRight: '10px' }} src={night}></img>
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
                            className="btn btn-sm ">
                            <img style={{ width: '20px', height: '20px', marginRight: '10px' }} src={light}></img>
                            <span style={{ color: "white" }}>
                                Light
                            </span>
                        </button>)
                }
            </div>
        </nav>
    )
}

export default Header