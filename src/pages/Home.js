import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import Button from "../components/Button";
import { useSelector } from "react-redux";

const Home = () => {
    const navigate = useNavigate()
    const { themeState } = useSelector(state => state)
    return (
        <div>
            <Header />
            <div className="container my-5">
                <div style={{ minHeight: '100vh', borderRadius: "10px" }}
                    className={themeState === "light" ? "bg-light" : "bg-dark"}>

                    <div className="contanier my-5">
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={() => navigate("/add-book")}
                                type={themeState === "light" ? "warning" : "secondary"}
                                text="kitap ekle" />
                        </div>
                        <ListBooks />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home