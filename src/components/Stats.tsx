import useQuestionsStats from "../hooks/useQuestionsStats.ts";
import { RestartIcon } from "./Icons.tsx";

interface Props {
    handleReset: () => Promise<void>;
}

function Stats({ handleReset }: Props) {
    const [correctAnswers, incorrectAnswers] = useQuestionsStats();

    return (
        <section class={"w-full self-start flex justify-between gap-3"}>
            <div class={"flex gap-3 items-center"}>
                <span
                    class={`transition-all inline-flex items-center rounded-md bg-green-50 dark:bg-green-950/50 px-2 py-1 text-xs sm:text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20`}>{correctAnswers} Correctas</span>
                <span
                    class={`transition-all inline-flex items-center rounded-md bg-red-50 dark:bg-red-950/50 px-2 py-1 text-xs sm:text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20`}>{incorrectAnswers} Incorrectas</span>
            </div>
            <button onClick={handleReset} className={"hover:-rotate-90 transition-all"}>
                <RestartIcon size={32} />
            </button>
        </section>
    );
}

export default Stats;