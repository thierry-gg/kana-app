// import { useState } from 'react'
import './App.css'
// import AfficherCaractere from "./components/CharacterCard.tsx";
import type { CharacterCard }from "./components/CharacterCard.tsx";
import AfficherGrille from "./components/CharactereGrid.tsx";
import {kanadata} from "./data/Kana.tsx";

function App() {

    const hiragana: CharacterCard[] = kanadata.map(k=>({
        charactere: k.hiragana,
        romanji: k.romanji
    }))

    const katakana: CharacterCard[] = kanadata.map(k => ({
        charactere: k.hiragana,
        romanji: k.romanji
    }))

  return (
    <>
    <h1>Apprentissage du Japonais - Kana</h1>
      <div>
          <AfficherGrille title={"Hiragana"} characters={hiragana}></AfficherGrille>
          <AfficherGrille characters={katakana} title={"Katakana"}></AfficherGrille>
      </div>
    </>
  )
}

export default App
