import useQueryQuestions from "./useQueryQuestions.ts";
import useQuestionsStore from "./useQuestionsStore.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function useGameLogic() {
    const { data, refetch, isFetching } = useQueryQuestions();
    const questions = useQuestionsStore(state => state.questions);
    const setQuestions = useQuestionsStore(state => state.setQuestions);
    const nextQuestion = useQuestionsStore(state => state.nextQuestion);
    const prevQuestion = useQuestionsStore(state => state.prevQuestion);
    const currentQuestion = useQuestionsStore(state => state.currentQuestion);
    const reset = useQuestionsStore(state => state.reset);

    const queryClient = useQueryClient();

    const handleStart = () => {
        void refetch();
    };

    const handleReset = async () => {
        await queryClient.cancelQueries({
            queryKey: ["questions"]
        });

        queryClient.setQueryData(["questions"], () => {
            return [];
        });
        console.log(data);
        reset();
    };

    useEffect(() => {
        if (data) {
            setQuestions(data);
        }
    }, [data, setQuestions]);
    
    return {
        questions, 
        isLoading: isFetching || (data !== undefined && data.length > 0 && questions.length === 0),
        handleStart,
        handleReset,
        currentQuestion,
        nextQuestion,
        prevQuestion
    }
}