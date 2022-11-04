const {utils} = require("mui-metablockchain-sdk");
const {hexToBn} = require('@polkadot/util');

function getTokens(forkJson) {
    let totalIssuance_key = '0x99971b5749ac43e0235e41b0d378691857c875e4cff74148e4628f264b974c80';
    let locks_key = '0x99971b5749ac43e0235e41b0d3786918218f26c73add634897550b4003b26bc6';
    let accounts_key = '0x99971b5749ac43e0235e41b0d37869188ee7418a6531173d60d1f6a82d8f4d51';
    let tokenData_key = '0x99971b5749ac43e0235e41b0d3786918744bc0dea7388ca032c21224f5003f2d';
    let tokenIssuer_key = '0x99971b5749ac43e0235e41b0d3786918aa9e2e5e1641575bbe2db9bde995d3d1';
    let tokenCurrencyCounter_key = '0x99971b5749ac43e0235e41b0d378691892502cb772ce57b977bf2f9db135844f';
    let tokenInfo_key = '0x99971b5749ac43e0235e41b0d37869185a473167c5bb1442ffb67a340bc44201';
    let tokenInfoRLookup_key = '0x99971b5749ac43e0235e41b0d378691867ad4a2ceda1bc008a8dfadaa55b2b9e';
    
    let totalIssuance = [];
    let locks = [];
    let accounts = [];
    let tokenData = [];
    let tokenIssuer = [];
    let tokenCurrencyCounter = {};
    let tokenInfo = [];
    let tokenInfoRLookup = [];

    for (const [key, hex] of Object.entries(forkJson)) {
        if(key.startsWith(totalIssuance_key)) {
            totalIssuance.push({key, value: utils.decodeHex(hex, "TokenBalance")});
        }
        if(key.startsWith(locks_key)) {
            locks.push({key, value: utils.decodeHex(hex, "Vec<BalanceLock>")});
        }
        if(key.startsWith(accounts_key)) {
            accounts.push({key, value: utils.decodeHex(hex, "TokenAccountInfo<Index ,TokenAccountData>")});
        }
        if(key.startsWith(tokenData_key)) {
            tokenData.push({key, value: utils.decodeHex(hex, "Option<TokenDetails>")});
        }
        if(key.startsWith(tokenIssuer_key)) {
            tokenIssuer.push({key, value: utils.decodeHex(hex, "Did")});
        }
        if(key.startsWith(tokenCurrencyCounter_key)) {
            tokenCurrencyCounter = {key, value: hexToBn(hex, { isLe: true }).toString()};
        }
        if(key.startsWith(tokenInfo_key)) {
            tokenInfo.push({key, value: hexToBn(hex, { isLe: true }).toString()});
        }
        if(key.startsWith(tokenInfoRLookup_key)) {
            tokenInfoRLookup.push({key, value: utils.decodeHex(hex, "CurrencyCode")});
        }
    }


    return {
        totalIssuance,
        locks,
        accounts,
        tokenData,
        tokenIssuer,
        tokenCurrencyCounter,
        tokenInfo,
        tokenInfoRLookup,
    }
}

module.exports = {
    getTokens,
}