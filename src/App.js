import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {sendFullTranscript, connectToServer} from './api';

const App = () => {
 const [message, setMessage] = useState('');
 const [disabled, setDisabled] = useState(true);

 const commands = [
  {
    command: 'reset',
    callback: () => resetTranscript()
  },
  {
    command: 'shut up',
    callback: () => setMessage('I wasn\'t talking.')
  },
  {
    command: 'hello',
    callback: () => setMessage('Hi there!')
  },
]

 const {
  transcript,
  interimTranscript,
  finalTranscript,
  resetTranscript,
  listening,
} = useSpeechRecognition({ commands });

 function sendTranscript() {
    SpeechRecognition.stopListening();
    sendFullTranscript(finalTranscript);
  }

 function resetScript() {
    resetTranscript();
    setDisabled(true);
 }

 useEffect(() => {
   if (finalTranscript !== '') {
     console.log('Got final result:', finalTranscript);
   }
 }, [interimTranscript, finalTranscript]);
 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   return null;
 }

 if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
   console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
 }
 const listenContinuously = () => {
  if(disabled) {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });
  }
 };
 return (
   <div>
     <div>
       <span>
         listening:
         {' '}
         {listening ? 'on' : 'off'}
       </span>
       <div>
         <button type="button" disabled={disabled} onClick={resetScript}>Reset</button>
         <button type="button" onClick={() => {
             setDisabled(false);
             connectToServer();
             listenContinuously();
         }}>Start Session</button>
         <button type="button" disabled={disabled} onClick={sendTranscript}>Stop</button>
       </div>
     </div>
     <div>
       {message}
     </div>
     <div>
       <span>{transcript}</span>
     </div>
   </div>
 );
};

export default App;