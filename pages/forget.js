import AnimatedButton from '@/components/AnimatedButton'
import React from 'react'
import { useRouter } from "next/router";
import { useState } from "react";

function forget() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const response = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      router.push("/login");
    } else {
      setMessage(data.message);
    }
  };
  return (
    <>
      <div className=" md:py-28 relative  dark:bg-gray-900 h-screen">
        {/* <div className="Toastify"></div> */}
        <div className="flex bg-white absolute rounded-lg shadow-lg overflow-hidden w-[80%] md:w-[61%] sm:w-[61%] lg:w-[61%] xl:w-[61%] 2xl:w-[61%]  dark:bg-slate-800" style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&amp;amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;amp;auto=format&amp;amp;fit=crop&amp;amp;w=667&amp;amp;q=80'" }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl  font-semibold text-gray-700 text-center dark:text-gray-200 ">Forgot Your Password </h2>
            <p className="text-sm text-gray-600 text-center mt-4 dark:text-gray-300">Find your account with these easy steps</p>
            <span className="flex items-center justify-center my-3">
              <div className="g_id_signin text-gray-600 font-bold" data-text="signup_with" data-type="standard">
                <div className="" style={{
                  position: "relative",
                }}>
                </div>
              </div>
            </span>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span><span className="text-xs  mb-4 text-center text-gray-500 uppercase dark:text-gray-400 ">or <a href="/signup"> sign up</a> with email</span><span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <form className="w-full max-w-lg py=2">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                    First Name
                  </label>
                  <input onChange={(e)=>setPassword} className="appearance-none block w-full bg-gray-200 text-gray-700  border focus:border-pink-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Rajesh" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                    Last Name
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="last-name" type="text" placeholder="Chaurasiya" />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                    email id
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="email" type="email" placeholder="user123@gmail.com" />
                </div>
              </div>
            </form>
            {/* <div className="my-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
                or Login
              </span>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div> */}
            <button className='text-center mt-4'><AnimatedButton className="" buttonName={"Find Your Account"} /></button>
          </div>
        </div >
      </div >

    </>
  )
}

export default forget