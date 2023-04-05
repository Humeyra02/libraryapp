import React from "react";
import { useSelector } from "react-redux";  //state ler icin store a abone olduk
import { upperFirstLetter, upperFirstLetter2 } from "../utils/functions";
import Button from "./Button"

const ListBooks = () => {
    const {themeState}=useSelector(state=>state) // theme state i direkt asagida digerlerini yanina ekleyebilirim
    const { booksState, categoriesState } = 
    useSelector((state) => state)
    return (
        <div>
            {
                booksState.books.length === 0 && (
                    <div className="my-5 d-flex justify-content-center">
                        <div className="alert alert-danger text-center w-75" role="alert">
                            Sistemde gosterilecek kitap kaydi yok.
                        </div>
                    </div>
                )
            }
            { booksState.books.length > 0 && (
                    <div>
                        <table className={`table table-success table-striped ${themeState === "light" ? ("table-light") : ("table-dark")}`}>
                            <thead>
                                <tr>
                                    <th scope="col">Sira No</th>
                                    <th scope="col">Kitap Adi</th>
                                    <th scope="col">Kategori</th>
                                    <th scope="col">Islemler</th>
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
                                                        <Button className="btn-sm" text="detay" type={themeState=== "light" ? "success" : "light"}/>
                                                        <Button className="btn-sm" text="sil" type={themeState=== "light" ? "info" : "danger"}/>
                                                        <Button className="btn-sm" text="guncelle" type={themeState=== "light" ? "warning" : "secondary"}/>
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
        </div>
    )
}

export default ListBooks


//<td>{book.title}</td> {/** dizideki her bir elemani book olarak aldigimiz icin book.title yazdigimizda books taki her bir book un title ni basicak.   */
// dizideki her bir elemani book olarak al map ile.

