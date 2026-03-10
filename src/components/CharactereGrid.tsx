import CharacterCard, {type CharacterCard as C} from "./CharacterCard.tsx";

interface CharactereGrid{
    characters: C[];
    title: string;
}

function AfficheGrille({characters, title}: CharactereGrid) {
    return(
        <div className={"charctere-grille"}>
            <h3>{title}</h3>
                <div className={"grid"}>
                    {characters.map((character, index)=>(

                    <CharacterCard key={index}
                                   charactere={character.charactere}
                                   romanji={character.romanji}>
                    </CharacterCard>
                    ))}
                </div>
        </div>
    );
}

export default AfficheGrille
