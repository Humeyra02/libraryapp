import React, { useState } from "react";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import Modal from "../components/Modal"
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";

const ListCategories = () => {

    const dispatch = useDispatch()

    const { categoriesState, booksState } = useSelector(state => state)
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
                            Sistemde gosterilecek kategori kaydi yok.
                        </div>
                    </div>
                )
            }
            {
                categoriesState.categories.length > 0 && (
                    <div className="w-100 d-flex justify-content-center">
                        <table
                            className={"table table-success table-striped "}>
                            <thead>
                                <tr>
                                    <th scope="col">Sira No</th>
                                    <th className="text-center" scope="col">Kategori Adi</th>
                                    <th className="text-center" scope="col">Kitap Sayisi</th>
                                    <th className="text-center" scope="col">Islemler</th>
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
                                                            className="btn btn-sm btn-secondary ">
                                                            Delete
                                                        </button>
                                                        <Link
                                                            to={`/edit-category/${category.id}`}
                                                            className="btn btn-sm btn-success ">
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