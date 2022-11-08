const {utils, vc} = require("mui-metablockchain-sdk");

function getVCs(forkJson) {
    let vcs_key = '0xadf7562815365fcd9a52b5bb27961ddd225a174d55e19c40ae90fdfb2e26e068';
    let lookup_key = '0xadf7562815365fcd9a52b5bb27961ddd891ad457bf4da54990fa84a2acb148a2';
    let rlookup_key = '0xadf7562815365fcd9a52b5bb27961dddf65cb14646e631fff440382018b1bfe4';
    let vchistory_key = '0xadf7562815365fcd9a52b5bb27961ddd75115eefb6987d5a914c7f8f5f7f81f2';
    let vcapprover_key = '0xadf7562815365fcd9a52b5bb27961ddd56035760bb8688445c0a50de5e58820f';
    
    let vcs = [];
    let lookups = [];
    let rlookups = [];
    let vcHistory = [];
    let vcApproverList = [];

    for (const [key, hex] of Object.entries(forkJson)) {
        if(key.startsWith(vcs_key)) {
            let value = utils.decodeHex(hex, "Option<(VC, VCStatus)>");
            switch (value[0].vc_type) {
                case 'TokenVC':
                case 'GenericVC':
                case 'TokenTransferVC':
                    value[0].vc_property = utils.decodeHex(value[0].vc_property, value[0].vc_type);
                    break;
                case 'SlashTokens':
                case 'MintTokens':
                    value[0].vc_property = utils.decodeHex(value[0].vc_property, 'SlashMintTokens');
                    break;
                default:
                    continue;
            }
            vcs.push({key, value});
        }
        if(key.startsWith(lookup_key)) {
            lookups.push({key, value: utils.decodeHex(hex, "Vec<VCid>")});
        }
        if(key.startsWith(rlookup_key)) {
            rlookups.push({key, value: utils.decodeHex(hex, "Did")});
        }
        // NOT NEEDED BECAUSE IT INCLUDES BLOCKNUMBER
        if(key.startsWith(vchistory_key)) {
            vcHistory.push({key, value: utils.decodeHex(hex, "Option<(VCStatus, BlockNumber)>")});
        }
        if(key.startsWith(vcapprover_key)) {
            vcApproverList.push({key, value: utils.decodeHex(hex, "Vec<Did>")});
        }
    }


    return {
        vcs,
        lookups,
        rlookups,
        vcHistory,
        vcApproverList,
    }
}

module.exports = {
    getVCs,
}