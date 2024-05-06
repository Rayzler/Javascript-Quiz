import useQuestionsStore from "./useQuestionsStore.ts";

function useQuestionsStats() {
    const questions = useQuestionsStore(state => state.questions);

    const correct = questions.filter(q => q.userCorrect).length;
    const incorrect = questions.filter(q => q.userCorrect === false).length;

    return [correct, incorrect];
}

export default useQuestionsStats;