"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkParse from "remark-parse";
import remarkStringify, { Options } from "remark-stringify";
import remarkGfm from "remark-gfm"; // To handle GFM features like lists
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
//     useDisclosure,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     useToast,
// } from '@chakra-ui/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useRef, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { formatDateToDDMMYYYYHM } from "@/components/formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Network, Provider } from "aptos";
import { Gift, Loader2, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/_navbar/Navbar";

const markdownConfig: Options = {
  bullet: "*",
  bulletOther: "-",
  bulletOrdered: ".",
  closeAtx: false,
  emphasis: "*",
  fence: "`",
};

const provider = new Provider(Network.MAINNET);

const BASE_URL = process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL || "";

const MODULE_ADDRESS =
  "0xb4c500b5a0beba1a70f41a2479c86e7d611bfaa381403d00971cef13040fb3d3";

export default function Bounty({ params }: any) {
  const { account, signAndSubmitTransaction } = useWallet();
  const [bounty, setBounty] = useState<any>([]);
  const [isSubmitted, setIsSubmitted] = useState<Boolean>(false);
  const router = useRouter();
  const btnRef = useRef(null);
  const { bountyId } = params;
  const { toast } = useToast();

  const [receiverAddress, setReceiverAddress] = useState("");
  const [greeting, setGreeting] = useState("");
  const [pendingWishes, setPendingWishes] = useState([]);
  const [receivedWishes, setReceivedWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<any>({
    title: "",
    submissionLink: "",
    twitterLink: "",
    anythingElse: "",
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
        variant: "default",
      });
      return;
    }

    if (new Date() > new Date(bounty.endAt)) {
      toast({
        title: "You cannot submit bounty due to time limit! ❌",
        variant: "default",
      });
      return;
    }

    try {
      formData.walletAddress = account?.address;
      const response = await fetch(
        `${BASE_URL}/api/create_bounty_submission/${bountyId}/${account?.address}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        toast({
          title: "You have submitted bounty successfully! 🚀",
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

  const fetchBounty = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/get_bounty_by_id/${bountyId}`
      );
      if (response.ok) {
        const data: any = await response.json();
        setBounty(data);
      } else {
        alert("Failed to create sponsor profile");
      }

      const response2 = await fetch(
        `${BASE_URL}/api/checkBountySubmitted/${bountyId}/${account?.address}`
      );
      if (response2.ok) {
        const data: any = await response2.json();
        console.log("is submitted", data?.isSubmitted);

        setIsSubmitted(data?.isSubmitted);
      } else {
        alert("Failed to create sponsor profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to check if a resource exists at an address
  const checkResourceExists = async (address: string) => {
    try {
      const resources = await provider.getAccountResources(address);
      return resources.some(
        (resource) =>
          resource.type === `${MODULE_ADDRESS}::diwali_wish::DiwaliWish`
      );
    } catch (error) {
      console.error("Error checking resource:", error);
      return false;
    }
  };

  // Function to send a wish
  const sendWish = async () => {
    if (account === null) {
      toast({
        title: "Wallet connection required.",
        description: "You need to connect aptos wallet",
        variant: "default",
      });
      return;
    }

    if (!receiverAddress || !greeting) {
      setError("Please fill in both receiver address and greeting");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if receiver already has a wish
      const hasWish = await checkResourceExists(receiverAddress);
      if (hasWish) {
        setError("Receiver already has a pending wish!");
        return;
      }

      const response = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function: `${MODULE_ADDRESS}::diwali_wish::send_wish`,
          typeArguments: [],
          functionArguments: [receiverAddress, greeting],
        },
      });

      const response2 = await fetch(`${BASE_URL}/api/add_diwali_wish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverAddress,
          greeting,
        }),
      });
      if (response2.ok) {
        setSuccess("Wish sent successfully! 🪔");
        setReceiverAddress("");
        setGreeting("");
        toast({
          title: "You have sent Diwali wishes",
        });
      } else {
        toast({
          title: "Failed to send wish",
        });
      }

      await provider.waitForTransaction(response.hash);

      // Refresh wishes after sending
      // fetchWishes();
    } catch (error) {
      setError(`Failed to send wish: ${error}`);
    } finally {
      setIsLoading(false);
      toast({
        title: "You have sent Diwali wishes",
      });
    }
  };

  useEffect(() => {
    fetchBounty();
  }, [bountyId]);

  return (
    <>
      <Navbar />
      <div className="flex mt-24 justify-start items-center flex-col w-screen min-h-screen">
        <div className="w-[80%]">
          <div className="w-full flex justify-start items-start flex-row p-4 rounded-lg shadow-md m-1">
            <Image
              src={
                "https://tse1.mm.bing.net/th?id=OIP.bHrShAEKhWrUzdP3v8a5CQHaHb&pid=Api&P=0&h=180"
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
                  <span className="ml-1">Submissions open</span>
                </div>
                <div className="ml-2">|</div>
                <div className="flex ml-3 mt-[2px] justify-start items-center">
                  <div className="bg-green-500 w-2 h-2 rounded-full pulse-green"></div>
                  <span className="ml-2">Live</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end flex-row items-center flex-grow ">
              <Image
                src={
                  "https://tse1.mm.bing.net/th?id=OIP.bHrShAEKhWrUzdP3v8a5CQHaHb&pid=Api&P=0&h=180"
                }
                className="rounded-full"
                width={20}
                height={20}
                alt=""
              />
              <span className="text-lg text-slate-800 ml-4 mr-2">
                {bounty?.budget}
              </span>
              <span className="text-slate-400 text-base"> APT</span>
            </div>
          </div>
          <div className="flex justify-center items-start flex-row mt-2">
            <div className="w-[30%]">
              {bounty._id == "671f0d1ea06d723723679c76" && (
                <div className="w-full mx-auto py-4 space-y-4">
                  {/* Send Wish Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5" />
                        Send Diwali Wish
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input
                        placeholder="Receiver Address (0x...)"
                        value={receiverAddress}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        disabled={isLoading}
                      />
                      <Input
                        placeholder="Your Diwali Greeting"
                        value={greeting}
                        onChange={(e) => setGreeting(e.target.value)}
                        disabled={isLoading}
                      />
                      <Button
                        onClick={sendWish}
                        disabled={
                          isLoading ||
                          !receiverAddress ||
                          !greeting ||
                          !account?.address
                        }
                        className="w-full"
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="mr-2 h-4 w-4" />
                        )}
                        Send Wish
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Status Messages */}
                </div>
              )}
              <p className="p-4 text-slate-500 border-[1px] border-transparent border-b-slate-300">
                Prizes
              </p>
              <div className="w-full p-2 border-[1px] border-transparent border-r-slate-300">
                <div className="flex justify-start items-center gap-2 p-2">
                  <Image
                    src={
                      "https://tse1.mm.bing.net/th?id=OIP.bHrShAEKhWrUzdP3v8a5CQHaHb&pid=Api&P=0&h=180"
                    }
                    className="rounded-full"
                    width={30}
                    height={30}
                    alt=""
                  />
                  <div>
                    <span className="text-lg font-bold text-slate-800">
                      {bounty.budget}
                    </span>
                    <span className="ml-2">APT</span>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      style={{
                        width: "100%",
                        padding: "4px",
                        marginTop: "10px",
                      }}
                    >
                      {isSubmitted ? (
                        <button
                          disabled
                          className="w-full bg-slate-600 text-white p-2 rounded-lg"
                        >
                          Submitted
                        </button>
                      ) : (
                        <button
                          className="w-full bg-slate-800 text-white p-2 rounded-lg"
                          ref={btnRef}
                        >
                          Submit Now
                        </button>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Bounty Submission</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                      <div className="flex flex-col w-full mr-2 mt-4">
                        <label className="text-base text-slate-700 mb-2 ml-1">
                          Your Gig Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          placeholder="Your Gig Title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          type="text"
                          className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                          required
                        />
                      </div>
                      <div className="flex flex-col w-full mr-2 mt-4">
                        <label className="text-base text-slate-700 ml-1">
                          Link To Your Submission{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <span className="text-slate-400 text-sm ml-1">
                          Make sure this link is accessible by everyone!
                        </span>
                        <input
                          placeholder="Link to your submission"
                          name="submissionLink"
                          value={formData.submissionLink}
                          onChange={handleChange}
                          type="text"
                          className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                          required
                        />
                      </div>
                      <div className="flex flex-col w-full mr-2 mt-4">
                        <label className="text-base text-slate-700 ml-1">
                          Tweet Link <span className="text-red-500">*</span>
                        </label>
                        <span className="text-slate-400 text-sm ml-1">
                          This helps sponsors discover (and maybe repost) your
                          work on Twitter! If this submission is for a Twitter
                          thread bounty, you can ignore this field.
                        </span>
                        <input
                          placeholder="Add a tweet link"
                          name="twitterLink"
                          value={formData.twitterLink}
                          onChange={handleChange}
                          type="text"
                          className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                          required
                        />
                      </div>
                      <div className="flex flex-col w-full mr-2 mt-4">
                        <label className="text-base text-slate-700 ml-1">
                          Anything Else? <span className="text-red-500">*</span>
                        </label>
                        <span className="text-slate-400 text-sm ml-1">
                          If you have any other links or information you would
                          like to share with us, please add them here!
                        </span>
                        <input
                          placeholder="Add info or link"
                          name="anythingElse"
                          value={formData.anythingElse}
                          onChange={handleChange}
                          type="text"
                          className="text-[14px] w-full p-[6px] rounded-lg transition-all border-[2px] border-slate-300 outline-none focus:border-sky-500 focus:border-[3px]"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="w-[70%] flex justify-start items-start flex-col">
              <p className="p-4 text-slate-500 border-[1px] border-transparent border-b-slate-300 w-full">
                Details
              </p>
              <div className="flex justify-center items-start flex-col w-full p-6">
                {bounty?.about?.trim() !== "" && (
                  <>
                    <p className="font-bold text-xl text-slate-700">
                      About Gig
                    </p>
                    <p className="mt-4 mb-6 text-slate-500">
                      <ReactMarkdown
                        remarkPlugins={[
                          remarkParse,
                          [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                          remarkGfm,
                          remarkBreaks,
                        ]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {bounty?.about}
                      </ReactMarkdown>
                    </p>
                  </>
                )}
                <p className="font-bold text-xl text-slate-700">
                  Developer Instuctions
                </p>
                {bounty?.devInstructions?.trim() !== "" && (
                  <>
                    <p className="mt-4 mb-6 text-slate-500">
                      <ReactMarkdown
                        remarkPlugins={[
                          remarkParse,
                          [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                          remarkGfm,
                          remarkBreaks,
                        ]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {bounty?.devInstructions}
                      </ReactMarkdown>
                    </p>
                    <p className="font-bold text-xl text-slate-700">
                      Judging Criteria
                    </p>
                  </>
                )}
                {bounty?.judgingCriteria?.trim() !== "" && (
                  <>
                    <p className="mt-4 mb-6 text-slate-500">
                      <ReactMarkdown
                        remarkPlugins={[
                          remarkParse,
                          [remarkStringify, markdownConfig], // Pass the config to remark-stringify
                          remarkGfm,
                          remarkBreaks,
                        ]}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {bounty?.judgingCriteria}
                      </ReactMarkdown>
                    </p>
                  </>
                )}
                {bounty?.rewardDistribution?.trim() !== "" && (
                  <>
                    <p className="font-bold text-xl text-slate-700">Rewards</p>
                    <p className="mt-4 mb-6 text-slate-500">
                      {bounty?.rewardDistribution}
                    </p>
                  </>
                )}
                {bounty?.submissionRequirement?.trim() !== "" && (
                  <>
                    <p className="font-bold text-xl text-slate-700">
                      Submission Requirements
                    </p>
                    <p className="mt-4 mb-6 text-slate-500">
                      {bounty?.submissionRequirement}
                    </p>
                  </>
                )}
                {bounty?.resources?.trim() !== "" && (
                  <>
                    <p className="font-bold text-xl text-slate-700">
                      Resources
                    </p>
                    <p className="mt-4 mb-6 text-slate-500">
                      {bounty?.resources}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}
