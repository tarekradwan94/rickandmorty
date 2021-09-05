import './RMCharacterCard.css';

function RMCharacterCard(props) {
    return (
        <div className="RMCharacterCard">
            <div className="row">
                <div className="col-sm-2 RMInfoBox">
                    <img src={props.character.image} className="RMAvatar" alt={`Avatar of ${props.character.name}`} />
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
                props.hideSeparator ? "" : <div className="separator"></div>
            }
        </div>
    );
}

export default RMCharacterCard;