import { Question } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "../services/questions.ts";


function useQueryQuestions() {
    const { data, refetch, isFetching } = useQuery<Question[]>({
        queryKey: ["questions"],
        queryFn: () => getQuestions(5),
        refetchOnWindowFocus: false,
        enabled: false
    });

    return {
        data,
        refetch,
        isFetching
    };
}

export default useQueryQuestions;