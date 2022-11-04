const {connection} = require("mui-metablockchain-sdk");
const balance = require("./src/balance");
const did = require("./src/did");
const vc = require("./src/vc");
const token = require("./src/token");
const fs = require('fs');

function main() {
    let fork = fs.readFileSync('data/fork.json');
    let forkJson = JSON.parse(fork).genesis.raw.top;
    
    let balanceStore = balance.getBalances(forkJson);
    console.log("Balances Store Decoded");

    let didStore = did.getDids(forkJson);
    console.log("Did Store Decoded");

    let vcStore = vc.getVCs(forkJson);
    console.log("VC Store Decoded");

    let tokenStore = token.getTokens(forkJson);
    console.log("Token Store Decoded");

    fs.writeFileSync('data/state.json', JSON.stringify({balanceStore, didStore, vcStore, tokenStore}));
}

main();