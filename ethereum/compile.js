const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

//getting build path
const buildPath = path.resolve(__dirname, "build");

//deleting build folder
fs.removeSync(buildPath);

//getting contract path
const contractPath = path.resolve(__dirname, "contract", "Voting.sol");

//read contract
const source = fs.readFileSync(contractPath, "utf8");

// compile contract and get contract

let input = {
  language: "Solidity",
  sources: {
    "Voting.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

//create build folder
fs.ensureDirSync(buildPath);

if(output.error) {
    console.log(err.formattedMessage);
} else {
    const contract = output.contracts["Voting.sol"];
    fs.writeFileSync(
        path.resolve(buildPath, `Voting.json`),
        JSON.stringify(contract["Voting"], null, 2),
        "utf8"
      );
}