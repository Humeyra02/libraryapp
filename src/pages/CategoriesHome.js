import React from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import ListCategories from "../components/ListCategories";

const CategoriesHome = () => {
    
    const navigate = useNavigate()

    return (
        <div className="bg-image-category">
        
            <Header />
            <div className="container my-5">
                <h1 className="bg-warning d-flex justify-content-center">CATEGORIES OF BOOKS</h1>
                <div>
                    <div>
                        <div className="d-flex justify-content-center p-2">
                            <Button
                                onClick={() => navigate("/add-category")}
                                type="secondary"
                                text="add a category"
                            />
                        </div>
                    </div>
                </div>
                <ListCategories/>
            </div>
        </div>
    )
}

export default CategoriesHome