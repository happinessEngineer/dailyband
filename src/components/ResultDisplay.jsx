import { useState, useEffect } from 'react';
import config from '../../config';

export function ResultDisplay({ score, totalQuestions, results, gameNumber, product, isPreviouslyCompleted }) {
    const [shareText, setShareText] = useState('Share Your Score');
    const [stats, setStats] = useState({
        played: 0,
        avgScore: 0,
        currentStreak: 0,
        maxStreak: 0
    });

    useEffect(() => {
        // Calculate stats from localStorage
        const calculateStats = () => {
            let played = 0;
            let totalScore = 0;
            let currentStreak = 0;
            let maxStreak = 0;
            let streakCount = 0;

            // Get all localStorage keys and sort them by date
            const dateKeys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.match(new RegExp(`^${config.localStoragePrefix}_\\d{4}-\\d{2}-\\d{2}$`))) {
                    dateKeys.push(key);
                }
            }
            dateKeys.sort(); // Sort in ascending order

            // Get today's date in YYYY-MM-DD format
            const today = new Date().toISOString().split('T')[0];
            
            // Calculate stats
            for (let i = 0; i < dateKeys.length; i++) {
                const key = dateKeys[i];
                const gameData = JSON.parse(localStorage.getItem(key));
                played++;
                totalScore += (gameData.score / gameData.totalQuestions) * 100;

                // For streak calculation
                if (i === 0) {
                    streakCount = 1;
                } else if (isConsecutiveDate(dateKeys[i-1], key)) {
                    streakCount++;
                } else {
                    streakCount = 1;
                }

                // Update max streak
                maxStreak = Math.max(maxStreak, streakCount);
                
                // If this is today's date or the most recent date, update current streak
                if (key === today || i === dateKeys.length - 1) {
                    currentStreak = streakCount;
                }
            }

            // Helper function to check if two dates are consecutive
            function isConsecutiveDate(date1, date2) {
                const d1 = new Date(date1);
                const d2 = new Date(date2);
                const diffTime = Math.abs(d1 - d2);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays === 1;
            }

            const stats = {
                played,
                avgScore: played ? Math.round(totalScore / played) / 10 : 0,
                currentStreak,
                maxStreak
            };
            setStats(stats);
            if (!isPreviouslyCompleted) {
                sa_event('completed_game', stats);
            }
        };

        calculateStats();
    }, []);

    const generateShareText = () => {
        const boxes = results.map(result => result ? '🟩' : '⬛').join('');
        return `${config.shareText} #${gameNumber}\n\n${score}/${totalQuestions}\n${boxes}`;
    };

    const handleShare = async () => {
        try {
            const text = generateShareText();

            if (navigator.share) {
                await navigator.share({
                    text: text,
                });
            } else {
                await navigator.clipboard.writeText(text);
                setShareText('Copied!');
                setTimeout(() => setShareText('Share Your Score'), 2000);
            }
        } catch (error) {
            reportError(error);
            setShareText('Share Your Score');
        }
    };

    return (
        <div data-name="result-display" className="text-center px-8">
            <div>
                <div className="stats-container grid grid-cols-4 gap-4 mb-8 bg-gray-300 p-4 rounded-lg">
                    <div className="stat-item">
                        <div className="text-2xl font-bold">{stats.played}</div>
                        <div className="text-sm text-gray-600">Games Played</div>
                    </div>
                    <div className="stat-item">
                        <div className="text-2xl font-bold">{stats.avgScore}</div>
                        <div className="text-sm text-gray-600">Avg Score</div>
                    </div>
                    <div className="stat-item">
                        <div className="text-2xl font-bold">{stats.currentStreak}</div>
                        <div className="text-sm text-gray-600">Current Streak</div>
                    </div>
                    <div className="stat-item">
                        <div className="text-2xl font-bold">{stats.maxStreak}</div>
                        <div className="text-sm text-gray-600">Max Streak</div>
                    </div>
                </div>                
                <div 
                    data-name="score-gif" 
                    className="max-w-sm mx-auto mb-4 relative"
                >
                    <div>
                        <h2 data-name="final-score" className="text-xl font-bold text-center p-2">
                            Your Score: {score}/{totalQuestions}
                        </h2>
                        <div data-name="result-boxes" className="flex justify-center flex-wrap gap-1 mb-2">
                            {results.map((result, index) => (
                                <div
                                    key={index}
                                    data-name="result-box"
                                    className={`result-box rounded-md ${
                                        result ? 'bg-green-500' : 'bg-gray-700'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    data-name="share-button"
                    onClick={handleShare}
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors mb-16}`}
                >
                    {shareText}
                </button>
                <>
                    <img 
                        src={`${import.meta.env.BASE_URL}${config.baseDir}/images/${config.comeBackImage.filename}`}
                        alt={config.comeBackImage.altText}
                        className="mx-auto mt-8 mb-4 rounded-lg shadow-lg"
                    />                        
                    <p className="text-gray-600 mb-8">Come back tomorrow for a new set of questions!</p>
                    <div className="mb-8">
                        <button
                            onClick={() => document.getElementById('install-dialog').showModal()}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                            Add to Home Screen
                        </button>
                        
                        <dialog 
                            id="install-dialog" 
                            className="p-6 rounded-lg shadow-xl backdrop:bg-black backdrop:bg-opacity-50"
                        >
                            <p className="mb-4">Tap the <b>Share</b> button in your browser, then click <b>Add to Home Screen</b></p>
                            <button 
                                onClick={() => document.getElementById('install-dialog').close()}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </dialog>
                    </div>
                </>
            </div>
        </div>
    );
}
