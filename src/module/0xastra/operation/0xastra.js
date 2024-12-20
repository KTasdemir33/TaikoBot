const { web3, walletAddress, switchRpc } = require('../../../config/web3');
const AppConstant = require('../../utils/constant');
require('dotenv').config();

const boostABI = [
    {
        "constant": false,
        "inputs": [],
        "name": "boost",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];

const astraContract = new web3.eth.Contract(boostABI, AppConstant.astraboost);

async function boost(amount, gasPrice) {
    let nonce;
    try {
        nonce = await web3.eth.getTransactionCount(walletAddress);
    } catch (error) {
        console.error(`Error getting nonce: ${error.message}`);
        web3 = switchRpc();
        nonce = await web3.eth.getTransactionCount(walletAddress);
    }

    const tx = {
        from: walletAddress,
        to: AppConstant.astraboost,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: AppConstant.maxGas,
        gasPrice: gasPrice,
        data: astraContract.methods.boost().encodeABI(),
        nonce: nonce,
        chainId: 167000
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt.transactionHash;
}

module.exports = {
    boost
};
