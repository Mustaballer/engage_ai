import React, { useEffect, useState } from 'react';
import {io} from "socket.io-client";

let socket;

export const connectToServer = async () => {
    socket = io("ws://localhost:4000");

// send a message to the server
    console.log('sending hello to server....');
    socket.emit("hello from client");
    console.log('sent  to client')

// receive a message from the server
    socket.on("hello from server", (...args) => {
        // ...
    });
};

export function sendFullTranscript(transcript) {
    socket.emit('transcript_message', transcript);
}

export function listenForQuestions(setQuestionState) {
    socket.on('questions_message', (questions) => {
        const qJson = JSON.parse(questions);
        console.log('receieved questions ', questions);
        setQuestionState(qJson);
    })
}

export function sendPoints(studentId, points) {
    console.log('HSHSHDFHDSFSDF IS THIS GETTING HERE???? ', Math.round(studentId), ' points ', points)
    socket.emit('user_points', studentId, points);
}

export default connectToServer;