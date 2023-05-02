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
    console.log(booksState);
    console.log(themeState);
    return (
        <nav className={`navbar navbar-expand-sm navbar-dark ${themeState === "light" ? "headerBgLight" : "headerBgDark"}`}>
            <div className="container-fluid d-flex justify-items-center align-content-center">
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
                            <Link className="nav-link active" aria-current="page" to={"/categories"}>
                                Kategory islemleri
                            </Link>

                        </li>

                        <a style={{ padding: 0, margin: 0 }}>
                            <p style={{ color: "white", padding: 0 }} >
                                Toplam Kitap Sayisi:_
                                {booksState.books.length}
                                <br />
                                Toplam Kategori Sayisi:_
                                {categoriesState.categories.length}
                            </p>
                        </a>
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