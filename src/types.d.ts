export interface Question {
    id:       number;
    question: string;
    code:     string;
    options:  string[];
    answer:   number;
    userAnswer?: number;
    userCorrect?: boolean;
}

export enum Theme {
    Light,
    Dark
}