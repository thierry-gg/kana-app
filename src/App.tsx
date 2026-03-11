// App.tsx
import './App.css'
import type { CharacterCard } from "./components/CharacterCard.tsx";
import AfficheGrille from "./components/CharactereGrid.tsx";
import { type Kana, kanadata } from "./data/Kana.tsx";
import QuizMode from "./components/Quiz.tsx";
import { useState, useEffect } from 'react'

const groupByRow = (kanas: Kana[]): Record<string, Kana[]> => {
    return kanas.reduce((acc, kana) => {
        if (!acc[kana.row]) acc[kana.row] = [];
        acc[kana.row].push(kana);
        return acc;
    }, {} as Record<string, Kana[]>);
};

function App() {
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
    const [mode, setMode] = useState<'study' | 'quiz'>('study');
    const grouped = groupByRow(kanadata);

    useEffect(() => {
        document.title = mode === 'quiz' ? 'Quiz ' : 'Étude';
    }, [mode]);

    return (
        <>
            <h1>Apprentissage du Japonais - Kana</h1>

            {/* ✅ 1. Nav en haut */}
            <nav>
                <button
                    className={mode === 'study' ? 'active' : ''}
                    onClick={() => setMode('study')}
                >
                    Étude
                </button>
                <button
                    className={mode === 'quiz' ? 'active' : ''}
                    onClick={() => setMode('quiz')}
                >
                    Quiz
                </button>
            </nav>

            {/* ✅ 2. Mode étude : script selector + grilles */}
            {mode === 'study' && (
                <>
                    <div className="script-selector">
                        <label>
                            <input type="radio" checked={script === 'hiragana'} onChange={() => setScript('hiragana')} />
                            Hiragana
                        </label>
                        <label>
                            <input type="radio" checked={script === 'katakana'} onChange={() => setScript('katakana')} />
                            Katakana
                        </label>
                    </div>

                    <div>
                        {Object.entries(grouped).map(([row, kanas]) => {
                            const characters: CharacterCard[] = kanas.map(k => ({
                                charactere: script === 'hiragana' ? k.hiragana : k.katakana,
                                romanji: k.romanji
                            }));
                            return <AfficheGrille key={row} title={''} characters={characters} />;
                        })}
                    </div>
                </>
            )}

            {/* ✅ 3. Mode quiz */}
            {mode === 'quiz' && <QuizMode kanaData={kanadata} />}
        </>
    );
}

export default App