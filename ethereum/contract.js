import web3 from "./web3";
import compiledContract from "./build/Voting.json";

const instance = new web3.eth.Contract(
  compiledContract.abi,
  "0x5e8627Cdf5B6dcDE5d0DF1e72d7844AA251B17FD"
);
export default instance;
