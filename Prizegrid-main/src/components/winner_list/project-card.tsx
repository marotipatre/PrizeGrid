"use client"

import { useState } from 'react';
import { StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { formatDateToDDMMYYYYHM } from '../formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM';

const ProjectCard = ({ item, index }: any) => {

  return (
    <div className="bg-white border m-3 px-3 pt-3 pb-12 w-[45%] rounded-lg">
      <div className="px-3">
        <div className='flex w-full justify-end items-center flex-row'>
          <button 
            className={`flex gap-4 p-1 px-2 rounded-md bg-yellow-200`}
          >
            <StarIcon className={`h-4 w-4 text-yellow-500`} />
            <h3 className="text-red text-sm font-medium font-mono -ml-2">
              {item?.rank}
            </h3>
          </button>
        </div>
        <h4 className="text-2xl font-bold pt-6 text-black">{item?.submissionTitle}</h4>
        <div>
        <div className='flex justify-start items-center text-xs my-2'>
          <span className='bg-slate-200 p-1 rounded-md'>by</span>
          <a href={item?.twitterLink} target='_blank' className="text-base ml-4 font-normal pt-1 opacity-75 font-mono rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 128 128"><path d="M75.916 54.2L122.542 0h-11.05L71.008 47.06L38.672 0H1.376l48.898 71.164L1.376 128h11.05L55.18 78.303L89.328 128h37.296L75.913 54.2ZM60.782 71.79l-4.955-7.086l-39.42-56.386h16.972L65.19 53.824l4.954 7.086l41.353 59.15h-16.97L60.782 71.793Z"/></svg>
          </a>
        </div>
        </div>
        <div className="relative rounded-3xl  py-4">
          <div className="flex items-center justify-center bg-black  rounded-lg p-1">
            {/* image */}
          </div>
        </div>
        <h3 className="mb-2">Submitted At: {formatDateToDDMMYYYYHM(item?.submittedAt)}</h3><br />
        <hr style={{ color: '#C4C4C4' }} />
        <a className="relative rounded-3xl cursor-pointer py-4" href={item?.submissionLink} target='_blank'>
          <div className="flex items-center justify-center bg-slate-800  rounded-lg p-1">
            <h3 className="flex cursor-pointer gap-2 items-center text-white text-center text-sm font-medium">
              <p>View</p> <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden="true" />
            </h3>
          </div>
        </a>
      </div>
    </div>
  );
};

function getOrdinalSuffix(i: number) {
  const j = i % 10,
        k = i % 100;
  if (j == 1 && k != 11) {
    return "st";
  }
  if (j == 2 && k != 12) {
    return "nd";
  }
  if (j == 3 && k != 13) {
    return "rd";
  }
  return "th";
}

export default ProjectCard;