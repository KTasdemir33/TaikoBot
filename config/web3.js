const Web3 = require('web3');
require('dotenv').config();

const endpoints = [
    "https://rpc.test.taiko.xyz",
    "https://alternate-rpc.test.taiko.xyz"
];

let currentEndpointIndex = 0;
let web3 = new Web3(endpoints[currentEndpointIndex]);

const switchRpc = () => {
    currentEndpointIndex = (currentEndpointIndex + 1) % endpoints.length;
    web3 = new Web3(endpoints[currentEndpointIndex]);
    return web3;
};

const walletAddress = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY).address;

module.exports = {
    web3,
    walletAddress,
    switchRpc
};
