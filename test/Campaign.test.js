 const assert = require('assert')
 const ganache = require('ganache-cli')
 const Web3 = require('web3')

 const web3 = new Web3(ganache.provider())

 const compiledFactory = require('../ethereum/build/CampaignFactory.json')
 const compiledCampaign = require('../ethereum/build/Campaign.json')

 let accounts;
 let factory;
 let campaignAddress;
 let campaign;


 beforeEach(async() => {
    accounts = await web3.eth.getAccounts()
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({
            data: compiledFactory.bytecode,
        })
        .send({
            from: accounts[0],
            gas: "1000000"
        })
    
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: "1000000"
    });
    
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call()
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)
 })

 describe('campaign', () => {
     it('deploy a factory and a campaign', async() => {
         assert.ok(factory.options.address)
         assert.ok(campaign.options.address)
     })

     it("marks caller as the campaign manager", async () => {
         const manager = await campaign.methods.manager().call();
         assert.equal(accounts[0], manager);
     })

     it("allows people to contribute money and marks them as approves", async () => {
          await campaign.methods.contribute().send({
              value: "200",
              from: accounts[1]
          })
          const contributor = await campaign.methods.approvers(accounts[1]).call();
          assert(contributor);
     })
     it("requires minimum contribution", async () => {
        try { 
            await campaign.methods.contribute().send({
                value: "80",
                from: accounts[1]
            })
            assert(false);
        } catch(err) {
            assert(err);
        }
     })
     it ("allows manager to make a payment request", async () => {
          await campaign.methods
            .createRequest(
                "Buy batteries", "100", accounts[1]
            )
            .send({
                from: accounts[0],
                gas: "1000000"
            })
        const requests = await campaign.methods.requests(0).call()
        assert.equal("Buy batteries", requests.description)
     })

     it("processes request", async () => {
         await campaign.methods.contribute().send({
             from: accounts[0],
             gas: web3.utils.toWei("10", "ether")
         })

         await campaign.methods
            .createRequest('A', web3.utils.toWei("5", "ether"), accounts[1])
            .send({
                from: accounts[0],
                gas: "1000000"
            })
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        })

        await campaign.finalizeRequest(0).send({
            from: accounts[0],
            gas: "1000000"
        })
        
     })
 })