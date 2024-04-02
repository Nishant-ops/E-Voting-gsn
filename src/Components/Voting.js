import React, { useState, useEffect } from "react";
import { RelayProvider } from "@opengsn/provider";
import { ethers } from "ethers";
import { Box, Button, Typography } from "@mui/material";
import { address, contractAbi, paymasterAddress } from "./ABI";
import Header from "./Header";

function Voting() {
  const [provider, setProvider] = useState({});
  const [Contract, SetContract] = useState({});
  const [candidate, setCandidate] = useState([""]);

  useEffect(() => {
    checkForConnection();
  }, []);
  useEffect(() => {
    connectProviderToContract();
  }, [provider]);
  useEffect(() => {
    getCandidate();
  }, [Contract]);
  const getCandidate = async () => {
    if (Object.keys(Contract).length == 0) return;
    const data = await Contract.getAllCandidate(0);
    console.log(data);
    let can = [];
    for (let i = 0; i < data.length; i++) {
      can.push(data[i][0]);
    }
    console.log(can);
    setCandidate(can);
  };
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
  const voteForCandidate = async (id) => {
    const res = await Contract.Vote(0, id);
  };
  const getFinalResult = async () => {
    const data = await Contract.getResult(0);
    const a = ethers.utils.formatEther(data[0][2]) * 1000000000000000000;
    console.log(a);
  };
  return (
    <>
      <Header connectToWeb3={connectToWeb3} />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {candidate.map((c, i) => (
          <>
            <Box style={{ display: "flex", gap: "20px" }}>
              <Typography>{`Candidate ${i + 1}`}</Typography>
              <Button
                style={{ marginLeft: "10px" }}
                variant={"contained"}
                value={i}
                onClick={(e) => {
                  voteForCandidate(e.target.value);
                }}
              >
                {c}
              </Button>
            </Box>{" "}
          </>
        ))}

        <Button variant="contained" onClick={getFinalResult}>
          Get Result
        </Button>
      </Box>
    </>
  );
}

export default Voting;
