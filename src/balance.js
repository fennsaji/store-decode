const {utils} = require("mui-metablockchain-sdk");
const {hexToBn} = require('@polkadot/util');

function getBalances(forkJson) {
    let account_key = '0xc2261276cc9d1f8598ea4b6a74b15c2fb99d880ec681799c0cf30e8886371da9';
    let locks_key = '0xc2261276cc9d1f8598ea4b6a74b15c2f218f26c73add634897550b4003b26bc6';
    let total_issuance_key = '0xc2261276cc9d1f8598ea4b6a74b15c2f57c875e4cff74148e4628f264b974c80';

    let accounts = [];
    let locks = [];
    let totalIssuance = '';

    for (const [key, hex] of Object.entries(forkJson)) {
        if(key.startsWith(account_key)) {
            accounts.push({key, value: utils.decodeHex(hex, "AccountData")});
        }
        if(key.startsWith(locks_key)) {
            locks.push({key, value: utils.decodeHex(hex, "Vec<BalanceLock>")});
        }
        if(key.startsWith(total_issuance_key)) {
            totalIssuance = {key, value: hexToBn(hex, { isLe: true }).toString()};
        }
    }

    return {
        accounts,
        locks,
        totalIssuance,
    }
}

module.exports = {
    getBalances,
}