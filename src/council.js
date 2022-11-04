const {utils} = require("mui-metablockchain-sdk");
const {hexToBn} = require('@polkadot/util');

function getCouncil(forkJson) {
    let proposals_key = '0xf9922c78cfa3c316d27a3eb48145ab1b88c2f7188c6fdd1dffae2fa0d171f440';
    let proposalsOf_key = '0xf9922c78cfa3c316d27a3eb48145ab1be9d6db8868a37d79930bc3f7f33950d1';
    let voting_key = '0xf9922c78cfa3c316d27a3eb48145ab1b71cd3068e6118bfb392b798317f63a89';
    let proposalsCount_key = '0xf9922c78cfa3c316d27a3eb48145ab1b6254e9d55588784fa2a62b726696e2b1';
    let members_key = '0xf9922c78cfa3c316d27a3eb48145ab1bba7fb8745735dc3be2a2c61a72c39e78';
    let prime_key = '0xf9922c78cfa3c316d27a3eb48145ab1bcb3136ee16886ac28a54f39e605b387a';

    let proposals = {};
    let proposalsOf = [];
    let voting = [];
    let proposalsCount = {};
    let members = {};
    let prime = {};

    for (const [key, hex] of Object.entries(forkJson)) {
        // These will not be backed up
        // if(key.startsWith(proposals_key)) {
        //     proposals = {key, value: utils.decodeHex(hex, "Vec<Hash>")};
        // }
        // if(key.startsWith(proposalsOf_key)) {
        //     proposalsOf.push({key, value: utils.decodeHex(hex, "Option<Call>")});
        // }
        // if(key.startsWith(voting_key)) {
        //     voting.push({key, value: utils.decodeHex(hex, "Option<Votes<Did, BlockNumber>>")});
        // }
        // if(key.startsWith(proposalsCount_key)) {
        //     proposalsCount = {key, value: hexToBn(hex, { isLe: true }).toString()};
        // }
        if(key.startsWith(members_key)) {
            members = {key, value: utils.decodeHex(hex, "Vec<Did>")};
        }
        if(key.startsWith(prime_key)) {
            prime = {key, value: utils.decodeHex(hex, "Option<Did>")};
        }
    }

    return {
        proposals,
        proposalsOf,
        voting,
        proposalsCount,
        members,
        prime,
    }
}

module.exports = {
    getCouncil,
}