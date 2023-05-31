import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ListCategories from "../components/ListCategories";
import Logout from "../components/Logout";

const CategoriesHome = () => {

    const navigate = useNavigate()

    return (
        <div className="bg-image-category">
            <Header />
            <div className="container my-5">
                <h1 className="d-flex justify-content-center" 
                style={{border:"3px solid white", color:"pink", borderRadius:"10px", backgroundColor:"white", opacity:"0.8"}}>
                    CATEGORIES OF BOOKS
                </h1>
                <div>
                    <div>
                        <div className="d-flex justify-content-end m-1">
                            <Button
                                onClick={() => navigate("/add-category")}
                                type="secondary"
                                text="Add a Category"
                            />
                        </div>
                    </div>
                </div>
                <ListCategories />
            </div>
            <Logout />
        </div>
    )
}

export default CategoriesHome