export async function getQuestions(limit: number) {
    await delay(250);
    const res = await fetch("http://localhost:5173/data.json");
    const data = await res.json();
    return data.sort(() => Math.random() - 0.5).slice(0, limit);
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));