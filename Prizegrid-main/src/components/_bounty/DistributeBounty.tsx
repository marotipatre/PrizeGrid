import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { Network, Provider } from "aptos";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { useToast } from "../ui/use-toast";

export const provider = new Provider(Network.TESTNET);

export default function DistributeBounty({ bountyId, winnerList }: any) {
  const { account, signAndSubmitTransaction } = useWallet();
  const [amt1, setAmt1] = useState<any>("");
  const [amt2, setAmt2] = useState<any>("");
  const [amt3, setAmt3] = useState<any>("");
  const [rewardStatus, setRewardStatus] = useState<any>(false);
  const { toast } = useToast();
  const router = useRouter();
  const [transactionInProgress, setTransactionInProgress] =
    useState<boolean>(false);

  const APTOS_COIN = "0x1::aptos_coin::AptosCoin";

  const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

  const aptsend = async () => {
    if (!account) return router.push("/");
    setTransactionInProgress(true);

    try {
      const recipients = winnerList.map((winner: any) => winner.walletAddress);

      const amounts = [
        (parseFloat(amt1) * 100_000_000).toString(),
        (parseFloat(amt2) * 100_000_000).toString(),
        (parseFloat(amt3) * 100_000_000).toString(),
      ];
      console.log(amounts);

      // build a transaction payload to be submited
      const payload: InputTransactionData = {
        data: {
          function: "0x1::aptos_account::batch_transfer",
          typeArguments: [],
          functionArguments: [recipients, amounts],
        },
      };

      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      provider.waitForTransaction(response.hash).then(async () => {
        const response2 = await fetch(
          `${BASE_URL}/api/add_reward_distribution/${bountyId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response2.ok) {
          toast({
            title: "All transactions have been successfully sent! ✔️",
          });
        }
      })
      .catch((e) => {
        toast({
          title: "Payment failed ❌",
        });
        console.log(e);        
      })

      // await fetchAccountBalance();

      
    } catch (error: any) {
      console.log(error);
    } finally {
      setTransactionInProgress(false);
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
                placeholder="APT Amount"
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
                placeholder="APT Amount"
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
                placeholder="APT Amount"
                onChange={(e: any) => setAmt3(e.target.value)}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
          </div>

          <button
            className="relative rounded-3xl cursor-pointer py-4 w-[100%]"
            onClick={aptsend}
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
