"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkStringify, { Options } from "remark-stringify";
import remarkGfm from "remark-gfm"; // To handle GFM features like lists
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import rehypeRaw from "rehype-raw";

const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

const markdownConfig: Options = {
  bullet: "*",
  bulletOther: "-",
  bulletOrdered: ".",
  closeAtx: false,
  emphasis: "*",
  fence: "`",
};

export default function CreateGig() {
  const { account } = useWallet();
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>({
    about: "",
    title: "",
    category: "",
    type: "",
    budget: "",
    devInstructions: "",
    rewardDistribution: "",
    judgingCriteria: "",
    resources: "",
    startAt: "",
    endAt: "",
    walletAddress: "",
  });

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

    const currentDate = new Date();
    const startAtDate = new Date(formData.startAt);
    const endAtDate = new Date(formData.endAt);

    formData.startAt = startAtDate;
    formData.endAt = endAtDate;

    if (startAtDate < currentDate) {
      toast({
        title: "Invalid Start Date",
        description: "Start date cannot be in the past.",
      });
      return;
    }

    if (endAtDate <= startAtDate) {
      toast({
        title: "Invalid End Date",
        description: "End date must be after the start date.",
      });
      return;
    }

    try {
      formData.walletAddress = account?.address;
      const response = await fetch(`${BASE_URL}/api/create_bounty`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast({
          title: "You have created bounty",
        });
        setTimeout(() => router.push("/bounty"), 2000);
      } else {
        alert("Failed to create sponsor profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div className="w-full mt-24 flex justify-center items-center">
      <div className="w-[600px] flex justify-center items-center flex-col rounded-xl">
        <span className="text-slate-800 text-xl font-bold text-center p-2">
          Make Gig
        </span>
        <form
          className="flex justify-center items-start flex-col shadow-md mt-4 w-full p-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full mr-2 mt-4">
            <label className="text-base text-slate-700 mb-2 ml-1">
              Headline of bounty <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Headline of bounty"
              type="text"
              className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
              required
            />
          </div>
          <p style={{ fontSize: "15px" }} className="mt-4 mb-2">
            Choose Gig category <span className="text-red-500">*</span>{" "}
          </p>
          <select
            className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Bounty">Bounty</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Freelance">Freelance</option>
          </select>
          <p style={{ fontSize: "15px" }} className="mt-4 mb-2">
            Choose Gig type <span className="text-red-500">*</span>
          </p>
          <select
            className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
            required
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Contest">Contest</option>
            <option value="Event">Event</option>
            <option value="Tech">Tech</option>
          </select>
          <div className="flex flex-col w-full mr-2 mt-4">
            <label className="text-base text-slate-700 mb-2 ml-1">
              Budget <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              type="text"
              className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
              required
            />
          </div>
          <div className="flex flex-col w-full mr-2 mt-4">
            <label className="text-base text-slate-700 mb-2 ml-1">
              About Gig <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="About your bounty"
              name="about"
              value={formData.about}
              onChange={handleChange}
              type="text"
              className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
              required
            />
          </div>
          <div className="flex justify-between items-center flex-row w-full mt-4">
            <div className="flex flex-col w-full mr-2">
              <label className="text-base text-slate-700 mb-2 ml-1">
                Start At <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="startAt"
                value={formData.startAt}
                onChange={handleChange}
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
            <div className="flex flex-col w-full ml-2">
              <label className="text-base text-slate-700 mb-2 ml-1">
                End At <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                name="endAt"
                value={formData.endAt}
                onChange={handleChange}
                className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                required
              />
            </div>
          </div>

          {/* Fields and inputs */}
          <div className="flex flex-col w-full mr-2 mt-4">
            <label className="text-base text-slate-700 mb-2 ml-1">
              Judging criteria (markdown)
            </label>
            <textarea
              name="judgingCriteria"
              value={formData.judgingCriteria}
              onChange={handleChange}
              placeholder="Judging criteria here..."
              className="w-full text-sm outline-none border-[1px] border-slate-200 rounded-md p-2 h-[100px]"
            />
            <div className="preview mt-2 p-2 border rounded">
              <ReactMarkdown
                remarkPlugins={[
                  remarkParse,
                  [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                  remarkGfm,
                ]}
                rehypePlugins={[rehypeRaw]}
              >
                {formData.judgingCriteria}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex flex-col w-full mr-2 mt-4">
            <label className="text-base text-slate-700 mb-2 ml-1">
              Reward Distribution (markdown)
            </label>
            <textarea
              name="rewardDistribution"
              value={formData.rewardDistribution}
              onChange={handleChange}
              placeholder="Reward distribution here..."
              className="w-full text-sm outline-none border-[1px] border-slate-200 rounded-md p-2 h-[100px]"
            />
            <div className="preview mt-2 p-2 border rounded">
              <ReactMarkdown
                remarkPlugins={[
                  remarkParse,
                  [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                  remarkGfm,
                ]}
                rehypePlugins={[rehypeRaw]}
              >
                {formData.rewardDistribution}
              </ReactMarkdown>
            </div>
          </div>


          <div className="flex flex-col w-full mr-2 mt-4">
            <label className="text-base text-slate-700 mb-2 ml-1">
              Submission requirements (markdown)
            </label>
            <textarea
              name="submissionRequirement"
              value={formData.submissionRequirement}
              onChange={handleChange}
              placeholder="Submission requirements here..."
              className="w-full text-sm outline-none border-[1px] border-slate-200 rounded-md p-2 h-[100px]"
            />
            <div className="preview mt-2 p-2 border rounded">
              <ReactMarkdown
                remarkPlugins={[
                  remarkParse,
                  [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                  remarkGfm,
                ]}
                rehypePlugins={[rehypeRaw]}
              >
                {formData.submissionRequirement}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex flex-col w-full mr-2 mt-4">
            <label className="text-base text-slate-700 mb-2 ml-1">
              Resources (markdown)
            </label>
            <textarea
              name="resources"
              value={formData.resources}
              onChange={handleChange}
              placeholder="Resource here..."
              className="w-full text-sm outline-none border-[1px] border-slate-200 rounded-md p-2 h-[100px]"
            />
            <div className="preview mt-2 p-2 border rounded">
              <ReactMarkdown
                remarkPlugins={[
                  remarkParse,
                  [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                  remarkGfm,
                ]}
                rehypePlugins={[rehypeRaw]}
              >
                {formData.resources}
              </ReactMarkdown>
            </div>
          </div>

          <button
            type="submit"
            className="text-lg p-3 text-white bg-slate-800 rounded-lg w-full mt-6"
          >
            Create Gig
          </button>
        </form>
      </div>
    </div>
  );
}
