import { AmplifySignOut } from '@aws-amplify/ui-react';
import './styles.css';

const Header = () => {
    return(
        <header className="App-header">
            <h2>Recordings manager</h2>  
            <AmplifySignOut />
        </header >
    )
}

export default Header;