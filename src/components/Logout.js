import React from "react";
import { useSelector,useDispatch} from "react-redux";
import { PoweroffOutlined } from "@ant-design/icons"
import actionTypes from "../redux/actions/actionTypes";

const Logout = () => {
    const { loginState } = useSelector(state => state)
    const dispatch=useDispatch()
    return (
        <div
            style={{
                position: "fixed",
                right: 10,
                bottom: 10,
                zIndex: 100,
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "gray"
            }}>
            <p style={{ margin: 0, display: "flex", alignItems: "center" }} >
                <span style={{paddingLeft:"5px"}}>User : {" "} </span>
                <span style={{paddingLeft:"5px"}} className="text-warning">{loginState.username}</span>
                <span
                        onClick={()=>dispatch({type:actionTypes.loginActions.LOGOUT})}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "10px",
                        cursor: "pointer"
                    }}>
                    <PoweroffOutlined />
                </span>
            </p>
        </div>
    )
}

export default Logout