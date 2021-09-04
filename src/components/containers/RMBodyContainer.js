import logo from '../../img/rm-logo.png';
import './RMBodyContainer.css';
import RMCharactersList from '../RMCharactersList';

function RMBodyContainer () {
    return (
        <div className="RMBodyContainer">
            <img className="RMLogo" src={logo} alt="Rick and Morty logo" />
            <RMCharactersList></RMCharactersList>
        </div>
    );
}

export default RMBodyContainer;