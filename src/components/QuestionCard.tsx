import { Question, Theme } from "../types.d";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark, stackoverflowLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useQuestionsStore from "../hooks/useQuestionsStore.ts";
import useThemeStore from "../hooks/useThemeStore.ts";

interface Props {
    question: Question;
}

const getBackgroundColor = (index: number, answer: number, userAnswer?: number) => {
    if (userAnswer === undefined) return "hover:bg-sky-400 dark:hover:bg-neutral-700";

    if (index === answer) return "bg-green-500";
    
    if (index === userAnswer) return "bg-red-500";
    
    return "";
};

function QuestionCard({ question: { question, code, options, id, answer, userAnswer } }: Props) {
    const selectedAnswer = useQuestionsStore(state => state.selectAnswer);
    const theme = useThemeStore(state => state.theme);

    const handleSelectAnswer = (index: number) => () => {
        selectedAnswer(id, index);
    };

    return (
        <section className={`bg-white border-gray-300 dark:bg-neutral-900 dark:border-gray-100/25
        self-stretch rounded p-3 sm:p-5 flex flex-col gap-4 border transition-all`}>
            <h4 className={"text-base sm:text-2xl"}>{question}</h4>
            <div class={"sm:text-sm text-xs"}>
                <SyntaxHighlighter language={"JavaScript"} style={theme === Theme.Light ? stackoverflowLight : stackoverflowDark}>
                    {code}
                </SyntaxHighlighter>
            </div>
            <ul class={`bg-sky-500 dark:bg-neutral-800 dark:divide-gray-100/25 divide-y text-white transition-all`}>
                {options.map((option, index) => (
                    <li key={index}>
                        <button disabled={userAnswer !== undefined}
                            class={`sm:p-4 p-2 w-full ${getBackgroundColor(index, answer, userAnswer)} transition-all`}
                            onClick={handleSelectAnswer(index)}>{option}</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default QuestionCard;