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
            <Link to = "/InterfaceDemo">Link with MetaMask Wallet</Link>
            &nbsp;|&nbsp;
            <Link to = "/InterfaceDemo/profile">Current User Information</Link>
            &nbsp;|&nbsp;
            <Link to = "/InterfaceDemo/degree">View and Confer Degree</Link>
            {/* &nbsp;|&nbsp;
            <Link to = "/InterfaceDemo/history">History</Link> */}
        </div>
    )
}
