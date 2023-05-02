import React, { useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes"; //dilekce konulari
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const AddBook = () => {
    const { categoriesState } = useSelector((state) => state)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [formState, setFormState] = useState({
        id: String(new Date().getTime()),
        title: "",
        author: "",
        publisher: "",
        price: "",
        isbn: "",
        categoryId: "empty"
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        if (formState.categoryId === "empty") {
            alert("kategori alani zorunlu");
            return;
        }
        if (formState.title === "") {
            alert('kitap alani zorunlu');
            return;
        }
        if (formState.author === "") {
            alert('yazar alani zorunlu');
            return;
        }

        api
            .post(urls.books, formState)
            .then((res) => {
                dispatch(
                    {
                        type: actionTypes.bookActions.ADD_BOOK,
                        payload: formState
                    })
                setOpenSuccessModal(true)
            })
            .catch(err => { })
    }

    return (
        <div>
            <Header />
            <div className="container my-5 w-50">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="title"
                            className="form-label label">
                            Kitap Adi
                        </label>
                        <input
                            type="text"
                            className="form-control input"
                            id="title"
                            placeholder="Ay Terapisi"
                            value={formState.title}
                            onChange={(event) =>
                                setFormState({ ...formState, title: event.target.value })
                            } />
                    </div>
                    <div className="mb-3">
                        <label

                            htmlFor="author"
                            className="form-label label">
                            Yazar Adi
                        </label>
                        <input
                            type="text"
                            className="form-control input"
                            id="author"
                            placeholder="Mustafa Ulusoy"
                            value={formState.author}
                            onChange={(event) =>
                                setFormState({ ...formState, author: event.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="publisher"
                            className="form-label label">
                            Yayin Evi
                        </label>
                        <input
                            type="text"
                            className="form-control input"
                            id="publisher"
                            placeholder="Iletisim"
                            value={formState.publisher}
                            onChange={(event) =>
                                setFormState({ ...formState, publisher: event.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="price"
                            className="form-label label">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control input"
                            id="price"
                            placeholder="£7"
                            value={formState.price}
                            onChange={(event) =>
                                setFormState({ ...formState, price: event.target.value })
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="isbn"
                            className="form-label label">
                            ISBN
                        </label>
                        <input
                            type="text"
                            className="form-control input"
                            id="isbn"
                            placeholder="xxxxxxxx"
                            value={formState.isbn}
                            onChange={(event) =>
                                setFormState({ ...formState, isbn: event.target.value })
                            }
                        />
                    </div>
                    <div>
                        <select
                            value={formState.categoryId}
                            onChange={(event) =>
                                setFormState({ ...formState, categoryId: event.target.value })
                            }
                            className="form-select">
                            <option value="empty" >
                                Kategori Secin
                            </option>
                            {
                                categoriesState.categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {
                                            upperFirstLetter(category.name)
                                        }
                                    </option>
                                ))
                            }
                        </select>
                        <div className="d-flex justify-content-center my-5">
                            <button type="submit" className="btn btn-success w-50">
                                Kaydet
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <Modal
                title="successfull"
                content="Added a book successfuly"
                cancelButtonText="Return to home page"
                cancelButtonType="success"
                cancelButtonClick={() => navigate("/")}
                // visible={true} bunu bir state baglamamiz lazim
                visible={openSuccessModal}
            />
        </div>
    )
}

export default AddBook