const { Web3 } = require("web3");

var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545/"));
let contract;
const contractAddress = "0x92C33E087740cD2c21BF79De00ADf08Cbdd85031";
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_data",
        type: "string",
      },
    ],
    name: "saveDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieveDocument",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const initializeAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  contract = new web3.eth.Contract(contractABI, contractAddress, {
    from: accounts[0],
  });
};

const documentContent = "My name is Kuldeep Gajera, B00962793";

const saveDocumentToBlockchain = async () => {
  await contract.methods
    .saveDocument(documentContent)
    .send({ from: web3.eth.defaultAccount });
};

const fetchDocumentFromBlockchain = async () => {
  const result = await contract.methods.retrieveDocument().call();
  console.log("Result:", result);
};

initializeAccount()
  .then(() => {
    saveDocumentToBlockchain()
      .then(async () => {
        console.log("Document saved successfully");
        await fetchDocumentFromBlockchain();
      })
      .catch((error) => {
        console.error("Error saving the document:", error);
      });
  })
  .catch((error) => {
    console.error("Initialization failed:", error);
  });
