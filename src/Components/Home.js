import { Button, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { RelayProvider } from "@opengsn/provider";
import { ethers } from "ethers";
import { address, contractAbi, paymasterAddress } from "./ABI";
import Header from "./Header";
import { Link } from "react-router-dom";

function Home() {
  const [provider, setProvider] = useState({});
  const [Contract, SetContract] = useState({});
  const [votingCampaign, setVotingCampaign] = useState([""]);

  useEffect(() => {
    checkForConnection();
  }, []);
  useEffect(() => {
    connectProviderToContract();
  }, [provider]);
  useEffect(() => {
    getData();
  }, [Contract]);
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
  const getData = async () => {
    if (Object.keys(Contract).length == 0) return;
    const data = await Contract.getAllVotingCampaign();
    setVotingCampaign(data[0]);
    console.log(data[0]);
  };
  return (
    <>
      <Header connectToWeb3={connectToWeb3} />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          width: "100vw",
          height: "100vh",
        }}
      >
        {" "}
        <Typography>All Votings</Typography>
        {votingCampaign.map((c, i) => (
          <Link to={`/${i}`}>
            <Button variant="contained">{c}</Button>
          </Link>
        ))}
      </Box>
    </>
  );
}

export default Home;
