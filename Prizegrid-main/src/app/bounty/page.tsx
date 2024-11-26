"use client";

import Bounty from "@/components/_bounty/Bounty";
import Footer from "@/components/_navbar/Footer";
import Navbar from "@/components/_navbar/Navbar";
import Navbar2 from "@/components/_navbar/NavbarSponser";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import { useBounties, useBountiesCount, useUserType } from "@/hooks/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
// import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { account } = useWallet();
  const router = useRouter();
  // const toast = useToast();

  const { data: userData } = useUserType(account?.address || "");  
  const { data: bountiesData, isLoading: bountiesLoading } = useBounties(account?.address || undefined, userData?.userType || undefined);
  const { data: bountiesCountData, isLoading: bountiesCountLoading } = useBountiesCount(
    account?.address || undefined,
    userData?.userType || undefined
  );
  
  // useEffect(() => {
  //   if (!account) {
  //     router.push("/");
  //   }
  // }, [account, router]);

  useEffect(() => {
    if (userData?.userType === "") {
      toast({
        title: 'Kindly create profile',
        duration: 3000,
      });
      router.push("/");
    }
  }, [userData, router]);

  if (bountiesLoading) {
    return <Loading />;
  }

  return (
    <>
      {userData?.userType === "sponser" ? <Navbar2 /> : <Navbar />}
      {/* <Navbar /> */}
      <div className="w-full mt-24 min-h-screen flex justify-center items-start">
        <div className="w-[1290px] h-full flex justify-between items-start flex-row">
          <div className="w-[65%] h-full border border-transparent border-r-gray-300 pr-4">
            <div className="flex gap-4">
              <button className="border-2 border-gray-400 rounded-3xl py-1 px-4 text-sm">
                Content
              </button>
              <button className="border-2 border-gray-400 rounded-3xl py-1 px-4 text-sm">
                Event
              </button>
              <button className="border-2 border-gray-400 rounded-3xl py-1 px-4 text-sm">
                Tech
              </button>
            </div>
            <div className="w-full rounded-lg p-6 text-white text-xl bg-slate-800 mt-4 mb-2">
              Welcome{" "}
              {userData?.userType === "hunter"
                ? userData?.user?.name
                : userData?.userType === "sponser" ? userData?.user?.companyName : ""}
            </div>
            {!bountiesLoading ? (
              <Bounty 
              bounties={bountiesData}
              userType={userData?.userType || "hunter"} 
              />
            ) : (
              <div className="h-full w-full flex justify-center items-center">
                <div className="loading"></div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-start flex-col w-[34%]">
            {userData?.userType === "sponser" ? (
              <div className="flex justify-between items-center flex-row w-full bg-[#ecf4ff] p-6 rounded-lg">
                {/* <div className="flex justify-center items-start flex-col w-1/2">
                  <span className="font-bold text-lg">$ 55,000</span>
                  <span className="text-center text-[12px] mt-2">
                    Total value rewarded
                  </span>
                </div>
                <div className="w-[1px] h-[40px] bg-gray-400"></div> */}
                <div className="flex justify-center items-start ml-4 flex-col w-1/2">
                  <span className="text-lg font-bold">{String(JSON.stringify(bountiesCountData))}</span>
                  <span className="text-center text-xs mt-2">
                    Opportunity Listed
                  </span>
                </div>
              </div>
            ) : userData?.userType === "hunter" ? (
              <div className="flex justify-between items-center flex-row w-full bg-[#ecf4ff] p-6 rounded-lg">
                {/* <div className="flex justify-center items-start flex-col w-1/2">
                  <span className="font-bold text-lg">$ 55,000</span>
                  <span className="text-center text-[12px] mt-2">
                    Total value earned
                  </span>
                </div>
                <div className="w-[1px] h-[40px] bg-gray-400"></div> */}
                <div className="flex justify-center items-start ml-4 flex-col w-1/2">
                  <span className="text-lg font-bold">{bountiesData.length || ""}</span>
                  <span className="text-center text-xs mt-2">
                    Opportunity Listed
                  </span>
                </div>
              </div>
            ) : <></>} 
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
