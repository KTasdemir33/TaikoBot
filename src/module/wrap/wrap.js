const { web3, walletAddress, switchRpc } = require('../../../config/web3');
const AppConstant = require('../../utils/constant');
require('dotenv').config();

const unwrapABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "wad",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contract = new web3.eth.Contract(unwrapABI, AppConstant.wrap);

async function unwrap(amount, gasPrice) {
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
        gas: AppConstant.maxGas,
        gasPrice: gasPrice,
        data: contract.methods.withdraw(web3.utils.toWei(amount.toString(), 'ether')).encodeABI(),
        nonce: nonce,
        chainId: 167000
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    return receipt.transactionHash;
}

module.exports = {
    unwrap
};
