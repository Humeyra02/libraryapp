import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import Button from "../components/Button";


const Home = () => {
    const navigate=useNavigate()
    return (
        <div className="container my-5">
            <Header />
            <div className="contanier my-5">
            <div className="d-flex justify-content-end"> 
                <Button onClick={()=>navigate("/add-book")} type="warning" text="kitap ekle" />
                </div>
            <ListBooks />
        </div>
        </div>
        
    )
}

export default Home