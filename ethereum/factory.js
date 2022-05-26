import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json"

const instance = new web3.eth.Contract(
    JSON.parse(campaignFactory.interface),
    '0x840d6D375e1489945bC9cCb86Cce11a67d7A05a8'
)

export default instance