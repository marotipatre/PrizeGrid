'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import algosdk from 'algosdk'
import { NetworkId, WalletId, useWallet, type Wallet } from '@txnlab/use-wallet-react'
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";



export default function DistributeBounty({ bountyId, winnerList }: any) {
  const {
    algodClient,
    activeAddress,
    activeNetwork,
    activeAccount,
    setActiveNetwork,
    transactionSigner,
    wallets
  } = useWallet()
  const [status, setStatus] = useState('')
  const [rewardStatus, setRewardStatus] = useState<any>(false);
  const { toast } = useToast();
  const router = useRouter();
  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);
  const [isSending, setIsSending] = useState(false);
  

  const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";
  
  const sendTransaction = async () => {
    try {
      if (!activeAddress) {
        throw new Error("[App] No active account");
      }

      const atc = new algosdk.AtomicTransactionComposer();
      const suggestedParams = await algodClient.getTransactionParams().do();

      winnerList.forEach((winner: { walletAddress: string; submissionTitle: string }, index: number) => {
        const transaction = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: activeAddress,
          to: winner.walletAddress,
          amount: amounts[index] * (1_000_000),
          suggestedParams,
        });
        atc.addTransaction({ txn: transaction, signer: transactionSigner });
        console.info(`[App] Sending transaction...`, transaction);
      });

      setIsSending(true);

      try {
        const result = await atc.execute(algodClient, 4);
        console.info(`[App] ✅ Successfully sent transaction!`, {
          confirmedRound: result.confirmedRound,
        });
  
        toast({
          title: "Transaction Status",
          description: "Transaction successful!",
          variant: "default",
        });
        setRewardStatus(true);
      } catch (error) {
        console.error('Transaction failed', error);
        toast({
          title: "Transaction Status",
          description: "Transaction failed!",
          variant: "destructive",
        });
        } finally {
          setIsSending(false);
        }
      }
      catch (error) {
        console.error('Transaction failed', error);
        toast({
          title: "Transaction Status",
          description: "Transaction failed!",
          variant: "destructive",
        });
      } finally {
        setIsSending(false);
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

  const [amounts, setAmounts] = useState(Array(winnerList.length).fill(0));

  const handleAmountChange = (index: number, value: number) => {
    const newAmounts = [...amounts];
    newAmounts[index] = value;
    setAmounts(newAmounts);
  };

  useEffect(() => {
    fetchRewardStatus();
  }, []);

  return (
    <>
      {rewardStatus ? (
        <div className="flex justify-center items-centermb-6 p-4 bg-slate-100 rounded-lg">
          <h2 className="flex justify-center text-xl font-bold mb-2">Reward Distributed!</h2>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col w-[100%] p-4 rounded-lg m-auto shadow-md">
                    {/* <div className="flex justify-center gap-4 items-start flex-row w-full m-4"> */}
            
          {winnerList.map((winner: any, index : any) => (
            <div key={index} className="flex justify-center gap-4 items-start flex-row w-full m-4">
              <Image
              src={
                "https://res.cloudinary.com/dmebegin1/image/upload/v1732913615/gold-trophy-transparent-1_stctdl.png"
              }
              alt=""
              width={30}
              height={30}
            />
              <div className="flex flex-col w-full mr-2 mt-4">
                <label className="text-base text-slate-700 mb-2 ml-1">
                  {winner.submissionTitle}
                </label>
                <span className="text-sm text-slate-400">
                  {winner.walletAddress}
                </span>
                <input
                  placeholder="ALGO Amount"
                  onChange={(e) => handleAmountChange(index, Number(e.target.value))}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
            </div>
          ))}
          <button
            className="relative rounded-3xl cursor-pointer py-4 w-[100%]"
            onClick={sendTransaction}
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
