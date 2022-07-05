const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const path = require("path");
const compiledContract = require("./build/Voting.json");
require("dotenv").config({ path: path.resolve(__dirname, "../", ".env") });

const provider = new HDWalletProvider(
  process.env.ACC_MNEMONIC,
  process.env.NETWORK_URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const contract = await new web3.eth.Contract(compiledContract.abi)
    .deploy({
      data: compiledContract.evm.bytecode.object,
    })
    .send({
      from: accounts[0],
      gas: "10000000",
    });

  console.log("Contract deployed to ", contract.options.address);
  provider.engine.stop()
};

deploy();
