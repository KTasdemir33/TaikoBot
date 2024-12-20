const Web3 = require('web3');
require('dotenv').config();

const endpoints = [
    'https://rpc.taiko.xyz',
    'https://rpc.mainnet.taiko.xyz',
    'https://rpc.ankr.com/taiko',
    'https://rpc.taiko.tools',
    'https://taiko.blockpi.network/v1/rpc/public'
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
