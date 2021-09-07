import { useState } from 'react';
import './RMCharacterCard.css';
import utils from '../utils';
import { toast } from 'react-toastify';
import loaderGif from '../img/loader.gif';

function RMCharacterCard(props) {
    
    let [areDetailsShown, showDetails] = useState(false);
    let [details, setDetails] = useState({});

    async function toggleDetails() {
        showDetails(!areDetailsShown);

        loadDetails();
    };

    async function loadDetails() {
        if(Object.keys(details).length === 0) {
            let characterExtraDetails = await utils.getCharacterExtraDetails(props.character);

            //there might be multiple errors and multiple responses
            if(Array.isArray(characterExtraDetails.error)) {
                for(let error of characterExtraDetails.error) {
                    console.log(error?.code, error?.message);
                    toast.error(error?.userMessage);
                }
            }

            if(Array.isArray(characterExtraDetails.data)) {
                //response 0 is the origin details
                let originDetails = characterExtraDetails.data.shift();

                //response 1 is the location details
                let locationDetails = characterExtraDetails.data.shift();

                //other responses are for episodes
                let episodesDetails = characterExtraDetails.data;

                setDetails({
                    originDetails,
                    locationDetails,
                    episodesDetails
                });
            }
        }
    }

    return (
        <div className="RMCharacterCard" onClick={toggleDetails}>
            <div className="row">
                <div className="col-sm-2 RMAvatarBox">
                    <img src={props.character.image} className="RMAvatar" alt={`Avatar of ${props.character.name}`} />
                    <span>
                    {
                        areDetailsShown ? "Hit to close" :
                        "Hit me"
                    }
                    </span>
                </div>
                <div className="col-sm-3 RMInfoBox">
                    <h2>{props.character.name}</h2>
                    <div className="spacer"></div>
                    <div><label>Number of episodes:&nbsp;</label><span>{props.character.episode.length}</span></div>
                </div>
                <div className="col-sm-2 RMInfoBox">
                    <div className="spacer"></div>
                    <div><label>Status:&nbsp;</label><span>{props.character.status}</span><br />
                        <label>Gender:&nbsp;</label><span>{props.character.gender}</span></div>
                </div>
                <div className="col-sm-3 RMInfoBox">
                    <div className="spacer"></div>
                    <div>
                        <label>Origin:&nbsp;</label><span>{props.character.origin.name}</span><br />
                        <label>Location:&nbsp;</label><span>{props.character.location.name}</span>
                    </div>
                </div>
                <div className="col-sm-2 RMInfoBox">
                    <div className="spacer"></div>
                    <div>
                        <label>Type:&nbsp;</label><span>{props.character.type || "Unknown"}</span><br />
                        <label>Species:&nbsp;</label><span>{props.character.species}</span>
                    </div>
                </div>
            </div>
            {
                !areDetailsShown ? "" : 
                <div className="RMDetails">
                    {
                        Object.keys(details).length > 0 ? '' :
                            <img className="RMLoader" src={loaderGif} alt="Loading..." />
                    }
                    {
                        !details.originDetails ? "" :
                        <div className="row">
                            <div className="col-sm-3 RMInfoBox">
                                <span>Origin: <span className="noBold">{details.originDetails.name}</span></span>
                            </div>
                            <div className="col-sm-3 RMInfoBox">
                                <span>Type: <span className="noBold">{details.originDetails.type}</span></span>
                            </div>
                            <div className="col-sm-3 RMInfoBox">
                                <span>Dimension: <span className="noBold">{details.originDetails.dimension}</span></span>
                            </div>
                            <div className="col-sm-3 RMInfoBox">
                                <span>Number of residents: <span className="noBold">{details.originDetails.residents.length}</span></span>
                            </div>
                        </div>
                    }
                    {
                        !details.locationDetails ? "" :
                        <div className="row">
                            <div className="col-sm-3 RMInfoBox">
                                <span>Location: <span className="noBold">{details.locationDetails.name}</span></span>
                            </div>
                            <div className="col-sm-3 RMInfoBox">
                                <span>Type: <span className="noBold">{details.locationDetails.type}</span></span>
                            </div>
                            <div className="col-sm-3 RMInfoBox">
                                <span>Dimension: <span className="noBold">{details.locationDetails.dimension}</span></span>
                            </div>
                            <div className="col-sm-3 RMInfoBox">
                                <span>Number of residents: <span className="noBold">{details.locationDetails.residents.length}</span></span>
                            </div>
                        </div>
                    }
                    {
                        !Array.isArray(details.episodesDetails) ? "" :
                        <div className="row">
                            <div className="col-sm-12 RMInfoBox">
                                <span>Episodes list: <span className="noBold">{(details.episodesDetails.map((episode) => episode ? `'${episode?.name}'` : "")).join(",")}</span></span>
                            </div>
                        </div>
                    }
                </div>
            }
            {
                props.hideSeparator ? "" : <div className="separator"></div>
            }
        </div>
    );
}

export default RMCharacterCard;