export const contractAbi = {
  abi: [
    {
      inputs: [
        {
          internalType: "address",
          name: "_forwarder",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
        {
          internalType: "uint8",
          name: "candidateId",
          type: "uint8",
        },
      ],
      name: "Vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "title",
          type: "string",
        },
        {
          internalType: "address",
          name: "_owner",
          type: "address",
        },
        {
          internalType: "string[]",
          name: "names",
          type: "string[]",
        },
        {
          internalType: "address[]",
          name: "wallet",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "endingTime",
          type: "uint256",
        },
      ],
      name: "createVotingCampaign",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getAllCandidate",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "address",
              name: "wallet",
              type: "address",
            },
          ],
          internalType: "struct Voting.Candidate[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllVotingCampaign",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getResult",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "address",
              name: "wallet",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "votes",
              type: "uint256",
            },
          ],
          internalType: "struct Voting.FinalResult[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_id",
          type: "uint256",
        },
      ],
      name: "getTime",
      outputs: [
        {
          internalType: "uint256",
          name: "time",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTrustedForwarder",
      outputs: [
        {
          internalType: "address",
          name: "forwarder",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "forwarder",
          type: "address",
        },
      ],
      name: "isTrustedForwarder",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
export const address = "0x09635F643e140090A9A8Dcd712eD6285858ceBef";
export const paymasterAddress = "0x086c11bd5A61ac480b326916656a33c474d1E4d8";
