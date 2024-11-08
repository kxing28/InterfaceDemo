import { Navigate } from "react-router-dom";

import "./about.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";

export default function About(props){

    const About = () => {
        return (
            <div className = "about-background">
                <div className = "about-description">
                    <h1>About Us</h1>    
                    <p>A blockchain-based solution for streamlining and securing the verification of academic records.</p>
                    <b>Made for</b>
                    <b><br/>Students</b> who want to safely keep their academic records  <br/><br/>

                    <b>Educational Institutions</b> who want convenience for confering degrees <br/><br />

                    <b>Employers</b> who want reliability when verifying candidates <br/><br/>


                </div>
                <GlobalToolBar/>
            </div>
        )
    }
    return (
        <div>
            {
                props.isConnected ?
                <About />:
                <Navigate to = '/InterfaceDemo' />
            }
        </div>
    )

}

