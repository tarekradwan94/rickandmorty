import { useEffect, useState } from "react";
import './RMCharactersList.css';
import utils from "../utils";
import RMCharacterCard from "./RMCharacterCard";
import { toast } from 'react-toastify';
import loaderGif from '../img/loader.gif';

function RMCharactersList () {

    let [characters, setCharacters] = useState([]);

    useEffect( () => {
        // load characters
        (async () => {
            let charactersData = await utils.getPagedRMCharacters();

            if(charactersData.data) {
                setCharacters(charactersData.data);
            } else {
                // if no data, then there is an error
                console.log(charactersData.error?.code, charactersData.error?.message);
                toast.error(charactersData.error?.userMessage);
            }
        })();
    }, []);

    return (
        <div className="RMCharactersList">
            {
                characters.length > 0 ? '' :
                    <img className="RMLoader" src={loaderGif} alt="Loading..." />
            }
            <div>
            {
                characters.map((character, index, characters) => {
                    return index === characters.length - 1 ?
                        (<RMCharacterCard key={character.id} character={character} hideSeparator={true}></RMCharacterCard>) :
                        (<RMCharacterCard key={character.id} character={character}></RMCharacterCard>) ;
                })
            }
            </div>
        </div>
    );
}

export default RMCharactersList;