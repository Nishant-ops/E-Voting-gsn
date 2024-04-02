import { TextField, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { RelayProvider } from "@opengsn/provider";
import { ethers } from "ethers";
import { address, contractAbi, paymasterAddress } from "./ABI";
import Header from "./Header";
import { useParams } from "react-router-dom";

function CreateNewVoting() {
  const { id } = useParams();
  const [provider, setProvider] = useState({});
  const [Contract, SetContract] = useState({});

  useEffect(() => {
    checkForConnection();
  }, []);
  useEffect(() => {
    connectProviderToContract();
  }, [provider]);
  const connectProviderToContract = () => {
    // console.log(address);
    if (Object.keys(provider).length == 0) return;
    console.log(provider);
    let theContract = new ethers.Contract(
      address,
      contractAbi.abi,
      provider.getSigner()
    );
    SetContract(theContract);
  };
  const checkForConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        console.log("connected");
        connectToRelayer();
      } else {
        console.log("notConnected");
      }
    }
  };
  const connectToWeb3 = async () => {
    if (!checkForEtherium()) return;
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);

    connectToRelayer();
  };
  const checkForEtherium = () => {
    if (typeof window.ethereum !== "undefined") {
      return true;
    } else {
      console.log("Please install MetaMask");
      return false;
    }
  };
  const connectToRelayer = async () => {
    let gsnProvider = await RelayProvider.newProvider({
      provider: window.ethereum,
      config: {
        paymasterAddress: paymasterAddress,
      },
    }).init();
    const provider = new ethers.providers.Web3Provider(gsnProvider);
    setProvider(provider);
  };
  const [inputs, setInputs] = useState([""]); // Initial state with one input
  const [hourTime, setHourTime] = useState();
  const [title, setTitle] = useState();

  // Function to handle input change
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  // Function to add a new input box
  const addInput = () => {
    setInputs([...inputs, ""]);
  };
  const handleHourChange = (value) => {
    setHourTime(value);
  };
  const handleTitleChange = (value) => {
    setTitle(value);
  };
  const removeInput = () => {
    if (inputs.length == 1) return;
    setInputs(inputs.slice(0, inputs.length - 1));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    const wallets = [accounts[0], accounts[0]];
    await Contract.createVotingCampaign(
      title,
      accounts[0],
      inputs,
      wallets,
      hourTime
    );
  };

  return (
    <>
      <Header connectToWeb3={connectToWeb3} />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
          marginTop: "90px",
        }}
      >
        <TextField
          type="text"
          variant="outlined"
          label="Title"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        ></TextField>
        {inputs.map((value, index) => (
          <Box key={index}>
            <TextField
              type="text"
              value={value}
              variant="outlined"
              label={`candidate name ${index + 1}`}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </Box>
        ))}
        <Button onClick={addInput} variant="contained">
          Add Candidate
        </Button>
        <Button onClick={removeInput} variant="contained">
          Remove Candidate
        </Button>
        <TextField
          type="number"
          variant="outlined"
          label="Ending hour"
          value={hourTime}
          onChange={(e) => handleHourChange(e.target.value)}
        ></TextField>

        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
}

export default CreateNewVoting;
