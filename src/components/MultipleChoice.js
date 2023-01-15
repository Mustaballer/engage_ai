import React, { useEffect, useState } from "react";
import {Test, QuestionGroup, Question, Option} from 'react-multiple-choice';
import connectToServer, { listenForQuestions } from "../api";


const MultipleChoice = () => {
    const [questionObject, setQuestionObject] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    function setOptions(choices) {
        setSelectedOptions(choices);
        console.log(choices);
    }

    async function setupConnection() {
        console.log('lob ', questionObject.length);
        await connectToServer();
        listenForQuestions(setQuestionObject);
    }
  
    useEffect(() => {
      setupConnection();
    }, []);
  
    return questionObject.length === 0 ? 'Waiting for questions...' : (
      <Test onOptionSelect={setOptions}>
        {questionObject.map((obj, idx) => {
          return (
            <QuestionGroup questionNumber={`${idx + 1}`}>
              <Question>{obj.question}</Question>
              {obj?.options.map((option, i) => {
                return <Option key={i} value={i.toString()}>{option}</Option>
              })}
            </QuestionGroup>
          )
        })}
      </Test>
    );
  }

export default MultipleChoice;
