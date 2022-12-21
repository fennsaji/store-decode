const { connection } = require("mui-metablockchain-sdk");
const balance = require("./src/balance");
const did = require("./src/did");
const vc = require("./src/vc");
const token = require("./src/token");
const council = require("./src/council");
const validator_set = require("./src/validator_set");
const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
    .command('deploy', 'Prepare for deployment', {
        env: {
            description: 'Environment (devnet / protonet / mainnet)',
            alias: 'e',
            type: 'string'
        },
    })
    .help()
    .alias('help', 'h').argv;

let env = argv.env || argv.e;
switch(env) {
    case 'dev': 
    case 'devnet': 
    case 'testnet': 
        env = 'devnet';
        break;
    case 'demo': 
    case 'demonet': 
    case 'protonet': 
        env = 'protonet';
        break;
    case 'main': 
    case 'mainnet': 
        env = 'mainnet';
        break;
    default: 
        throw new Error("Unknown Env. Supported Env: devnet/ protonet/ mainnet")
}

function main(env) {
    let fork = fs.readFileSync(`data/${env}/fork.json`);
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


    fs.writeFileSync(`data/${env}/state.json`, JSON.stringify({ balanceStore, didStore, vcStore, tokenStore, councilStore, validatorSetStore }));

    process.exit(0);
}

main(env);