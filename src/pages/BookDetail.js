import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { upperFirstLetter } from "../utils/functions";
import { Link } from "react-router-dom";

//useParams ile urlsi okuyoruz

const BookDetail = () => {

    const { booksState, categoriesState } = useSelector(state => state)


    const { bookId } = useParams()

    /*let myBook=null
    for(let i=0; i<booksState.books.length;i++){
        if(booksState.books[i].id === bookId){
            myBook=booksState.books[i]
            break 
            //break dongunun durmasini sagliyor, eger kitabi bulduysak dur
        }
    }*/

    const myBook = booksState.books.find(item => item.id === bookId)
    // find kendisi break yapiyor
    // filter dizinin sonuna kadar gider
    // find buldugu elemani dondurur
    // filter yeni dizi olusturur

    const myCategory = categoriesState.categories.find(item => item.id === myBook.categoryId)

    /**
     * bookId ye ulasmak icin iki yol var
     * 
     * 1. api ile istek atmak server'a
     * 2. direkt store'dan ulasmak
     */

    //console.log(bookId)

    /*
    2.YOL AYNI ISLEM

    const params=useParams()
    console.log(params.bookId);
    */

    return (
        <div>
            <Header />
            <div style={{ color: "white" }} className="container my-5 ">
                <div className=" container w-50"
                    style={{
                        border: "2px solid",
                        borderRadius: "5px",
                        boxShadow: "0px 0px 10px 0px white",
                        backgroundColor: "rgba(255, 99, 71, 0.6)"
                    }}>
                    <h5 style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                        className="text-center p-3">

                        <h1>Book Details</h1></h5>
                    <div className="d-flex justify-content-between my-3">
                        <h5>Book Name : </h5>
                        <h5>{upperFirstLetter(myBook.title)}</h5>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <h5>Author : </h5>
                        <h5>{upperFirstLetter(myBook.author)}</h5>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <h5>Book Price : </h5>
                        <h5>{myBook.price === "" ? "belirtilmedi" : myBook.price}</h5>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <h5>Publisher : </h5>
                        <h5>{myBook.publisher === "" ? "belirtilmedi" : upperFirstLetter(myBook.publisher)}</h5>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <h5>ISBN : </h5>
                        <h5>{myBook.isbn === "" ? "belirtilmedi" : myBook.isbn}</h5>
                    </div>
                    <div className="d-flex justify-content-between my-3">
                        <h5>Category :  </h5>
                        <h5>{upperFirstLetter(myCategory.name)}</h5>
                    </div>

                </div>
                <div className="d-flex justify-content-center" style={{ padding: "10px" }}>
                    <Link to={"/"}
                        style={{
                            textDecoration: "none",
                            height: "50px",
                            width: "50px",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "black",
                            borderRadius: "10px",
                            fontFamily: "sans-serif",
                            fontSize: "18px",
                        }}>
                        Back
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BookDetail