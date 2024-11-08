import { Navigate } from "react-router-dom";

import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import logo from '../../images/graduate-cap.webp';

export default function Profile(props){

    const ProfilePage = () => {
        return (
            
        <div className = "profile-background">
            <img src = {logo} className = "profile-logo" alt = "logo" height = "100%"/>
            <div className = "profile">
                
                <div className = "profile-account">
                    <p>
                        <b className = "profile-title">My Profile</b>
                    </p>
                    
                    <p>
                        Blockchain Address:&nbsp;
                        <span className = "global-message">{props.address}</span>
                        <br/><br/>
                        Blockchain Network:&nbsp;
                        <span className = "global-message">{props.networkType}</span>
                        <br/><br/>
                        Can confer degrees?&nbsp;
                        <span className = "response-yes">YES</span>
                        <br/><br/>
                        Can receive degrees?&nbsp;
                        <span className = "response-yes">YES</span>
                        <br/>
                        
                    </p>
                </div>
            </div>

            <GlobalToolBar/>
        </div>
            
        )
    }

    return (
        <div>
            {
                props.isConnected ?
                <ProfilePage />:
                <Navigate to = '/InterfaceDemo' />
            }
        </div>
    )
}