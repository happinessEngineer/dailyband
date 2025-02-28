
export function QuestionDisplay({ question, currentQuestion, totalQuestions }) {
    return (
        <div data-name="question-display" className="question-container p-8 bg-gray-100 rounded-lg shadow-md mb-6">
            <div data-name="question-progress" className="text-gray-600 mb-4">
                {currentQuestion + 1} of {totalQuestions}: What song is this lyric from?
            </div>
            <div data-name="question-text" className="text-xl font-semibold mb-4">
                "{question.lyric}"
            </div>
        </div>
    );
}
