const {connection} = require("mui-metablockchain-sdk");
const balance = require("./src/balance");
const did = require("./src/did");
const vc = require("./src/vc");
const token = require("./src/token");
const council = require("./src/council");
const validator_set = require("./src/validator_set");
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

    let councilStore = council.getCouncil(forkJson);
    console.log("Council Store Decoded");

    let validatorSetStore = validator_set.getValidatorSet(forkJson);
    console.log("Validator Set Store Decoded");


    fs.writeFileSync('data/state.json', JSON.stringify({balanceStore, didStore, vcStore, tokenStore, councilStore, validatorSetStore}));
}

main();