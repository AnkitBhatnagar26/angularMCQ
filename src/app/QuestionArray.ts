export interface QuestionArray {
    id: number;
    question: string;
    givenAns: boolean;
    options: Array<string>;
    answer: string;
    type: string;
}