import { Navigate } from "react-router-dom";

import "./profile.css";
import "../../global.css";
import { GlobalToolBar } from "../../global";
import METAMASK from '../../images/graduate-cap.webp';

export default function Profile(props){

    const ProfilePage = () => {
        return (
            
        <div className = "profile-background">
            <div className = "profile">
                <img src = {METAMASK} alt = "logo" height = "100%"/>
                <div className = "profile-account">
                    <p>
                        <b>My Profile</b>
                    </p>
                    <hr color = "black"/>
                    <p>
                        Blockchain Address:&nbsp;
                        <span className = "global-message">{props.address}</span>
                        <br/>
                        Blockchain Network:&nbsp;
                        <span className = "global-message">{props.networkType}</span>
                        <br/>
                        Can confer degrees?&nbsp;
                        <span className = "response-yes">YES</span>
                        <br/>
                        Can receive degrees?&nbsp;
                        <span className = "response-yes">YES</span>
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