const { web3, walletAddress, switchRpc } = require('../../../config/web3');
const AppConstant = require('../../utils/constant');
require('dotenv').config();

const wrapABI = [
    {
        "constant": false,
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
];

const wrapContract = new web3.eth.Contract(wrapABI, AppConstant.wrap);

async function wrap(amount, gasPrice) {
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
        to: AppConstant.wrap,
        value: web3.utils.toWei(amount.toString(), 'ether'),
        gas: AppConstant.maxGas,
        gasPrice: gasPrice,
        data: wrapContract.methods.deposit().encodeABI(),
        nonce: nonce,
        chainId: 167000
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt.transactionHash;
}

module.exports = {
    wrap
};
