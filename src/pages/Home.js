import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";

const Home = () => {
    return (
        <div>
            <Header />
            <ListBooks />
        </div>
    )
}

export default Home