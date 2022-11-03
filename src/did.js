const {utils} = require("mui-metablockchain-sdk");

function getDids(forkJson) {
    let accounts_key = '0x8c00ca9d36dbd8b4d8e6b787982148bcb99d880ec681799c0cf30e8886371da9';
    let dids_key = '0x8c00ca9d36dbd8b4d8e6b787982148bce395ab58338d83d25270a3a12ce872f8';
    let lookup_key = '0x8c00ca9d36dbd8b4d8e6b787982148bc891ad457bf4da54990fa84a2acb148a2';
    let rlookup_key = '0x8c00ca9d36dbd8b4d8e6b787982148bcf65cb14646e631fff440382018b1bfe4';
    let prevkeys_key = '0x8c00ca9d36dbd8b4d8e6b787982148bc90cd84a4f521e9018818dffdac4a5860';
    
    let accounts = [];
    let dids = [];
    let lookups = [];
    let rlookups = [];
    let prevkeys = [];

    for (const [key, hex] of Object.entries(forkJson)) {
        if(key.startsWith(accounts_key)) {
            accounts.push({key, value: utils.decodeHex(hex, "AccountInfoWithRefCount")});
        }
        if(key.startsWith(dids_key)) {
            dids.push({key, value: utils.decodeHex(hex, "Option<(DidStruct, BlockNumber)>")});
        }
        if(key.startsWith(lookup_key)) {
            lookups.push({key, value: utils.decodeHex(hex, "Option<AccountId>")});
        }
        if(key.startsWith(rlookup_key)) {
            rlookups.push({key, value: utils.decodeHex(hex, "Did")});
        }
        if(key.startsWith(prevkeys_key)) {
            // THIS IS NOT NEEDED AS PREVIOUS KEYS IS BASED ON BLOCK NUMBER
            prevkeys.push({key, value: utils.decodeHex(hex, "Option<Vec<(AccountId, BlockNumber)>>")});
        }
    }


    return {
        accounts,
        dids,
        lookups,
        rlookups,
        prevkeys,
    }
}

module.exports = {
    getDids,
}