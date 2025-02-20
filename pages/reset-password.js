import { useState } from "react";
import { useRouter } from "next/router";
import BgHexaAnimation from "@/components/BgHexaAnimation";

export default function ResetPassword() {
  const router = useRouter();
  const { token, email } = router.query; // Retrieve token and email from URL query
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, email, password }),
      });

      const data = await response.json();
    //   console.log(data);

      if (response.ok) {
        setMessage("Password reset successfully!");
        setTimeout(() => router.push("/login"), 2000); // Redirect to login page
      } else {
        setError(data.message || "Error resetting password");
      }
    } catch (error) {
      setError("An error occurred, please try again.");
    }
  };

  return (
    <> <div className="w-full h-[80vh] mx-auto max-w-md py-3"> <h2 className="font-bold text-gray-500 dark:text-pink-200 text-3xl my-8 uppercase text-center"> Reset Password </h2> <div className="text-center"> {message && <p className="text-green-500 mb-4">{message}</p>} {error && <p className="text-red-500 mb-4">{error}</p>} </div> <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 shadow drop-shadow-md shadow-pink-400 rounded p-8 mb-4" > <div className="mb-4"> <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="username" > Password </label> <input required value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-none leading-tight border-2 focus:border-pink-400 dark:text-white" id="username" type="Password" placeholder="Password" /> </div> <div className="mb-6"> <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="password" > Confirm Password </label> <input required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="shadow appearance-none border-2 focus:border-pink-400 rounded w-full py-2 px-3 text-gray-700 dark:text-white mb-3 leading-tight focus:outline-none transition-colors duration-500 ease-in-out focus:shadow-outline" id="password" type="password" placeholder="Confirm Password" /> <p className="text-red-400 dark:text-pink-200 text-xs mx-2 italic"> Please choose a strong password. </p> </div> <div className="text-center justify-between mx-5"> <button className="rounded-lg outline outline-2 hover:outline-pink-400 px-3 text-center text-lg font-medium transition-colors duration-500 ease-in-out shadow-md hover:shadow-pink-300 py-0.5" type="submit" > Update Password </button> </div> </form> <BgHexaAnimation /> </div> </>
  );
}
