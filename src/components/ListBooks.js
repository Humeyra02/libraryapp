import React from "react";
import { useSelector } from "react-redux";  //state ler icin store a abone olduk

const ListBooks = () => {
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
                        <table className="table table-success table-striped">
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
                                            console.log(myCategory.name)
                                        return (
                                            <tr key={book.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{book.title}</td>
                                                <td>{myCategory.name}</td>
                                                <td>
                                                    <div className="btn-group" role="group" >
                                                        <button type="button" 
                                                        className="btn btn-warning">
                                                            Detay</button>
                                                        <button type="button" 
                                                        className="btn btn-danger">
                                                            Sil</button>
                                                        <button type="button" 
                                                        className="btn btn-success">
                                                            Guncelle</button>
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

