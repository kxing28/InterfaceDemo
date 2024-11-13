import { Navigate } from "react-router-dom";

import "./verify.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function Verify(props){

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
                Use this page to look up a student.
                    <FunctionIntro/>
                <div className = "storage">
                   
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