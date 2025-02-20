import Link from "next/link";
import React, { useState } from "react";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("api/reset-password", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, lastName, firstName }),
    });

    const data = await res.json();
    console.log(res);
    console.log(data);

    if (res.ok) {
      alert("Reset Mail Send Successful");
      setEmail("");
      setFirstName("");
      setLastName("");
    } else {
      alert(data.message || "Invalid credentials ");
    }
  };

  return (
    <>
      <div className="md:py-28 relative dark:bg-gray-900 h-screen">
        <div
          className="flex bg-white absolute rounded-lg shadow-lg overflow-hidden w-[80%] md:w-[61%] sm:w-[61%] lg:w-[61%] xl:w-[61%] 2xl:w-[61%] dark:bg-slate-800"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&amp;amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;amp;auto=format&amp;amp;fit=crop&amp;amp;w=667&amp;amp;q=80')",
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center dark:text-gray-200">
              Forgot Your Password
            </h2>
            <p className="text-sm text-gray-600 text-center mt-4 dark:text-gray-300">
              Find your account with these easy steps
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="text-xs mb-4 text-center text-gray-500 uppercase dark:text-gray-400">
                or <Link href="/signup"> sign up,</Link> with email
              </span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-lg py-2">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="first-name"
                  >
                    First Name
                  </label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border focus:border-pink-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="first-name"
                    type="text"
                    placeholder="Rajesh"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="last-name"
                  >
                    Last Name
                  </label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-400"
                    id="last-name"
                    type="text"
                    placeholder="Chaurasiya"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    email id
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-pink-400"
                    id="email"
                    type="email"
                    placeholder="user123@gmail.com"
                  />
                </div>
              </div>
              <div className="text-center">
                <button class="bg-gray-300 hover:bg-pink-400 font-bold py-2 px-4 border-2 border-pink-700 hover:border-black rounded dark:hover:border-white dark:bg-gray-300 dark:text-pink-600">
                  Find Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forget;
