import './App.css';
import React from "react";
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import MultipleChoice from "./components/MultipleChoice";

const obj = [
    {
        question: "sd",
        choices: ["a", "b"],
        answer: "a"
    },
    {
        question: "sd",
        choices: ["a", "b"],
        answer: "a"
    },
    {
        question: "sd",
        choices: ["a", "b"],
        answer: "a"
    },
    {
        question: "sd",
        choices: ["a", "b"],
        answer: "a"
    },
];

const App = () => {
    return (
        <MultipleChoice props={obj} />
  );
}

export default App;
