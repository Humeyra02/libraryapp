import React from "react";
import { useSelector } from "react-redux";

const ListCategories = () => {
    
    const { categoriesState, booksState } = useSelector(state => state)
    console.log(categoriesState)

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
                    <div className="w-75 d-flex justify-content-center">
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
                                        const myBooks=booksState.books.filter(item=>item.categoryId === category.id)
                                        console.log(category.id);

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
                                                    {category.name}
                                                </td>
                                                <td className="text-center">
                                                    {myBooks.length}
                                                </td>
                                                <td>
                                                    <div className=" d-flex justify-content-center btn-group" >
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-secondary ">
                                                            Delete
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-success ">
                                                            Update
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default ListCategories