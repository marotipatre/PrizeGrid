"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/_navbar/Footer";
import Navbar from "@/components/_navbar/Navbar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

export default function BecomeSponser() {
  const { account } = useWallet();
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>({
    companyName: "",
    companyUsername: "",
    companyUrl: "",
    twitterUrl: "",
    industry: "",
    bio: "",
    walletAddress: "",
  });
  // const toast = useToast()
  console.log("account ", account);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (account === null) {
      toast({
        title: "Wallet connection required.",
        description: "You need to connect aptos wallet",
      });
      return;
    }

    try {
      formData.walletAddress = account?.address;
      const response = await fetch(`${BASE_URL}/api/create_sponser_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast({
          title: "You have become sponser now",
        });
        router.push("/bounty");
      } else {
        alert("Failed to create sponsor profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-[85vh] mt-24 flex justify-center items-center">
        <div className="w-[600px] flex justify-center items-center flex-col rounded-xl">
          <span className="text-slate-800 text-xl font-bold text-center p-2">
            Welcome to Move club
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-start flex-col shadow-md mt-4 w-full p-6"
          >
            <div className="flex justify-between items-center flex-row w-full">
              <div className="flex flex-col w-full mr-2">
                <label className="text-base text-slate-700 mb-2 ml-1">
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Company name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
              <div className="flex flex-col w-full mr-2">
                <label className="text-base text-slate-700 mb-2 ml-1">
                  Company username <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Company username"
                  name="companyUserName"
                  value={formData.companyUserName}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between items-center flex-row mt-4 w-full">
              <div className="flex flex-col w-full mr-2">
                <label className="text-base text-slate-700 mb-2 ml-1">
                  Company url <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Company url"
                  name="companyUrl"
                  value={formData.companyUrl}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
              <div className="flex flex-col w-full mr-2">
                <label className="text-base text-slate-700 mb-2 ml-1">
                  Twitter url <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Twitter url"
                  name="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
            </div>
            <p style={{ fontSize: "15px" }} className="mt-4 mb-2">
              Industry
            </p>
            <select
              className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            >
              <option value="DAOs">DAOs</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="DePIN">DePIN</option>
              <option value="DeFi">DeFi</option>
              <option value="Consumer dApps">Consumer dApps</option>
              <option value="Wallets and Payments">Wallets and Payments</option>
              <option value="NFTs">NFTs</option>
              <option value="Gaming">Gaming</option>
            </select>
            <div className="flex flex-col w-full mr-2 mt-4">
              <label className="text-base text-slate-700 mb-2 ml-1">
                Short bio <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Company short bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
            <button
              type="submit"
              className="text-lg p-3 text-white bg-slate-900 hover:bg-slate-700 transition-colors rounded-lg w-full mt-6"
            >
              Become Sponsor
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
