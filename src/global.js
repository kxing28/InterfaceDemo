import { Link } from "react-router-dom";



export const BackgroundCovered = '#282c34';
export const BackgroundUncovered = 'white';
export const MessageColorCovered = 'white';
export const MessageColorUncovered = 'black';

export const HighlightColor = 'yellow';
export const LinkColor = '#61dafb';
export const TopbarColor = '#61dafb';

export const GlobalToolBar = () => {
    return (
        <div className = "global-toolbar">
            <img src = "logo_blockument.jpeg" className = "global-logo" alt = "logo"/>
            
            <button className = "global-button">
                <Link to = "/InterfaceDemo" style={{ color: 'inherit', textDecoration: 'inherit'}}>Connect MetaMask Wallet</Link>
            </button>
            <button  className="global-button">
                <Link to = "/InterfaceDemo/profile" style={{ color: 'inherit', textDecoration: 'inherit'}}>My Profile</Link>
            </button>
            <button  className="global-button">
                <Link to = "/InterfaceDemo/degree" style={{ color: 'inherit', textDecoration: 'inherit'}}>Confer Degree</Link>
            </button>
            <button  className="global-button">
                <Link to = "/InterfaceDemo/verify" style={{ color: 'inherit', textDecoration: 'inherit'}}>Verify Degree</Link>
            </button>
            <button  className="global-button">
                <Link to = "/InterfaceDemo/about" style={{ color: 'inherit', textDecoration: 'inherit'}}>About Us</Link>
            </button>
            {/* &nbsp;|&nbsp;
            <Link to = "/InterfaceDemo/history">History</Link> */}
        </div>
    )
}
