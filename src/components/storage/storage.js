import { Navigate } from "react-router-dom";

import "./storage.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function Storage(props){

    const FunctionIntro = () => {
        return (
            <div className = "storage-intro">
                <p>
                    Use this to look up a student ID
                </p>
            </div>
        )
    }

    const StoreValPanel = () => {
        return (
            <div>
                Input a student address to look up their degree history:
                <br />
                <input width = "30px" type = "address" id = "inputVal"></input>
                <br />
                <div className = "storage-storeBox">
                    <button className = "btn" onClick = {props.storeValHandle}>
                        Look up address
                    </button>
                    {
                        props.storedPending ?
                        <span>
                            {
                                props.storedDone ?
                                <span>Done! </span>:
                                <span>Pending... </span>
                            }
                        </span> : 
                        <span>
                            {
                                props.storedDone ?
                                <span>Rejected! </span>:
                                <span>Please try again. </span>
                            }
                        </span>
                    }
                </div>
            </div>
        )
    }

    const GetValPanel = () => {
        return (
            <div>
                Click 'get' to check the stored value:&nbsp;
                <span className = "global-message">
                    {props.showVal}
                </span>
                <br />
                <button className = "btn" onClick = {props.showValHandle}>
                    get
                </button>
            </div>
        )
    }

    const FunctionPanel = () => {
        return (
            <div className = "storage-box">
                <StoreValPanel/>
                <br/>
                <GetValPanel/>
            </div>
        )
    }

    const StoragePage = () => {
        return (
            <div className = "storage-background">
                <h1>Function Page</h1>
                <div className = "storage">
                    <FunctionIntro/>
                    <div className = "storage-vertLine">
                        <p>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</p>
                    </div>
                    <FunctionPanel/>
                </div>

                <GlobalToolBar/>
            </div>
        )
    }

    return (
        <div>
            {
                props.isConnected ?
                <StoragePage />:
                <Navigate to = '/InterfaceDemo' />
            }
        </div>
    )
}