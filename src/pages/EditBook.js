import { React, useState } from "react"
import Header from "../components/Header"
import { useParams,useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { upperFirstLetter } from "../utils/functions"
import api from "../api/api"
import urls from "../api/urls"
import actionTypes from "../redux/actions/actionTypes"

const EditBook = () => {
    
    const { bookId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { booksState, categoriesState } = useSelector(state => state)
    const myBook = booksState.books.find((item) => item.id === bookId)
    
    /*const [formState,setFormState]=useState({
        id: myBook.id,
        title: myBook.title ,
        author: myBook.author,
        publisher: myBook.publisher,
        price: myBook.price,
        isbn: myBook.isbn,
        categoryId: myBook.categoryId
    })
    */
    const [formState, setFormState] = useState(myBook)
    const handleSubmit = (event) => {
        event.preventDefault()

        if (formState.categoryId === "empty") 
        {
            alert("kategori alani zorunlu");
            return;
        }
        if (formState.title === "") 
        {
            alert('kitap alani zorunlu');
            return;
        }
        if (formState.author === "") 
        {
            alert('yazar alani zorunlu');
            return;
        }
        /**api call */

    api
    .put(`${urls.books}/${bookId}`,formState)
    .then((res)=>{
        dispatch({
            type:actionTypes.bookActions.EDIT_BOOK,
            payload: formState,
        })
        navigate("/")
    })
    .catch((err)=>{})
    }

    return (
        <div>
            <Header />
            <h1 className="d-flex justify-content-center"
                style={{ color: "white", fontFamily: "sans-serif", backgroundColor: "purple" }}>EDIT THE BOOK</h1>
            <div className="container my-5 w-50">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            style={{ color: "white" }}
                            htmlFor="title"
                            className="form-label">
                            Kitap Adi
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            placeholder="Ay Terapisi"
                            value={formState.title}
                            onChange={(event) =>
                                setFormState({ ...formState, title: event.target.value })
                            } />
                    </div>
                    <div className="mb-3">
                        <label
                            style={{ color: "white" }}
                            htmlFor="author"
                            className="form-label">
                            Yazar Adi
                        </label>
                        <input
                            type="text"
                            className="form-control"
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
                            style={{ color: "white" }}
                            htmlFor="publisher"
                            className="form-label">
                            Yayin Evi
                        </label>
                        <input
                            type="text"
                            className="form-control"
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
                            style={{ color: "white" }}
                            htmlFor="price"
                            className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
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
                            style={{ color: "white" }}
                            htmlFor="isbn"
                            className="form-label">
                            ISBN
                        </label>
                        <input
                            type="text"
                            className="form-control"
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
        </div>
    )
}

export default EditBook