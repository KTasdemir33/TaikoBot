const { web3, walletAddress, privateKey } = require('../../../../config/web3');
import { AppConstant } from '../../../utils/constant';

const astraABI = [
    {
        "constant": false,
        "inputs": [],
        "name": "boost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const astraContract = new web3.eth.Contract(astraABI, AppConstant.astraboost);

async function boost() {
    const nonce = await web3.eth.getTransactionCount(walletAddress, 'latest');

    const tx1 = {
        from: walletAddress,
        to: AppConstant.astraboost,
        nonce: nonce,
        gas: 500000,
        data: astraContract.methods.boost().encodeABI()
    };

    const signedTx1 = await web3.eth.accounts.signTransaction(tx1, privateKey);

    await web3.eth.sendSignedTransaction(signedTx1.rawTransaction);

    return signedTx1.transactionHash;
}

module.exports = {
    boost
};
