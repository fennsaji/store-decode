const {connection} = require("mui-metablockchain-sdk");
const balance = require("./src/balance");
const did = require("./src/did");
const fs = require('fs');

function main() {
    let fork = fs.readFileSync('data/fork.json');
    let forkJson = JSON.parse(fork).genesis.raw.top;
    
    let balanceStore = balance.getBalances(forkJson);
    console.log("Balances Store");
    console.log(balanceStore);

    let didStore = did.getDids(forkJson);
    console.log("Did Store");
    console.log(didStore);

    fs.writeFileSync('data/state.json', JSON.stringify({balanceStore, didStore}));
}

main();