"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import GlobeScene from "../../components/Globe";
import { useEffect } from "react";

const Banner = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";
  const { account } = useWallet();
  // const { userType, setUserType }: any = useUser();
  const route = useRouter();
  console.log(BASE_URL);

  const fetchUserType = async () => {
    if (account === null) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/find_usertype/${account?.address}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.userType !== "") {
          localStorage.setItem("userType", data.userType);
          route.push("/bounty");
        }
      } else {
        alert("Failed to create sponsor profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  useEffect(() => {
    fetchUserType();
  }, [account]);

  return (
    <section className="px-2 py-2 bg-white min-h-screen md:px-0 mt-16">
      {/* <div className='w-[400px] h-[400px] absolute top-[150px] -left-[200px] bg-slate-900 rotate-45 flex justify-end items-center flex-row'>
        <Image src={'https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724917106/white_gigster_logo_bg_rm_odpfxf.png'} className='-rotate-45 -mt-[180px] mr-12' alt="" width={140} height={140} />
      </div>
      <div className='w-[400px] h-[400px] absolute top-[150px] -right-[200px] bg-slate-900 rotate-45 flex justify-start items-center flex-row'>
        <Image src={'https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724916905/White_MoveClub_bg_rm_fgm34e.png'} className='-rotate-45 mt-32 ml-12' alt="" width={120} height={120} />
      </div> */}
      <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
        <div className="flex flex-wrap justify-center items-center sm:-mx-3">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 font sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl">
                <span className="xl:inline flex justify-center items-center flex-col">
                  Unlock Your{" "}
                  <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-black via-blue-700 to-blue-900 lg:inline">
                    Potential
                  </span>
                  <span> in Algorand Ecosystem</span>
                </span>
              </h1>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md font-mono lg:text-xl md:max-w-3xl">
                {">"}_ Contribute. Grow. Earn.
              </p>
              <section className="bg-white t">
                <div className="py-4">
                  <div className="flex gap-8 text-gray-500 sm:gap-12 md:grid-cols-3  dark:text-gray-400 place-items-center">
                    <p className="text-base font-bold  tracking-tight leading-tight text-center text-grey">
                      On your favorite chain
                    </p>
                    <a href="#" className="flex justify-center items-center">
                      <Image
                        src="https://res.cloudinary.com/dmebegin1/image/upload/v1732737075/qpmyhnoapwgppl0bjd3z.png"
                        alt=""
                        width={75}
                        height={75}
                        className="flex-shrink-0 rounded-full"
                      />
                      <p className="px-2 font-bold">ALGORAND</p>
                    </a>
                  </div>
                </div>
              </section>

              <div className="relative flex sm:flex-row sm:space-x-4">
                <Link
                  href="/become-sponser"
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-black  bg-gradient-to-r from-black via-black to-blue-900 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                >
                  Become Sponsor
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link
                  href="/become-hunter"
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-black  bg-gradient-to-l from-black via-black to-blue-900 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                >
                  Become Hunter
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <Image
            src={
              "https://res.cloudinary.com/dmebegin1/image/upload/v1732649956/Untitled_design_5_p74g6w.png"
            }
            alt=""
            width={550}
            height={550}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
