const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "ripple boil fee elevator vocal bread town bench town amused damp usage",
  "https://rinkeby.infura.io/v3/443ec6c3dca9484196d8eb95ddc99dbc"
);
const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log("attempting to deploy from account: ", accounts[0]);
        const results = await new web3.eth.Contract(
          JSON.parse(compiledFactory.interface)
        )
          .deploy({
            data: compiledFactory.bytecode,
          })
          .send({
            from: accounts[0],
            gas: "1000000",
          });
          provider.engine.stop();
        console.log("Contract deployed to: ", results.options.address);
    } catch(err) {
        console.log(err)
    }
};

deploy();
 