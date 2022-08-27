require('dotenv').config();
const Web3 = require('web3');
const HDWaletProvider = require("@truffle/hdwallet-provider");

const contract = require("./build/contracts/MyToken.json");
const ABI = contract.abi

function getWalletProvider(){
    try {
        const provider = new HDWaletProvider({
            mnemonic : {
                phrase: process.env.MNEMONICS
            },
            providerOrUrl: process.env.RPC_PROVIDER
        })

        return provider;
        
    } catch (error) {
        console.log(error)
        return error
    }
}


function getContracInstance(provider){
    try {
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(ABI, process.env.CONTRACT_ADDRESS);
        return contract;
        
    } catch (error) {
        console.log(error)
    }
}


async function getContractName(contract){
    try {
        const name = await contract.methods.name().call();
        return name;
    } catch (error) {
        console.error(error)
    }
}


async function main (){
    const provider = getWalletProvider();
    const contract = getContracInstance(provider);
    //console.log(contract)

    console.log(await getContractName(contract))

    process.exit(1);
    

}

main();