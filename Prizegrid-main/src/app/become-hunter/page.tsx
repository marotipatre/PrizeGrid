"use client";

// import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Footer from "@/components/_navbar/Footer";
import Navbar from "@/components/_navbar/Navbar";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
// import { useToast } from '@chakra-ui/react'
import { useState } from "react";
import "./sty;e.css";
import { useToast } from "@/components/ui/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

export default function BecomeHunter() {
  const { account } = useWallet();
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>({
    name: "",
    uniqueName: "",
    portfolio: "",
    github: "",
    linkedin: "",
    twitter: "",
    bio: "",
    workAt: "",
    location: "",
    walletAddress: "",
  });
  // const toast = useToast()
  const [loading, setLoading] = useState<Boolean>(false);
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
      setLoading(true);
      formData.walletAddress = account?.address;
      const response = await fetch(`${BASE_URL}/api/create_hunter_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast({
          title: "You have become hunter now",
        });
        setLoading(false);
        router.push("/bounty");
      } else {
        toast({
          title: "Error while creating your profile",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen mt-24 flex justify-center items-center ">
        <div className="w-[600px] flex justify-center items-center flex-col rounded-xl">
          <span className="text-slate-800 text-xl font-bold text-center p-2">
            Welcome to Move club
          </span>
          <form
            className="flex justify-center items-start flex-col shadow-md mt-4 w-full p-6"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center flex-row w-full">
              <div className="flex flex-col w-full mr-2">
                <label className="text-base text-slate-700 mb-2 ml-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
              <div className="flex flex-col w-full ml-2">
                <label className="text-sm text-slate-700 mb-2 ml-1">
                  Unique name <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="Unique name"
                  name="uniqueName"
                  value={formData.uniqueName}
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
                  Portfoliio Link <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="https://protfolio.com"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
              <div className="flex flex-col w-full ml-2">
                <label className="text-sm text-slate-700 mb-2 ml-1">
                  Twitter <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="https://x.com/xyz"
                  name="twitter"
                  value={formData.twitter}
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
                  Github <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="https://github.com/xyz"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
              <div className="flex flex-col w-full ml-2">
                <label className="text-sm text-slate-700 mb-2 ml-1">
                  LinkedIn <span className="text-red-500">*</span>
                </label>
                <input
                  placeholder="https://linkedin.com/xyz"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  type="text"
                  className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col w-full mr-2 mt-4">
              <label className="text-base text-slate-700 mb-2 ml-1">
                Work at <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Work at"
                name="workAt"
                value={formData.workAt}
                onChange={handleChange}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
            <div className="flex flex-col w-full mr-2 mt-4">
              <label className="text-base text-slate-700 mb-2 ml-1">
                Your location <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Your location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
            <div className="flex flex-col w-full mr-2 mt-4">
              <label className="text-base text-slate-700 mb-2 ml-1">
                Short bio <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Your short bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                type="text"
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
            {loading ? (
              <button
                type="submit"
                className="text-lg p-3 text-white bg-slate-800 rounded-lg w-full mt-6"
              ></button>
            ) : (
              <button
                type="submit"
                className="text-lg p-3 text-white bg-slate-900 hover:bg-slate-700 transition-colors rounded-lg w-full mt-6"
              >
                Become Hunter
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
