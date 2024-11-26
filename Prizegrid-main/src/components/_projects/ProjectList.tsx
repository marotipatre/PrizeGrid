"use client";

import { useState } from "react";
import ProjectCard from "./project-card";
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "../ui/use-toast";

const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

const WinnerList = ({ bountyId, winners, projects, handleRepick }: any) => {
  const { toast } = useToast();
  const router = useRouter();
  const { account } = useWallet();

  const handleAnnounce = async () => {
    try {
      console.log(projects);

      const response = await fetch(
        `${BASE_URL}/api/add_winners/${bountyId}/${account?.address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            winner1SubmissionId: projects[winners[0]]?._id,
            winner2SubmissionId: projects[winners[1]]?._id,
            winner3SubmissionId: projects[winners[2]]?._id,
          }),
        }
      );
      if (response.ok) {
        toast({
          title: "You have announce winners 🎉",
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
    <div className="mb-6 p-4 bg-slate-100 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2">Winners </h2>
        <div>
          <button
            className="bg-slate-800 text-white p-2 rounded-md shadow mr-4"
            onClick={handleRepick}
          >
            Re-pick 🔃
          </button>
          <button
            className="bg-slate-800 text-white p-2 rounded-md shadow"
            onClick={handleAnnounce}
          >
            Announce 🚀
          </button>
        </div>
      </div>

      {winners.length === 0 ? (
        <p>No winners selected yet.</p>
      ) : (
        <ol className="list-decimal list-inside">
          {winners.map((winnerIndex: any, index: any) => (
            <li key={index} className="mb-1">
              {projects[winnerIndex].title} -{" "}
              {projects[winnerIndex]?.submittedBy}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

const ProjectList = ({ winnerLength, bountyId, projects }: any) => {
  const [winners, setWinners] = useState<number[]>([]);
  const [resetKey, setResetKey] = useState(0);

  const handleSelectWinner = (index: number) => {
    if (winners.length < 3 && !winners.includes(index)) {
      const newWinners = [...winners, index];
      setWinners(newWinners);
      return newWinners.length;
    }
    return null;
  };

  const handleRepick = () => {
    setWinners([]);
    setResetKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="flex-grow w-full">
      {winnerLength ? (
        <div className="flex justify-center items-centermb-6 p-4 bg-slate-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Winners Announced! </h2>
        </div>
      ) : (
        <WinnerList
          bountyId={bountyId}
          winners={winners}
          projects={projects}
          handleRepick={handleRepick}
        />
      )}
      <div className="w-full flex justify-start items-start flex-row flex-wrap">
        {projects.length != 0 &&
          projects?.map((project: any, index: any) => (
            <ProjectCard
              key={`${index}-${resetKey}`}
              item={project}
              index={index}
              onSelectWinner={handleSelectWinner} // Make sure this line is present
            />
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
