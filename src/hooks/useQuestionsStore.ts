import { Question } from "../types";
import { create } from "zustand";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

// TODO: Listen storage events to update the store

interface State {
    questions: Question[];
    currentQuestion: number;
    setQuestions: (questions: Question[]) => void;
    nextQuestion: () => void;
    prevQuestion: () => void;
    selectAnswer: (questionId: number, answerIndex: number) => void;
    reset: () => void;
}

const useQuestionsStore = create(
    persist<State>(
        (set, get) => ({
            questions: [],
            currentQuestion: 0,
            setQuestions: (questions: Question[]) => set({ questions }),
            nextQuestion: () => {
                const { currentQuestion, questions } = get();
                const nextQuestion = currentQuestion + 1;
                if (nextQuestion < questions.length) {
                    set({ currentQuestion: nextQuestion });
                }
            },
            prevQuestion: () => {
                const { currentQuestion } = get();
                const prevQuestion = currentQuestion - 1;
                if (prevQuestion >= 0) {
                    set({ currentQuestion: prevQuestion });
                }
            },
            selectAnswer: (questionId, answerIndex) => {
                const { questions } = get();
                const question = questions.find(q => q.id === questionId);
                if (question) {
                    question.userAnswer = answerIndex;
                    question.userCorrect = question.answer === answerIndex;
                    question.userCorrect && confetti();
                    set({ questions: [...questions] });
                }
            },
            reset: () => {
                set({ questions: [], currentQuestion: 0 });
            }
        })
        , {
            name: "questions"
        })
);

export default useQuestionsStore;