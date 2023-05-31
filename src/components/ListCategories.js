import React, { useState } from "react";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import Modal from "../components/Modal";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";

const ListCategories = () => {

    const dispatch = useDispatch()

    const { categoriesState, booksState, themeState } = useSelector(state => state)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [willDeleteCategory, setWillDeleteCategory] = useState("")

    const deleteCategory = (id) => {
        api.delete(`${urls.categories}/${id}`)
            .then(res => {
                dispatch
                    ({
                        type: actionTypes.categoryActions.DELETE_CATEGORY,
                        payload: id
                    })
                dispatch
                    ({
                        type: actionTypes.bookActions.DELETE_BOOKS_AFTER_DELETE_CATEGORY,
                        payload: id
                    })
                setShowDeleteModal(false)
            })
            .catch(err => { })
    }

    return (
        <div>
            {
                categoriesState.categories.length === 0 && (
                    <div className="my-5 d-flex justify-content-center">
                        <div className="alert alert-danger text-center w-75" role="alert">
                            There is no category!!
                        </div>
                    </div>
                )
            }
            {
                categoriesState.categories.length > 0 && (
                    <div 
                    className="d-flex justify-content-center">
                        <table

                            style={{width:"500px", fontWeight: "500"}}
                            
                            className={`table ${themeState === "light" ? "light-category-theme" : "dark-category-theme"}`}>
                                
                            <thead>
                                <tr>
                                    <th scope="col">S.N.</th>
                                    <th className="text-center" scope="col">Category Name</th>
                                    <th className="text-center" scope="col">Number of Books</th>
                                    <th className="text-center" scope="col">Operations</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categoriesState.categories.map((category, index) => {
                                        const myBooks = booksState.books.filter(item => item.categoryId === category.id)


                                        /*
                                          FOR DONGUSU ILE YAPIMI
                                          
                                          const myBooks=[]
                                          for(let i=0; i<booksState.books.length;i++){
                                          if(booksState.books[i].categoryId === category.id){
                                          myBooks.push(booksState.books[i])}
                                          }else{
                                          continue}

                                          find break
                                          filter continue yapar

                                         */
                                        
                                        return (
                                            <tr key={category.id}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td className="text-center">
                                                    {upperFirstLetter(category.name)}
                                                </td>
                                                <td className="text-center">
                                                    {myBooks.length}
                                                </td>
                                                <td>
                                                    <div className=" d-flex justify-content-center btn-group" >
                                                        <button
                                                            onClick={() => {
                                                                setShowDeleteModal(true)
                                                                setWillDeleteCategory(category.id)
                                                                // will delete category ye category.id bilgisini bu state e yukle.
                                                            }}
                                                            type="button"
                                                            className="btn btn-sm btn-secondary "
                                                            style={{width:"30px",fontSize:"10px"}}>
                                                            Delete
                                                        </button>
                                                        <Link
                                                            to={`/edit-category/${category.id}`}
                                                            className="btn btn-sm btn-success " 
                                                            style={{width:"30px", fontSize:"10px"}}>
                                                            Update
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                        <Modal
                            visible={showDeleteModal} // showdeletemodal onclickte true dedigimiz icin bu modalin gorunurlugunu bu state e bagladik.

                            title="Delete"
                            content="If the category is delete everybook will delete, are you sure to continue?"
                            cancelButtonText='Cancel'
                            cancelButtonClick={() => setShowDeleteModal(false)}
                            hasConfirmButton={true}
                            confirmButtonText="Confirm"
                            confirmButtonClick={() => deleteCategory(willDeleteCategory)} //yani buraya silinecek kategory id bilgisini yukledik.
                        />
                    </div>
                )
            }
        </div>
    )
}

export default ListCategories