import { useEffect, useState } from "react";
import './RMCharactersList.css';
import utils from "../utils";
import RMCharacterCard from "./RMCharacterCard";
import { toast } from 'react-toastify';
import loaderGif from '../img/loader.gif';

function RMCharactersList () {

    let [characters, setCharacters] = useState([]);

    let [page, setPage] = useState(1);
    let [maxPages, setMaxPages] = useState(1);

    function onFirstPageClicked(event) {
        setCharacters([]); //empty the characters list to show the loader
        setPage(1);
    }

    function onPreviousPageClicked(event) {
        setCharacters([]); //empty the characters list to show the loader
        setPage(parseInt(page) - 1);
    }

    function onPageManualChange(event) {
        let inputPage = parseInt(event.target.value);

        if (isNaN(inputPage)) {
            inputPage = 1;
        } else if(inputPage < 1) {
            inputPage = 1;
        } else if(inputPage > maxPages) {
            inputPage = maxPages;
        }

        setPage(inputPage);
    }

    function onNextPageClicked(event) {
        setCharacters([]); //empty the characters list to show the loader
        setPage(parseInt(page) + 1);
    }

    function onLastPageClicked(event) {
        setCharacters([]); //empty the characters list to show the loader
        setPage(maxPages);
    }

    useEffect( () => {
        // load characters
        (async () => {
            let charactersData = await utils.getPagedRMCharacters(page.toString());

            if(charactersData.data) {
                setCharacters(charactersData.data);
                setMaxPages(charactersData.metadata.pages);
            } else {
                // if no data, then there is an error
                console.log(charactersData.error?.code, charactersData.error?.message);
                toast.error(charactersData.error?.userMessage);
            }
        })();
    }, [page]);

    return (
        <>
            <div className="RMCharactersListPager">
                    <button onClick={onFirstPageClicked}>&lt;&lt;</button>&nbsp;
                    <button disabled={parseInt(page) <= 1} onClick={onPreviousPageClicked}>&lt;</button>&nbsp;
                    <input type="number" min="1" max={maxPages} value={page} onChange={onPageManualChange}></input>&nbsp;
                    <button disabled={parseInt(page) >= maxPages} onClick={onNextPageClicked}>&gt;</button>&nbsp;
                    <button onClick={onLastPageClicked}>&gt;&gt;</button>
            </div>
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
        </>
    );
}

export default RMCharactersList;