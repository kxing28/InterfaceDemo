import { Navigate } from "react-router-dom";

import "./storage.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function Storage(props){

    const FunctionIntro = () => {
        return (
            <div className = "storage-intro">
                <p>
                </p>
            </div>
        )
    }

    const GiveDegreePanel = () => {
        return (
            <div>
                <h2>Give a degree</h2>
                Input address, course, and year to confer a certificate:
                <br />
                Address: <input width = "30px" type = "address" id = "receiverAddress"></input>
                <br />
                Course: <input width = "30px" type = "string" id = "receiverCourse"></input>
                <br />
                Issue Year: <input width = "30px" type = "uint256" id = "receiverIssueYear"></input>
                <br />
                <div className = "storage-giveBox">
                    <button className = "btn" onClick = {props.giveCertificateHandle}>
                        Give Degree Now!
                    </button>
                </div>
                {
                        props.givePending ? 
                        <span>
                            {
                                props.giveDone ?
                                <span>Done! </span>:
                                <span>Pending... </span>
                            }
                        </span> : 
                        <span>
                            {
                                props.giveDone ?
                                <span>Rejected! </span>:
                                <span>Please try again. </span>
                            }
                        </span>
                    }
            </div>
        )
    }
    
    const StoragePage = () => {
        return (
            <div className = "storage-background">
                <h1>Student Degree Page</h1>
                Use this page to give a degree to a student.
                    <FunctionIntro/>
                <div className = "storage">
                    <GiveDegreePanel/>
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