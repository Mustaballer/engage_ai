import React, { useEffect, useState } from "react";
import {Test, QuestionGroup, Question, Option} from 'react-multiple-choice';
import connectToServer, { listenForQuestions, sendPoints } from "../api";
import Login from "./Login";


const MultipleChoice = () => {
    const [userId, setUserId] = useState(Math.random() * 100);
    const [questionObject, setQuestionObject] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    function setOptions(choices) {
        setSelectedOptions(choices);
        console.log('choices ', choices);
    }

    function submitQuestion() {
        console.log('sdfsddfs')
        if (Object.keys(selectedOptions).length > 0) {
            console.log('sdfdsf SSDFDSFDSFDFDFFFF')
            let points = 0;
            console.log('keysssss ', Object.keys(selectedOptions));
            for (const i of Object.keys(selectedOptions)) {
                const selectedOption = selectedOptions[i];
                console.log(questionObject[parseInt(i) - 1].answer);
                console.log(parseInt(i) - 1);
                points += (questionObject[parseInt(i) - 1].answer === questionObject[parseInt(i) - 1].options[selectedOption] ? 2 : 0);
            }
            sendPoints(userId, points);
            setSelectedOptions([]);
            setQuestionObject([]);
        }
    }

    async function setupConnection() {
        await connectToServer();
        listenForQuestions(setQuestionObject);
    }

    function triggerAuth(userId) {
        setUserId(userId);
        setLoggedIn(true);
    }
  
    useEffect(() => {
      setupConnection();
    }, []);
  
    if (!loggedIn) {
        return (<Login authTrigger={triggerAuth}/>);
    }
    else return questionObject.length === 0 ? 'Waiting for questions...' : (
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
        <button onClick={submitQuestion}>Submit</button>
      </Test>
    );
  }

export default MultipleChoice;
