import { useEffect, useState } from "react";
import './RMCharactersList.css';
import utils from "../utils";
import RMCharacterCard from "./RMCharacterCard";

function RMCharactersList () {

    let [chatacters, setCharacters] = useState([]);

    useEffect( () => {
        // load characters
        (async () => {
            let charactersData = await utils.getPagedRMCharacters();

            if(charactersData.data) {
                setCharacters(charactersData.data);
            } else {
                // if no data, then there is an error
                console.log(charactersData.error?.code, charactersData.error?.message);
                alert(charactersData.error?.userMessage);
            }
        })();
    }, []);

    return (
        <div className="RMCharactersList">
            <div>
            {
                chatacters.map((character, index, chatacters) => {
                    return index === chatacters.length - 1 ?
                        (<RMCharacterCard key={character.id} character={character} hideSeparator={true}></RMCharacterCard>) :
                        (<RMCharacterCard key={character.id} character={character}></RMCharacterCard>) ;
                })
            }
            </div>
        </div>
    );
}

export default RMCharactersList;