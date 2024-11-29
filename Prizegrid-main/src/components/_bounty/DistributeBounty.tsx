import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import algosdk from 'algosdk'
import { useWallet } from '../WalletProvider'
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";



export default function DistributeBounty({ bountyId, winnerList }: any) {
  const { peraWallet, accountAddress, connect, isConnected, network, provider } = useWallet();
  const [status, setStatus] = useState('')
  const [amt1, setAmt1] = useState<any>("");
  const [amt2, setAmt2] = useState<any>("");
  const [amt3, setAmt3] = useState<any>("");
  const [rewardStatus, setRewardStatus] = useState<any>(false);
  const { toast } = useToast();
  const router = useRouter();
  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);

  

  const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";
  

  const distributeBounty = async () => {
    try {
      // Ensure wallet is connected
      if (!isConnected) {
        await connect();
      }
  
      // Validate connection
      if (!accountAddress) {
        throw new Error("Wallet not connected");
      }
  
      // Hardcoded test recipient (replace with actual test address)
      const TEST_RECIPIENT_ADDRESS = 'RK6K3SMBBNVUH3CZIQNHB4EEDOQSLZHYBLJPSDSBYIQN75RU5VUVWQXGVA';
      
      // Fixed test amount (1 ALGO)
      const amount = 1_000_000; // 1 ALGO in microalgos
  
      const algodClient = new algosdk.Algodv2(
        '',
        'https://testnet-api.algonode.cloud',
        443
      );
  
      const suggestedParams = await algodClient.getTransactionParams().do();
      const ptxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        sender: accountAddress,
        suggestedParams,
        receiver: TEST_RECIPIENT_ADDRESS,
        amount: 10000,
        note: new Uint8Array(Buffer.from('hello world')),
        });
      // Prepare signer payload
      const signerPayload = {
        txn: Buffer.from(algosdk.encodeUnsignedTransaction(ptxn)).toString('base64')
      };
  
      // Sign the transaction using Pera Wallet
      if (!peraWallet) {
        throw new Error("Pera Wallet is not available");
      }
      const signedTxns = await peraWallet.signTransaction([{ ptxn: signerPayload.txn, signers: [accountAddress] }]);
  
      // Decode the signed transaction
      const decodedSignedTxn = signedTxns.map(
        (signedTxn) => Buffer.from(signedTxn, 'base64')
      );
  
      // Send the signed transaction
      const txResponse = await algodClient.sendRawTransaction(decodedSignedTxn).do();
      const txId = txResponse.txId;
  
      // Wait for transaction confirmation
      const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  
      // Update UI and show success toast
      setStatus(`Transaction successful with ID: ${txId}`);
      setRewardStatus(true);
  
      toast({
        title: "Test Bounty Distributed",
        description: `Successfully sent ${amount / 1_000_000} ALGO to test address`
      });
  
    } catch (error) {
      // Error handling
      console.error('Bounty distribution error:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'An unknown error occurred during bounty distribution';
  
      setStatus(errorMessage);
      
      toast({
        title: "Distribution Failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const fetchRewardStatus = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/checkRewardDistributed/${bountyId}`
      );
      if (response.ok) {
        const data: any = await response.json();
        console.log("projects", data);

        setRewardStatus(data);
      } else {
        alert("Failed to create sponsor profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  useEffect(() => {
    fetchRewardStatus();
  }, []);

  return (
    <>
      {rewardStatus ? (
        <div className="flex justify-center items-centermb-6 p-4 bg-slate-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Reward Distributed!</h2>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-[90%] p-4 rounded-lg m-auto shadow-md">
          <div className="flex justify-center gap-4 items-start flex-row w-full m-4">
            <Image
              src={
                "https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724739104/Untitled_design_6_pl8foc.png"
              }
              alt=""
              width={30}
              height={30}
            />
            <div className="flex flex-col w-full mr-2 mt-4">
              <label className="text-base text-slate-700 mb-2 ml-1">
                {winnerList[0]?.submissionTitle}
              </label>
              <span className="text-sm text-slate-400">
                {winnerList[0]?.walletAddress}
              </span>
              <input
                placeholder="ALGO Amount"
                onChange={(e: any) => setAmt1(e.target.value)}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 items-start flex-row w-full m-4">
            <Image
              src={
                "https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724739104/Untitled_design_7_ycdoan.png"
              }
              alt=""
              width={30}
              height={30}
            />
            <div className="flex flex-col w-full mr-2 mt-4">
              <label className="text-base text-slate-700 mb-2 ml-1">
                {winnerList[1]?.submissionTitle}
              </label>
              <span className="text-sm text-slate-400">
                {winnerList[1]?.walletAddress}
              </span>
              <input
                placeholder="ALGO Amount"
                onChange={(e: any) => setAmt2(e.target.value)}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 items-start flex-row w-full m-4">
            <Image
              src={
                "https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724739104/Untitled_design_8_xgqct9.png"
              }
              alt=""
              width={30}
              height={30}
            />
            <div className="flex flex-col w-full mr-2 mt-4">
              <label className="text-base text-slate-700 mb-2 ml-1">
                {winnerList[2]?.submissionTitle}
              </label>
              <span className="text-sm text-slate-400">
                {winnerList[2]?.walletAddress}
              </span>
              <input
                placeholder="ALGO Amount"
                onChange={(e: any) => setAmt3(e.target.value)}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
          </div>

          <button
            className="relative rounded-3xl cursor-pointer py-4 w-[100%]"
            onClick={distributeBounty}
          >
            <div className="flex items-center justify-center bg-slate-800  rounded-lg p-2">
              <h3 className="flex cursor-pointer gap-2 items-center text-whitr text-center text-sm font-medium">
                <p className="text-base text-white">Distribute 🚀</p>
              </h3>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
