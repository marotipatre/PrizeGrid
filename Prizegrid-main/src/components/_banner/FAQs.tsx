"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  

export default function FAQs() {
    console.log(process.env.NEXT_PUBLIC_GIGSTER_BACKEND_BASE_URL);
    
    return (
        <div id='faqs' className='w-screen h-screen flex justify-center items-center flex-col mt-24'>
            <h1 className='text-3xl text-slate-800 text-center '>FAQs</h1>
            <div className='w-[60%] h-full mt-16'>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is this platform?</AccordionTrigger>
                    <AccordionContent>
                        Our platform is a unified solution for managing freelancing gigs and bounties. It allows project owners to post tasks and securely transfer funds to freelancers upon completion.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Why does the platform use the Aptos blockchain?</AccordionTrigger>
                    <AccordionContent>
                        Aptos offers superior speed and scalability compared to many other blockchain networks, allowing for faster transactions and a better user experience, especially for a mass consumer base.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How is this different from other bounty platforms?</AccordionTrigger>
                    <AccordionContent>
                        We leverage the Aptos blockchain for faster, more secure transactions. Our platform also includes built-in task verification and transparent reward distribution, ensuring efficiency and trust for both project owners and freelancers.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How do I fund a job or bounty?</AccordionTrigger>
                    <AccordionContent>
                        After creating your hunter profile, you can browse available jobs/bounties in the dashboard section. Use filters to find tasks that match your skills and interests.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>How do I find jobs or bounties?</AccordionTrigger>
                    <AccordionContent>
                        Once you complete a task and its verified by the project owner, the reward is transferred by bounty owner to your Aptos wallet address associated with your account.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>
        </div>
    )
}