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

export default connectToServer;