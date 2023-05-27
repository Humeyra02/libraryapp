import { React, useState } from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import api from "../api/api"
import urls from "../api/urls"
import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

/* truthy ve falsy
    truthy: true,dolu string, dolu obje
    hicbirsey koymana gerek yok basinada sonunada
    falsy: false, boş string, null, undefined, boş obje
    basina unlem koymak yeterli
*/

const AddCategory = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { categoriesState } = useSelector(state => state)

    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: ""
    })

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        /**validation */
        if (!form.name) {
            setError(true)
            setErrorMessage("This field can not be empty!")
            setTimeout(() => {
                setError(false);
            }, 4000);
            return;
        }
        const hasCategory = categoriesState.categories.find
            (item =>
                upperFirstLetter(item.name.trim().replaceAll(" ", ""))
                ===
                upperFirstLetter(form.name.trim().replaceAll(" ", ""))

            )

        /**if(hasCategory !== undefined){
            
        } 
          = if (hasCategory)
            
           ayni ifade
           */


        if (hasCategory) {
            setError(true)
            setErrorMessage(`${upperFirstLetter(hasCategory.name)} already exist this category!`)
            setTimeout(() => {
                setError(false);
            }, 4000);
            return;
        }
        /**api call */
        api.post(urls.categories, form)
            .then(res => {
                dispatch({
                    type: actionTypes.categoryActions.ADD_CATEGORY,
                    payload: form
                })
                navigate("/categories")
            })
            .catch(err => { })
    }
    return (
        <div>
            <Header />
            <div className="d-flex justify-content-center bg-danger"><h1>ADD CATEGORY PAGE</h1></div>
            <form onSubmit={handleSubmit}>
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
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                        />
                        {
                            error && (<p><small className="text-danger">{errorMessage}</small></p>)
                        }
                    </div>
                    <div className="d-flex justify-content-center my-5">
                        <button type="submit" className="btn btn-success w-50">
                            Kaydet
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddCategory