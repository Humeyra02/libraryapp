import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";

const Home = () => {
    const navigate = useNavigate()
    const { themeState, loginState } = useSelector(state => state)
    console.log(loginState);

    // useEffect(() => {
    //     if (!loginState.success) navigate("/login")
    // }, [])
    // baska bir yontem ama kullanmadik cunku app.js sayfasinda routes bolumunde hallettik.
    

    return (
        <div>
            <Header />
            <div style={{backgroundColor:"purple",color:"white", marginTop:"30px", marginBottom:0,padding:"3px", paddingTop:"10px"}}><h3 className="d-flex justify-content-center">List of Books</h3></div>
            <div className="container my-5">
                <div style={{ minHeight: '100vh', borderRadius: "10px" }}
                    className={themeState === "light" ? "light-theme" : "dark-theme"}>
                    <div className="contanier my-5">
                        <div className="d-flex justify-content-end">
                            <Button
                                className=" m-3 "
                                onClick={() => navigate("/add-book")}
                                type={themeState === "light" ? "warning" : "secondary"}
                                text="Add a Book !"
                            />
                        </div>
                        <ListBooks />
                    </div>
                </div>
            </div>
            <Logout/>
        </div>
    )
}

export default Home