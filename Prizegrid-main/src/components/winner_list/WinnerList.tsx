import { useState } from "react";
import ProjectCard from "./project-card";


const WinnerList = ({ winnerList }: any) => {
  
    return (
      <div>
        <div className="w-full flex justify-start items-start flex-row flex-wrap">
          {winnerList?.length != 0 && winnerList?.map((project: any, index: any) => (
            <ProjectCard
              key={index}
              item={project}
              index={index+1}
            />
          ))}
        </div>
      </div>
    );
  };

export default WinnerList;