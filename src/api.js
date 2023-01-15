import React, { useEffect, useState } from 'react';
import {io} from "socket.io-client";

export const connectToServer = async () => {
    const socket = io("ws://localhost:3001");

// send a message to the server
    socket.emit("hello from client", 5, "6", {7: Uint8Array.from([8])});

// receive a message from the server
    socket.on("hello from server", (...args) => {
        // ...
    });
};

export default connectToServer;