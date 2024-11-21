"use client";
import Link from "next/link";
import React from "react";
// import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import Image from "next/image";
import { WalletSelector as ShadcnWalletSelector } from "@/components/WalletSelector";
import { usePathname } from "next/navigation";

const Navbar2 = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/bounty", label: "My Bounty" },
    { href: "/sponser/create-gig", label: "Create Gig" },
    { href: "/swap", label: "Swap" },
    { href: "/get-in-touch", label: "Get In Touch" },
  ];

  return (
    <>
      <section className="w-full px-8 text-gray-700 bg-white fixed -top-3 z-10">
        <div className="container flex flex-row flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative flex flex-row md:flex-row">
            <Link
              href="/"
              className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0"
            >
              <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">
                <Image
                  src={
                    "https://res.cloudinary.com/dm6aa7jlg/image/upload/v1724954954/Twitter_profile_gigster_ymobek.png"
                  }
                  alt=""
                  height={50}
                  width={50}
                />
              </span>
            </Link>
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mr-5 font-medium leading-6 ${
                    pathname === item.href
                      ? "text-gray-600 border-b-2 border-gray-600 p-2"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="w-[20%] flex justify-center items-center flex-row">
            <Link
              href="/sponser/profile"
              className={`mr-5 font-medium leading-6 ${
                pathname === "/sponser/profile"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Image
                src={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAACUCAMAAADWBFkUAAAAMFBMVEXk5ueutLfo6eqrsbXq7O21ur2yt7qor7K6v8G/xMbFycvg4uPKztDd3+HZ3N7T1ticPKHzAAAEJklEQVR4nO2c2W4rIQxAZ8zOMPD/f3thpk2T3CyAiSESR1Wl5unINWZ1lmUymUwmk8lkMplMJpNJNnDQ2+ItSXHzwVlrnQv7dn4yJrB4ZwVTKv4cv5i2YV+G9OWL05Ixtl4R/5Q6jBdf2Oyt6LWyGyu+sFumHrsmlBzJlwfxwvXwjfnQ2/IEFvNa9cQMoQt+fZKwd+krt96qUTbILNmk63uHF0Ke6klnXXBvhtctqqsuhCLZvtEFLwtl145DbcsdYH+wtVdwQRfLRl3bR5eXjbALXWY12Ktc11V0Sd2aPEh0yYVQKRt16WVB18quTHNqWV83xE52YlsuqhMhQp25tQXhhLgsgEXZKtqau9WPsQQzlLJxv4CDtog5zBhbUypQ2hqkLTOUJbd4XXuPJLTdMFPDGVw62aV4g/O/rSeTBYu3dWQVl2MHWcSSJS4XaFnCg6Yvs0UXsHXVdLZ42Wn7zPa7MuG7RhludXtAt9nhWUf3r6GbywpPbR/BCPc6qO35aUu5SUevExjlNhJdFATl3sFi92V0gyzdN2BtKdO24sLhFkkou9Qf3p4wSyoLDhdb6osolKwmPswHg5kgKCvCCSZxqV3jLr1aV3W4JkEcM5K7prJQewNFer54oW6xQHvSfKH2Wof6QudXtyYXiK8crik/D6M9Zr5lK01dpru5Jr5KNka3IBmY6PxAEPb81ypMb70fhMWym1nIlB7h6WXuLWqnBzX35DwOVGKUR6ILbEa99lW0W5s38F0/fynK5AjD6xqAYOSjADMmbfe3of8Dy+4EuxVmSulRX+Un42DF5ahBCutHNf2B89SfEYKPIeVjq6b85X+M2/6SzPYQnDVaiwNtzNH+MlTPTlRJrTlGHP0ut7Pw8UksYC4mxta9Zydmpg/WiFU9ayT5tY7K1vmlYyYD96kCvBa9KryxSJiw9Ng7xH9/0OrNfPswyoK8AMMWrKw9CFPMOE+Xw3yzIq9/5AlxNjaeJIVjnWrw8uNYQhK4+neLwxLf/ZPxBR5eLAzLYcJ9MH93nVmt8pEf2lLA5lrlwDVKf2L1CwH1mvk5bLWt6y9A04S9Q+5NJ7iyLrJyVMPwAvpa972ublXMAHnxmEWrNkTYPzS87lCuhWx2lyZaF3/0FMcXkWyDu2r0Q4QyXdx1D61sKg2IZMC1DlXp1ucu+oVHBfUvtIvuFJrpVi7KqlpKG1A1q9W2lGJhosIWfJ/IpjpWrlt8zdiQ8s4NbJcTAiaKQ9tPNi1wylbnLbpFEJT1HMHeVbawnRr6hjbt1PJ1e0y5t7CSpXnHgvBDQVlA9r+2QOXXXHxrHpr8zvruYyyhcocZ7x/aglTAd5Q2ILfkln9lzkfIXDi26MJpQOb38LTox2pA7lHTGLaZ32uz9552f8ja/abvUhuC3KIwCFmyk0b8A2RVN6tkAMtJAAAAAElFTkSuQmCC"
                }
                alt=""
                width={30}
                height={30}
                style={{ borderRadius: "100px" }}
              />
            </Link>
            <ShadcnWalletSelector />
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar2;
