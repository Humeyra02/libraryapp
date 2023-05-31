import React from "react";
import { useSelector, useDispatch } from "react-redux";  //state ler icin store a abone olduk
import { upperFirstLetter, upperFirstLetter2 } from "../utils/functions";
import Button from "./Button"
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import Modal from "./Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListBooks = () => {
    const { themeState } = useSelector(state => state) // theme state i direkt asagida digerlerini yanina ekleyebilirim
    const { booksState, categoriesState } =
        useSelector((state) => state)

    const navigate=useNavigate()

    const dispacth = useDispatch()

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const [willDeleteBook, setWillDeleteBook] = useState("")

    const deleteBook = (id) => {
        api
            .delete(`${urls.books}/${id}`)

            .then(res => {
                dispacth({ type: actionTypes.bookActions.DELETE_BOOK, payload: id })
                setOpenDeleteModal(false)
            })
            .catch(err => { })
    }
    return (
        <div >
            {
                booksState.books.length === 0 && (
                    <div className="my-5 d-flex justify-content-center">
                        <div className="alert alert-danger text-center w-75" role="alert">
                            There is no book!!
                        </div>
                    </div>
                )
            }
            {booksState.books.length > 0 && (
                <div >
                    <table className={`table table-striped ${themeState === "light" ? "table-red" : ("table-dark")}`}>
                        <thead>
                            <tr>
                                <th scope="col">S.N.</th>
                                <th scope="col">Book Title</th>
                                <th scope="col">Category</th>
                                <th scope="col">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                booksState.books.map((book, index) => {
                                    const myCategory = categoriesState.categories.find(
                                        (item) => item.id === book.categoryId
                                    )
                                    return (
                                        <tr key={book.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{upperFirstLetter2(book.title)}</td>
                                            <td>{upperFirstLetter(myCategory.name)}</td>
                                            <td>
                                                <div className="btn-group" role="group" >
                                                    <Button 
                                                        onClick={()=>navigate(`/book-detail/${book.id}`)}
                                                        className={`btn-sm
                                                         ${themeState
                                                                === 'light' ? 'buttonWhite' : 'buttonGreen'}`}
                                                        text="Details" /> 

                                                    <Button
                                                        onClick={() => {
                                                            setOpenDeleteModal(true)
                                                            setWillDeleteBook(book.id)
                                                        }} 
                                                        className="btn-sm"
                                                        text="Delete"
                                                        type={themeState === "light" ? "light" : "danger"}
                                                    />
                                                    <Button className="btn-sm"
                                                     onClick={()=>{navigate(`/edit-book/${book.id}`)}}
                                                     text="Update" 
                                                     type={themeState === "light" ? "warning" : "secondary"} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
            }
            <Modal
                title='To Delete'
                content='Are You Sure To Delete'
                hasConfirmButton={true}
                confirmButtonText="Confirm"
                confirmButtonType="warning"
                cancelButtonText="Cancel"
                cancelButtonType="danger"
                confirmButtonClick={() => { deleteBook(willDeleteBook) }}
                cancelButtonClick={() => { setOpenDeleteModal(false) }}
                visible={openDeleteModal}
            />
        </div>
    )
}

export default ListBooks


//<td>{book.title}</td> {/** dizideki her bir elemani book olarak aldigimiz icin book.title yazdigimizda books taki her bir book un title ni basicak.   */
// dizideki her bir elemani book olarak al map ile.

/**
 * onClick={()=>navigate(`/book-details/${book.id}`)}
 *                         bu sayfaya giderken book.id ile birlikte git demis olduk.             
 */
