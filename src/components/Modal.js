import React from "react";

const Modal = ({
    title = "",
    content = "",
    confirmButtonText = "Confirm",
    confirmButtonType = "danger",
    confirmButtonClick = () => { },
    hasConfirmButton = false,
    cancelButtonText = 'Kapat',
    cancelButtonType = "primary",
    cancelButtonClick = () => { },
    visible=false
}) => {
        if (visible===false) return null
    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0,
            zIndex: 10, width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(70,0,9,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    width: '200px'
                }}>
                <h1 className="text-center">
                    {title}
                </h1>
                <p className="text-center">
                    {content}
                </p>
                <div className="d-flex justify-content-center align-items-center gap-4">
                    {
                        hasConfirmButton === true && (
                            <button onClick={confirmButtonClick} className={`btn btn-${confirmButtonType}`}> {confirmButtonText} </button>
                        )
                    }
                    <button onClick={cancelButtonClick} className={`btn btn-${cancelButtonType}`}> {cancelButtonText} </button>
                </div>
            </div>
        </div>
    )
}

export default Modal