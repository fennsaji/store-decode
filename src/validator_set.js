const {utils} = require("mui-metablockchain-sdk");
const {hexToBn} = require('@polkadot/util');

function getValidatorSet(forkJson) {
    let members_key = '0x7d9fe37370ac390779f35763d98106e8ba7fb8745735dc3be2a2c61a72c39e78';

    let members = {};

    for (const [key, hex] of Object.entries(forkJson)) {
        if(key.startsWith(members_key)) {
            members = {key, value: utils.decodeHex(hex, "Vec<Did>")};
            members = {key, value: utils.decodeHex(hex, "Vec<Did>")};
        }
    }

    return {
        members,
    }
}

module.exports = {
    getValidatorSet,
}