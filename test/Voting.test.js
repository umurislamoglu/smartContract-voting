const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const compiledContract = require("../ethereum/build/Voting.json");

const web3 = new Web3(ganache.provider());

let accounts;
let contract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  contract = await new web3.eth.Contract(compiledContract.abi)
    .deploy({
      data: compiledContract.evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "10000000",
    });
  await contract.methods
    .becomeCandidate(
      "I'll bring peace to the word",
      "https://images.pexels.com/photos/25758/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    )
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Voting", () => {
  it("deploys a contract", () => {
    assert.ok(contract.options.address);
  });

  it("lets people to become candidate", async () => {
    await contract.methods
      .becomeCandidate(
        "I'll stop global warming",
        "https://images.pexels.com/photos/25758/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      )
      .send({
        from: accounts[0],
        gas: "1000000",
      });
    let candidate = await contract.methods.candidates(1).call();
    assert((candidate.candidatePromise = "I'll stop global warming"));
  });

  it("allow poeople to vote", async () => {
    await contract.methods.vote(0).send({
      from: accounts[1],
      gas: "1000000",
    });
    let votingCount = await contract.methods.votingCount().call();
    let candidate = await contract.methods.candidates(0).call();

    let allClear = (votingCount === 1) === (candidate.votingCount === 1);
    assert(allClear, true);
  });

  it("doesn't let people vote twice" ,  async () => {
    await contract.methods.vote(0).send({
      from: accounts[1],
      gas: "1000000",
    });
    try {
      await contract.methods.vote(0).send({
        from: accounts[1],
        gas: "1000000",
      });
      assert(false);
    } catch (error) {
      assert(error)
    }
  })
});
