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

    const LookupStudentPanel = () => {
        return (
            <div>
                <h2>Look up Student</h2>
                Input a student address to look up their degree history:
                <br />
                <input width = "30px" type = "address" id = "inputAddress"></input>
                <div className = "storage-storeBox">
                    <button className = "btn" onClick = {props.getCertificateHandle}>
                        Look up address
                    </button>
                    <span className = "global-message">
                    {/* {JSON.stringify(props.showVal)} */}
                    </span>
                </div>
                <div className = "storage-resultBox">
                    <b>Search Result:</b>
                </div>
<table className="degreeResultsTable">
    <tbody>
        <tr>
            <td>Degree Recipient:</td>
            <td>{props.showVal[1]}</td>
        </tr>
        <tr>
            <td>Degree Sender:</td>
            <td>{props.showVal[2]}</td>
        </tr>
        <tr>
            <td>Degree Subject:</td>
            <td>{props.showVal[3]}</td>
        </tr>
        <tr>
            <td>Degree Issue Year:</td>
            <td>{props.showVal[4]}</td>
        </tr>
    </tbody>
</table>
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
                <span className = "global-message">
                    {/* {JSON.stringify(props.GiveDegreeSuccess)} */}
                </span>
            </div>
        )
    }

    const FunctionPanel = () => {
        return (
            <div className = "storage-box">
                <LookupStudentPanel/>
            </div>
        )
    }

    const StoragePage = () => {
        return (
            <div className = "storage-background">
                <h1>Student Degree Page</h1>
                Use this page to either give a degree to a student's address or look up a student's address for their degree.
                    <FunctionIntro/>
                <div className = "storage">
                    <GiveDegreePanel/>
                    <div className = "storage-vertLine">
                        <p>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;<br/>&nbsp;</p>
                    </div>
                    <LookupStudentPanel/>
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