"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDateToDDMMYYYYHM } from "../formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";

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

export default function Bounty({ bounties, userType, userAddress, onCardClick }: any) {
    const currentDate = new Date();

    return (
        <div className="w-full flex justify-start items-center flex-col h-[calc(100%_-100px)] overflow-x-hidden p-1 overflow-y-auto container2">
            {
                bounties?.length !== 0 && bounties?.map((item: any, index: any) => {
                    const startDate = new Date(item.startAt);
                    const endDate = new Date(item.endAt);
                    let status = "";
                    let statusColor = "";

                    // Determine the status based on the current date and bounty dates
                    if (currentDate < startDate) {
                        const timeToStart = getTimeDifference(currentDate, startDate);
                        status = `Starting in ${timeToStart}`;
                        statusColor = "bg-blue-500";
                    } else if (currentDate >= startDate && currentDate <= endDate) {
                        status = "Live";
                        statusColor = "bg-green-500";
                    } else {
                        status = "Ended";
                        statusColor = "bg-red-500";
                    }

                    return (
                        <Link
                            key={index}
                            href={{
                                pathname: userType === 'sponser' && item.creatorAddress === userAddress ? `/sponser/my-bounty/${item._id}` : `/bounty/${item._id}`,
                                query: { userType }
                            }}
                            className="bg-[#ffffff] w-full flex justify-start items-start flex-row p-4 rounded-lg shadow-md m-1"
                        >
                            <Image src={"https://res.cloudinary.com/dmebegin1/image/upload/v1732737075/qpmyhnoapwgppl0bjd3z.png"} className="rounded-full" width={50} height={50} alt="" />
                            <div className="flex justify-center items-start flex-col ml-4">
                                <h1 className="text-slate-800 text-lg">{item.title}</h1>
                                <div className="flex mt-1 ml-4 text-base text-gray-600 font-light">
                                    <div className="text-slate-400 text-sm flex -ml-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 001 1h2a1 1 0 100-2h-1V7z" clipRule="evenodd" />
                                        </svg>
                                        <span className="ml-1">{formatDateToDDMMYYYYHM(item.startAt)}</span>
                                    </div>
                                    <div className={`ml-4 px-2 py-1 rounded-full text-white text-xs ${statusColor}`}>
                                        {status}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}