export interface CharacterCard {
    charactere: string;
    romanji: string;
}

function AfficherCaractere({charactere, romanji}: CharacterCard){
    return(
        <div className={"charactere-card"}>
            <h3>{charactere}</h3>
            <p>{romanji}</p>
        </div>
    );
}

export default AfficherCaractere