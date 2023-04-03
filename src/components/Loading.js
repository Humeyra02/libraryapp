import React from "react";

const Loading = () => {
    return (
        <div style={{
            position:"fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100vh",
            backgroundColor:"rgba(0,0,0,0.2)",
            display: "flex",
            justifyContent:"center",
            alignItems:"center"

        }}>
            <div className="spinner-border text-info" role="status">
            </div>
        </div>
    )
}

export default Loading