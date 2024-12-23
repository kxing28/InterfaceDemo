import './login.css';
import '../../global.css';
import logo from '../../images/logo_blockument.jpeg';

export default function Login(props){

    const NoMetamask = () => {
        return (
            <div>
                <p>
                    No MetaMask detected. 
                    <br></br>
                    Please install&nbsp;
                    <span className = "login-highlight">
                        METAMASK 
                    </span>
                    &nbsp;to your browser to proceed. 
                </p>
            </div>
        )
    }

    const LoginMetamask = () => {
        return (
            <div>
                <p>
                    <span className = "login-highlight">
                    Please log in with METAMASK to proceed
                    </span>
                </p>
                <a className = "global-link" onClick = {props.connectTo}>
                    CONNECT TO METAMASK 
                </a>
            </div>
        )
    }

    return (
        <div className = "login">
            <img src = {logo} className = "login-logo" alt = "logo" />
            <h2 className = "login-name">
                BlockUMent <br/>
                <span className = "login-author">
                    Developed by: George Vernon-Evans, Rodrigo Massao Tibana, Kenneth Xing
                </span>
            </h2>
            {
                props.isHaveMetamask ?
                <LoginMetamask /> :
                <NoMetamask />
            }
        </div>
    )
}
