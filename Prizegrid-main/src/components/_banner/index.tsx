"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <section className="px-2 py-20 bg-white min-h-screen md:px-0 mt-32">
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
                  <span> in Aptos Universe</span>
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
                        src={
                          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAY1BMVEX///8AAABpaWnv7+9/f3+bm5sUFBRUVFRAQEBOTk5vb2/m5ub8/PxsbGxKSkoQEBCTk5NFRUWHh4cJCQnMzMzY2NisrKy6uro7OztiYmIoKCj19fXAwMB3d3cyMjKjo6MfHx+56mH0AAAGU0lEQVR4nO2dbZuqIBCGK3ypYM11QUUt+/+/8uRamy9QKQzoubi/1lVM4TDMPAybDQiEEMSqOj7zw74ItjeCYn/g57iuGLq9CPOt2ikRYmkSbl8SJilDqFyyTQRhlnnfr+14svdShtEiDSKYpt7+U0Me5F5K8cLsISzz+c9US1p+uJ+x5diD0zicacmdME6xbSsayirhgZIlv5x4kpWWTUE+v6hb0nLhPrJoCvZyDX/Kk1Pu2ZptmJ90WtIShMyCKezj9WQq34bNIYxDmdLAmTlfQFgCaUqDZ2rlwXUBbct2W9QmJluZvgkidRGm4HONemZMafAoqCnInxxKqpBDrqJ0Z9KUhh3Un0NMPPhDihrErSHjf0vLDmCqMTumNOh20iS1Z8t2m2qdasigQxbhaZxqzNA6KUdfLE1z27bclhw9Pppk2vaSKlwyDQ9OmS7Clps16rFa6VtYKcUUvqI1JAbYGr/ExxhT8dbvFKvNNNMumbcJDZKK83Ceii3gO8oB4V9ypha/4TzfltisKbe9/9vvjmeaQiS/Dhj9lVEyw/1Zzw1JtSb43hP110VyFr4rmBWomV4r98M1Hol92iWbbovpGKYYxytYnGecHtmwg1lbtqIRUvHkOEyMOjFoxvJDWzabSrzc8Enp9dL0AiObOZn47cmUwEbyGWDIn4JKHBpOcAJm9/t5/ep3JplwZ2ij8OFwOBwOh8PhcDjmQxili1D/aYB5Yf795dsehhboXRyhkG5dDPhvM7x+a0inTpLYHowq3QTSaeXPTV9MdE1tj0cBchxmZyrbQ5pNOS4sWhHM6kAojdqtc/WUFOKPtpXzc0CxpOhztimcnwWu5cdSuA4BRgurfXASHl1lpty4hMf4HYmUrgvxtwE470/YnN7wI2XbWXmxJcWiPo5PfygpgqyI4rnwmi74A1D/zTJxxX1V/Pl2SVF3VeQPf2a6ggnC/aEpTet9QLgr67B1bawO7sGqRS25Rn7ah4baHocefrUEpW97GHr4FaJJlFAAXCqyIRXUE/rVeABkSiP3SJEBOc+iWTYxzGePeCpfgVRGjTurYD56iNfZfMGET/R3L2MCr7vLJ18QX5EK0lggDA7AgGygbvOYmNBiHof5CogTOYebr9T/qSP4OPdCAQ58GjEmEuWRslfZjXkQA565EGf49B/JQ/CRWSE05Uat1hFlDIPemV1zeXIve5lIm061yfgOkOPL4kuZHjV+F19vacThcDgcDofD4Vg3JcvocjpjqpFGl+ISrVwU10IeWUWlTgQL4ZmoWL38spe6rt+/fdH0kz1rll/ebOnnW64zzu4vBjxMXGvqSmQDwcH7aK1i0lJURApXJ1j8pRT3I+G2xzUHaTva3eqksfgsb+qU622D9wp09pR5WwcrQnAuTbUZ6a/6WOHaeBqhD1oh5+bRtNtVUh9tK9T/SdW0Yf/FQ3NtQw1kRNYAzVcbaRjvYwbCo3uwISkQLI+CJotsj0Sdv+jceJspAJ6tqP6Dlea5QdfRZa7Ic4tnPTo7WqQc0eRJRmnqWTOne2ZN1TmH9x/GWgPhblJLUf21/9voV3aiiV6nRzVtY9FJWtg58XHs7f5qBXHztZeAseEZg37qFCusm4PGpBbU+NHgOPF8Df0wzWdhCd4NhkDnetVxylLd0U9k3Bx13jwLRII10x1Fo9EIZj24gTgxbrjXq2AQM+ZZICtZUJNxuEjROj0K+JaXX+jZXLNnUUmr5F9CjhK8+lW5oszqRD25+AlnYfYXT+Ntdr9EZng3DofD4XA4HI7/E5zVy7j5Wp0yLq7BtVh/f8VN50q90PZI1On0QBkmQ9ZHN0eQrFzn20u7/sy7OGkpDLQChTlpj37oMD2x4t6XbFzxMH27ujaEsjjhufjlI5H47W2Paw6VrHq7X51cMXuRNr6qXnBpEsFzPyLff8R3j6jH4VPCMDxEs1Xfme5eCuoonC5IFyZFuyqd+1jKbbotheIZlmwBdzY/uKieYCGV+OpEC+zVGwcTupD+h1GlI7g1fhulEF2N0NEC/huNoaD1Fshaz61YFthqPsBqs9nuRfvBNcwN33z8IJh2SetnlL6V9TOPQUJzIrkcHhSuZXURgX3DUy2IAVPbpdlwIKSwuz9sULYIX3EgGKSj5xiOjSQaTRyE2M/pW/EPjKqVWcmO0iUAAAAASUVORK5CYII="
                        }
                        alt=""
                        width={50}
                        height={50}
                        className="flex-shrink-0 rounded-full"
                      />
                      <p className="px-2 font-bold">APTOS</p>
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
              "https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724778211/GigsterXMovClub_Hori_wvxmqz.png"
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
