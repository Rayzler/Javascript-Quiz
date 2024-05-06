import "./app.css";
import { ChevronLeftIcon, ChevronRightIcon, JavascriptIcon } from "./components/Icons.tsx";
import QuestionCard from "./components/QuestionCard.tsx";
import ThemeSwitch from "./components/ThemeSwitch.tsx";
import Loader from "./components/Loader.tsx";
import useGameLogic from "./hooks/useGameLogic.ts";
import Stats from "./components/Stats.tsx";

export function App() {
    const {
        questions,
        handleStart,
        handleReset,
        isLoading,
        currentQuestion,
        nextQuestion,
        prevQuestion
    } = useGameLogic();

    return (
        <>
            <ThemeSwitch />
            <main
                class={`w-screen h-screen transition-all flex flex-col items-center gap-3 bg-neutral-50 dark:bg-neutral-950 pt-16 px-6`}>
                <header class={"flex gap-4 items-center"}>
                    <JavascriptIcon />
                    <h1 class={"sm:text-5xl text-4xl"}>JavaScript Quiz</h1>
                </header>
                <article class={"w-full max-w-2xl flex flex-col items-center gap-3"}>
                    {
                        questions.length > 0 && (
                            <>
                                <section class={"flex items-center gap-5"}>
                                    <button onClick={prevQuestion}><ChevronLeftIcon size={36} /></button>
                                    <span class={"flex text-sm sm:text-base"}>{currentQuestion + 1} / 5</span>
                                    <button onClick={nextQuestion}><ChevronRightIcon size={36} /></button>
                                </section>

                                <Stats handleReset={handleReset} />
                            </>
                        )
                    }

                    {
                        questions.length > 0 ? <QuestionCard question={questions[currentQuestion]} /> :
                            (isLoading) ?
                                <Loader /> :
                                <button className={"bg-yellow-400 text-black text-2xl p-2 font-semibold mt-4"}
                                        onClick={handleStart}>Comenzar</button>
                    }
                </article>
            </main>
        </>
    );
}
