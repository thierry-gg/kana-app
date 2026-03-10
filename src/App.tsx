// import { useState } from 'react'
import './App.css'
// import AfficherCaractere from "./components/CharacterCard.tsx";
import type { CharacterCard }from "./components/CharacterCard.tsx";
import AfficherGrille from "./components/CharactereGrid.tsx";

function App() {

    const hiragana: CharacterCard[] = [
        { charactere: "あ", romanji: "(a)" },
        { charactere: "い", romanji: "(i)" },
        { charactere: "う", romanji: "(u)" },
        { charactere: "え", romanji: "(e)" },
        { charactere: "お", romanji: "(o)" }
    ];
  return (
    <>
    <h1>Apprentissage du Japonais - Kana</h1>
      <div>
          <AfficherGrille title={"Hiragana"} characters={hiragana}
          ></AfficherGrille>
      </div>
    </>
  )
}

export default App
