import React, { useState, useRef } from "react";
import { AiFillRightCircle } from "react-icons/ai";
import Modal from "../components/Modal"
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    const usernameRef = useRef()
    const passwordRef = useRef()
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")

    const handleLogin = (event) => {

        const username = "Humeyra"
        const password = "123456"

        event.preventDefault()
        if (!login.username && !login.password) {
            usernameRef.current.style.display = "block"
            passwordRef.current.style.display = "block"
            setTimeout(() => {
                usernameRef.current.style.display = "none"
                passwordRef.current.style.display = "none"
            }, 3000)
            return
        }
        if (!login.username) {
            usernameRef.current.style.display = "block"
            setTimeout(() => {
                usernameRef.current.style.display = "none"
            }, 3000)
            return
        }
        if (!login.password) {
            passwordRef.current.style.display = 'block'
            setTimeout(() => {
                passwordRef.current.style.display = "none"
            }, 3000)
            return
        }
        /**normalde api call yapilmasi lazim, simdilik yapilmis gibi dusunucez*/
        if (login.username !== username || login.password !== password) {
            setShowModal(true)
            setModalMessage("Your username or password is wrong !!!")
            return
        }
        dispatch({type:actionTypes.loginActions.LOGIN_SUCCESS,payload:login.username})
        navigate("/")


        // if (login.name !== username) {
        //     setShowModal(true)
        //     setModalMessage("Your username is wrong !!!")
        //     return
        // }
        // if (login.password !== password) {
        //     setShowModal(true)
        //     setModalMessage("Your password is wrong !!!")
        //     return
        // }

    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: 'center',
                alignItems: "center"
            }} >
            <form

                onSubmit={handleLogin}

                style={{
                    width: '50%',
                    paddingTop: '20px',
                    boxShadow: "0px 0px 12px 0px black",
                    borderRadius: '5px'
                }} >
                <div className="p-2">
                    <label
                        htmlFor="username"
                        className="form-label">
                        User Name
                    </label>
                    <input
                        autoComplete="off"
                        value={login.username}
                        onChange={(event) => setLogin({ ...login, username: event.target.value })}
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Please enter your userName" />
                </div>
                <p className="text-secondary p-2" ref={usernameRef} style={{ display: 'none' }} ><small> The username can not be empty !!!</small></p>
                <div className="p-2">
                    <label
                        htmlFor="password"
                        className="form-label">
                        Password
                    </label>
                    <input
                        autoComplete="new-password"
                        value={login.password}
                        onChange={(event) => setLogin({ ...login, password: event.target.value })}
                        type="password"
                        className="form-control"
                        placeholder="Please enter your password"
                        id="password" />

                </div>
                <p className="text-secondary  p-2" ref={passwordRef} style={{ display: 'none' }} ><small> The password can not be empty !!! </small></p>
                <div
                    className="d-flex justify-content-center align-items-center p-3">
                    <button
                        type="submit"
                        className="btn btn-primary d-flex justify-content-center">
                        LOGIN

                    </button>
                    <div>
                        <AiFillRightCircle style={{ color: "purple", height: "25px", width: "25px" }} />
                    </div>
                </div>

            </form>
            <Modal
                visible={showModal}
                title="Something went wrong !"
                content={modalMessage}
                cancelButtonClick={() => setShowModal(false)}

            />
        </div>
    )
}

export default Login