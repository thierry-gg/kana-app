import type { Kana } from "../data/Kana.tsx";
import { useState, useEffect } from 'react';

function Quiz({ kanaData }: { kanaData: Kana[] }) {
    const [script, setScript] = useState<'hiragana' | 'katakana' | 'les deux'>('hiragana');
    const [shuffledKana] = useState(() =>
        [...kanaData].sort(() => Math.random() - 0.5)
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    // ✅ score avec localStorage, DANS le composant, PAS dans handleSubmit
    const [score, setScore] = useState(() => {
        const saved = localStorage.getItem('kana-score');
        return saved ? JSON.parse(saved) : { correct: 0, total: 0 };
    });

    // ✅ useEffect DANS le composant, PAS dans handleSubmit
    useEffect(() => {
        localStorage.setItem('kana-score', JSON.stringify(score));
    }, [score]);

    const currentKana = shuffledKana[currentIndex % shuffledKana.length];

    const displayChar = script === 'hiragana'
        ? currentKana.hiragana
        : script === 'katakana'
            ? currentKana.katakana
            : currentIndex % 2 === 0 ? currentKana.hiragana : currentKana.katakana;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isCorrect = userAnswer.toLowerCase().trim() === currentKana.romanji.toLowerCase();

        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1
        }));

        setFeedback(isCorrect ? '✅ Correct !' : `❌ Incorrect. C'était : ${currentKana.romanji}`);
        setUserAnswer('');

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setFeedback('');
        }, 1500);
    };

    return (
        <div>
            <div className="script-selector">
                <label>
                    <input type="radio" checked={script === 'hiragana'} onChange={() => setScript('hiragana')} />
                    Hiragana
                </label>
                <label>
                    <input type="radio" checked={script === 'katakana'} onChange={() => setScript('katakana')} />
                    Katakana
                </label>
                <label>
                    <input type="radio" checked={script === 'les deux'} onChange={() => setScript('les deux')} />
                    Les deux
                </label>
            </div>

            <div className="quiz-container">
                <div className="score">Score : {score.correct} / {score.total}</div>
                <h2 className="charactere-display">{displayChar}</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="Entrer votre réponse"
                    autoFocus
                    disabled={feedback !== ''}
                />
                <button type="submit" disabled={userAnswer.trim() === '' || feedback !== ''}>
                    Valider
                </button>
            </form>

            {feedback && <div>{feedback}</div>}
        </div>
    );
}

export default Quiz;