import React from "react";
import {Test, QuestionGroup, Question, Option} from 'react-multiple-choice';


const MultipleChoice = (props) => {
    const obj = [
        {
            question: "sd",
            options: ["a", "b"],
            answer: "a"
        },
        {
            question: "sd",
            options: ["a", "b"],
            answer: "a"
        },
        {
            question: "sd",
            options: ["a", "b"],
            answer: "a"
        },
        {
            question: "sd",
            options: ["a", "b"],
            answer: "a"
        },
    ];
    return (
        <Test onOptionSelect={selectedOptions => this.setState({selectedOptions})}>
            {obj?.map((question, index) => (
                <QuestionGroup questionNumber={index.toString()}>
                    <Question>{question.question}</Question>
                    <Option value={"po"}>Cow</Option>
                    {question?.options.map((option, i) => {
                        return <Option value={i.toString()}>{option}</Option>
                    })}
                </QuestionGroup>
            ))}
        </Test>
    );
}

export default MultipleChoice;
