import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x8eA23eEb3a36Ac0233819a6bd4Bb19483Ca1fe70'
)

export default instance