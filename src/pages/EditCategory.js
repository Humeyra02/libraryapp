import React, { useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

// useParams ile url icindeki parametreleri okuyabiliyoruz

const EditCategory = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const { categoryId } = useParams()
    const { categoriesState } = useSelector((state) => state)

    const myCategory = categoriesState.categories.find
        (item => item.id === categoryId)

    // categories state icinde categories dizisi icindeki her bir objeyi item olarak al,
    // her bir item yani her bir category objesi icinde id ve name var. 
    // her bir item in id si bizim url de tasidigimiz yani uopdate butonuna basdigimiz 
    // kitabin id si esitse eger
    // bu objeyi myCategory olarak ata demis olduk. YUKARIDAKI FIND ISLEMI aciklamasi.

    // yani sonuc olarak myCategory olarak o kitabin objesini bize getirmis oldu.


    const [category, setCategory] = useState(myCategory)

    //kisa yol ^

    // uzun yol ¬
    // const [category,setCategory]=useState({

    //     id: myCategory.id,
    //     name: myCategory.name
    // })

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        // // validation
        // if(!category.name)/*= soldaki deger ile bu yazim ayni anlamda (category.name==="")*/{
        //     setError(true)
        //     setErrorMessage("The Category name can not be empty")
        //     return
        // }

        /**validation */
        if (!category.name) {
            setError(true)
            setErrorMessage("This category field can not be empty!")
            setTimeout(() => {
                setError(false);
            }, 4000);
            return;
        }
        const hasCategory = categoriesState.categories.find
            (item =>
                upperFirstLetter(item.name.trim().replaceAll(" ", ""))
                ===
                upperFirstLetter(category.name.trim().replaceAll(" ", ""))

            )

        /**if(hasCategory !== undefined){
            
        } 
          = if (hasCategory)
            
           ayni ifade
           */


        if (hasCategory) {
            setError(true)
            setErrorMessage(
                `${upperFirstLetter
                    (hasCategory.name)} already exist this category!`)
            setTimeout(() => {
                setError(false);
            }, 4000);
            return;
        }


        /**api call */
        api.put(`${urls.categories}/${categoryId}`,category)
        .then(res=>{
            dispatch({type: actionTypes.categoryActions.EDIT_CATEGORY,payload:category})
            navigate("/categories")
            return
        })
        .catch(err=>{})


    }

    return (
        <div>
            
            <Header />
            <div style={{backgroundColor:"purple", paddingTop:"5px", margin:"10px", borderRadius:"5px"}} className="d-flex justify-content-center">
                <h2 style={{color:"white"}}>EDIT CATEGORY</h2>
            </div>
            <form onSubmit={handleSubmit} >
                <div className="container my-5 w-50">
                    <div className="mb-3">
                        <label
                            htmlFor="name"
                            className="form-label label">
                            Category Name
                        </label>
                        <input
                            type="text"
                            className="form-control input"
                            id="name"
                            placeholder="roman"
                            value={category.name}
                            onChange={(event) => setCategory({ ...category, name: event.target.value })}
                        />
                        {error && (
                            <p>
                                <small className="text-danger">{errorMessage}</small>
                            </p>
                        )}
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <button disabled={
                            upperFirstLetter(myCategory.name.trim().replaceAll(" ", ""))
                            ===
                            upperFirstLetter(category.name.trim().replaceAll(" ", ""))
                            ? true : false
            
                        }

                            type="submit" className="btn btn-success w-50">
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditCategory