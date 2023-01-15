import React, { useState } from "react";
import { apiKey } from "./apiKey";

import { Axios } from 'axios';


const Login = (props) => {

    const [registerText, setRegisterText] = useState('New User?');
    const [inputValue, setInputValue] = useState('');
    const [cryptoAddress, setCryptoAddress] = useState('');

    const [loading, setLoading] = useState(false);

    async function register(cryptoAddress) {
        //mint NFT
        const FormData = require('form-data');
        const axios = new Axios({});

        const form = new FormData();
        form.append('chain', 'goerli');
        form.append('name', 'OTicket');
        form.append('description', 'Ticket to sign into class');
        form.append('contractAddress', '0x21e52Aa14dF55d51AFa779516F5677e57B41A959');
        form.append('recipientAddress', cryptoAddress);
        form.append('data', Math.round(Math.random() * 10000));

        setLoading(true);

        const response = await axios.post(
            'https://api.verbwire.com/v1/nft/mint/mintFromMetadata',
            form,
            {
                headers: {
                    'chain' : 'goerli',
                    'name' : 'OTicket',
                    'description' : 'Ticket to sign into class',
                    'contractAddress' : '0x21e52Aa14dF55d51AFa779516F5677e57B41A959',
                    'recipientAddress' : cryptoAddress,
                    'X-API-Key': apiKey,
                    'accept': 'application/json',
                    'content-type': 'multipart/form-data'
                }
            }
        );

        setLoading(false);
        setInputValue('');

        if(JSON.parse(response.data).transaction_details.status === 'Sent') {
            alert('Successfully minted NFT for address ' + cryptoAddress);
        }
    }

    async function handleNewUser() {
        if (registerText !== 'Register') {
            setRegisterText('Register');
        } else {
            if(!inputValue) return;
            register(inputValue);
        }
    }

    async function loginUser() {
        if(!cryptoAddress) return;
        console.log(cryptoAddress);

        const axios = new Axios({});

        // get list of NFTs
        const response = await axios.get('https://api.verbwire.com/v1/nft/data/owned', {
            params: {
                'walletAddress': cryptoAddress,
                'chain': 'goerli'
            },
            headers: {
                'X-API-Key': apiKey,
                'accept': 'application/json'
            }
        });

        const targetContractAddress = '0x21e52aa14df55d51afa779516f5677e57b41a959';

        const nfts = JSON.parse(response.data).nfts;
        let targetTokenId = -1;

        for (const nft of nfts) {
            if (nft.contractAddress === targetContractAddress) {
                targetTokenId = nft.tokenID;
            }
        }

        if (targetTokenId === -1) {
            alert('Wallet does not have class ticket NFT!');
        } else {
            const response = await axios.get('https://api.verbwire.com/v1/nft/data/nftDetails', {
                params: {
                    'contractAddress': targetContractAddress,
                    'tokenId': targetTokenId,
                    'chain': 'goerli'
                },
                headers: {
                    'X-API-Key': apiKey,
                    'accept': 'application/json'
                }
            });

            const nftData = JSON.parse(response.data).nft_details;
            console.log(nftData);
            const ticketDataLocation = nftData.tokenURI;
            
            const superagent = require('superagent');
            const ticketData = await superagent.get(ticketDataLocation)

            console.log(ticketDataLocation);

            console.log(ticketData);
            let ticketDataJson = JSON.parse(ticketData);
            
            const userId = ticketDataJson.attributes;
            console.log(ticketDataJson);

            console.log('Successfully retrieved userId: ', userId);

            props.authTrigger(userId);

        }
    }

    if (loading) {
        return 'Loading...';
    }
  
    return <div>
        <button onClick={handleNewUser}>{registerText}</button>
        <input
        hidden={registerText !== 'Register'}
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
        <button onClick={loginUser}>Login</button>
        <input
        value={cryptoAddress}
        onChange={event => setCryptoAddress(event.target.value)}
      />
    </div>
  }

export default Login;
