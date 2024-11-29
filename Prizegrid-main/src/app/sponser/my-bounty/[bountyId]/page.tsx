"use client";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ProjectCard from "@/components/_projects/project-card";
import { formatDateToDDMMYYYYHM } from "@/components/formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";
import ProjectList from "@/components/_projects/ProjectList";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

import { useRouter } from "next/navigation";
import { useWallet } from '@txnlab/use-wallet-react'
import DistributeBounty from "@/components/_bounty/DistributeBounty";
import WinnerList from "@/components/winner_list/WinnerList";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import remarkParse from "remark-parse";
import remarkStringify, { Options } from "remark-stringify";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const markdownConfig: Options = {
  bullet: "*",
  bulletOther: "-",
  bulletOrdered: ".",
  closeAtx: false,
  emphasis: "*",
  fence: "`",
};

export default function Bounty({ params }: any) {
  const { userType }: any = useUser();
  const [bounty, setBounty] = useState<any>([]);
  const router = useRouter();
  const [projects, setProjects] = useState<any>([]);
  const [winnerList, setWinnerList] = useState<any>([]);
  const { bountyId } = params;
  const { activeAddress } = useWallet();

  const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

  const fetchSubmissions = async () => {
    if (activeAddress === null) router.push("/");

    try {
      const response = await fetch(
        `${BASE_URL}/api/get_bounty_by_id/${bountyId}`
      );
      if (response.ok) {
        const data: any = await response.json();
        console.log("projects", data);

        setBounty(data);
      } else {
        alert("Failed to create sponsor profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/get_projectsOf_bounty_by_id/${bountyId}`
      );
      if (response.ok) {
        const data: any = await response.json();

        setProjects(data);
      } else {
        alert("Failed to create sponsor profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }

    try {
      const response = await fetch(`${BASE_URL}/api/get_winners/${bountyId}`);
      if (response.ok) {
        const data: any = await response.json();

        setWinnerList(data);
      } else {
        alert("Failed to fetch winners");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching winners");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [activeAddress]);

  
  // Helper function to calculate the time difference
function getTimeDifference(date1: any, date2: any) {
  const diff = date2 - date1;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `${days} days`;
  if (hours > 0) return `${hours} hours`;
  if (minutes > 0) return `${minutes} minutes`;
  return "a few moments";
}

  //FUNCTION TO DATE CONFIGURE
  const getBountyStatus = (startDate: Date, endDate: Date, currentDate: Date) => {
    if (currentDate < startDate) {
      return {
        status: `Starting in ${getTimeDifference(currentDate, startDate)}`,
        color: "text-blue-500",
        submissionStatus: "Submissions open soon",
        submissionColor: "text-blue-500",
      };
    } else if (currentDate >= startDate && currentDate <= endDate) {
      return {
        status: "Live",
        color: "text-green-500",
        submissionStatus: "Submissions open",
        submissionColor: "text-green-500",
      };
    } else {
      return {
        status: "Ended",
        color: "text-red-500",
        submissionStatus: "Submissions closed",
        submissionColor: "text-red-500",
      };
    }
  };

  const statusInfo = getBountyStatus(new Date(bounty.startAt), new Date(bounty.endAt), new Date());

  return (
    <>
      <div className="flex mt-24 min-h-screen justify-start items-center flex-col w-screen">
        <div className="w-[80%]">
          <div className="w-full flex justify-start items-start flex-row p-4 rounded-lg shadow-md m-1">
            <Image
              src={
                "https://res.cloudinary.com/dmebegin1/image/upload/v1732737075/qpmyhnoapwgppl0bjd3z.png"
              }
              className="rounded-full"
              width={50}
              height={50}
              alt=""
            />
            <div className="flex justify-center items-start flex-col ml-4">
              <h1 className="text-slate-800 font-bold text-lg">
                {bounty?.title}
              </h1>
              <div className="flex mt-1 ml-4 text-base text-gray-600 font-light">
                <div className="flex -ml-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4b5563"
                      d="M12 11q.825 0 1.413-.587T14 9t-.587-1.412T12 7t-1.412.588T10 9t.588 1.413T12 11m-3.615 9v-1H11.5v-3.754q-1.321-.236-2.312-1.105T7.823 11.99q-1.586-.187-2.705-1.301T4 8V7q0-.402.299-.701T5 6h2.654V4h8.692v2H19q.402 0 .701.299T20 7v1q0 1.573-1.118 2.688t-2.705 1.3q-.373 1.285-1.364 2.153T12.5 15.246V19h3.115v1zm-.731-9.084V7H5v1q0 1.142.762 1.963t1.892.953M12 14.269q1.385 0 2.346-.961q.962-.962.962-2.347V5H8.692v5.962q0 1.384.962 2.346q.961.961 2.346.961m4.346-3.354q1.131-.132 1.892-.952T19 8V7h-2.654zM12 9.636"
                    />
                  </svg>
                  <span className="ml-1">{bounty?.category}</span>
                </div>
                <div className="ml-2">|</div>
                <div className="flex ml-2 mt-[2px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4b5563"
                      d="M11.5 3a9.5 9.5 0 0 1 9.5 9.5a9.5 9.5 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 12.5A9.5 9.5 0 0 1 11.5 3m0 1A8.5 8.5 0 0 0 3 12.5a8.5 8.5 0 0 0 8.5 8.5a8.5 8.5 0 0 0 8.5-8.5A8.5 8.5 0 0 0 11.5 4M11 7h1v5.42l4.7 2.71l-.5.87l-5.2-3z"
                    />
                  </svg>
                  <span className={`ml-1 ${statusInfo.submissionColor}`}> {statusInfo.submissionStatus}</span>
                </div>
                <div className="ml-2">|</div>
                <div className="flex ml-3 mt-[2px] justify-start items-center">
                 
                  <span className={statusInfo.color}>{statusInfo.status}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end flex-row items-center flex-grow ">
              <Image
                src={
                  "https://res.cloudinary.com/dmebegin1/image/upload/v1732737075/qpmyhnoapwgppl0bjd3z.png"
                }
                className="rounded-full"
                width={20}
                height={20}
                alt=""
              />
              <span className="text-lg text-slate-800 ml-4 mr-2">
                {bounty?.budget}
              </span>
              <span className="text-slate-400 text-base"> ALGO</span>
            </div>
          </div>
          <div className="flex justify-center items-start flex-row mt-2">
            <div className="w-[30%]">
              <p className="p-4 text-slate-500 border-[1px] border-transparent border-b-slate-300">
                Prizes
              </p>
              <div className="w-full p-2 border-[1px] border-transparent border-r-slate-300 h-full">
                <div className="flex justify-start items-center gap-2 p-2">
                  <Image
                    src={
                      "https://res.cloudinary.com/dmebegin1/image/upload/v1732737075/qpmyhnoapwgppl0bjd3z.png"
                    }
                    className="rounded-full"
                    width={30}
                    height={30}
                    alt=""
                  />
                  <div>
                    <span className="text-lg font-bold text-slate-800">
                      {bounty?.budget}
                    </span>
                    <span className="ml-2">ALGO</span>
                    <span className="text-slate-500 ml-4">Total Prizes</span>
                  </div>
                </div>
                <div className="flex justify-between items-start flex-row mt-4">
                  <div className="flex justify-start p-4 items-ceenter flex-col w-[49%] bg-[#f3f6fd] rounded-lg">
                    <span className="text-sm text-slate-600">
                      Total Submissions
                    </span>
                    <span className="text-slate-800 text-sm font-bold text-center mt-1">
                      61
                    </span>
                  </div>
                  <div className="flex justify-start p-4 items-center flex-col w-[49%] bg-[#f3f6fd] rounded-lg">
                    <span className="text-sm text-slate-600">Deadline</span>
                    <span className="text-slate-800 text-sm font-bold text-center mt-1">
                      {formatDateToDDMMYYYYHM(bounty?.endAt)}
                    </span>
                  </div>
                </div>
                
              </div>
            </div>

            <Tabs
              defaultValue="details"
              className="w-[850px] flex justify-start items-start flex-col mt-2 ml-2"
            >
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="submission">Submission</TabsTrigger>
                {winnerList.length != 0 && (
                  <>
                    <TabsTrigger value="winner_announce">
                      Winner Announcement
                    </TabsTrigger>
                    <TabsTrigger value="reward_distribute">
                      Rewards Distribution
                    </TabsTrigger>
                  </>
                )}
              </TabsList>
              <TabsContent value="details">
                <div className="flex justify-center items-start flex-col w-full p-6">
                  <p className="font-bold text-xl text-slate-700">About Gig</p>
                  <p className="mt-4 mb-6 text-slate-500">{bounty?.about}</p>
                  <p className="font-bold text-xl text-slate-700">
                    Developer Instructions
                  </p>
                  <p className="mt-4 mb-6 text-slate-500">
                    <ReactMarkdown
                      remarkPlugins={[
                        remarkParse,
                        [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                        remarkGfm,
                      ]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {bounty?.devInstructions}
                    </ReactMarkdown>
                  </p>
                  <p className="font-bold text-xl text-slate-700">
                    Judging Criteria
                  </p>
                  <p className="mt-4 mb-6 text-slate-500">
                    <ReactMarkdown
                      remarkPlugins={[
                        remarkParse,
                        [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                        remarkGfm,
                      ]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {bounty?.judgingCriteria}
                    </ReactMarkdown>
                  </p>
                  <p className="font-bold text-xl text-slate-700">Rewards</p>
                  <p className="mt-4 mb-6 text-slate-500">
                    <ReactMarkdown
                      remarkPlugins={[
                        remarkParse,
                        [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                        remarkGfm,
                      ]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {bounty?.rewardDistribution}
                    </ReactMarkdown>
                  </p>
                  <p className="font-bold text-xl text-slate-700">
                    Submission Requirements
                  </p>
                  <p className="mt-4 mb-6 text-slate-500">
                    <ReactMarkdown
                      remarkPlugins={[
                        remarkParse,
                        [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                        remarkGfm,
                      ]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {bounty?.submissionRequirement}
                    </ReactMarkdown>
                  </p>
                  <p className="font-bold text-xl text-slate-700">Resources</p>
                  <p className="mt-4 mb-6 text-slate-500">
                    <ReactMarkdown
                      remarkPlugins={[
                        remarkParse,
                        [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                        remarkGfm,
                      ]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {bounty?.resources}
                    </ReactMarkdown>
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="submission" className="w-full">
                <ProjectList
                  winnerLength={winnerList.length}
                  bountyId={bountyId}
                  projects={projects}
                />
              </TabsContent>
              {winnerList.length != 0 && (
                <TabsContent value="winner_announce">
                  <WinnerList winnerList={winnerList} />
                </TabsContent>
              )}
              {winnerList.length != 0 && (
                <TabsContent value="reward_distribute">
                  <DistributeBounty
                    bountyId={bountyId}
                    winnerList={winnerList}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
