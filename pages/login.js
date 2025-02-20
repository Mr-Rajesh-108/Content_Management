import BgHexaAnimation from '@/components/BgHexaAnimation'
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/router';

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Login Succecssful');
      router.push('/');

    } else {
      alert(data.message || 'Invalid credentials ');
    }
  };


  return (
    <>
      <div className="w-full h-[80vh] mx-auto max-w-md py-3">
        <h2 className='font-bold text-3xl my-8 uppercase text-center'>login</h2>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-500 shadow drop-shadow-md shadow-pink-400 rounded p-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="username">Email id</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 focus:outline-none transition-colors duration-500 ease-in-out leading-tight border-2 dark:text-white focus:border-pink-400" id="username" type="email" placeholder="Email or Username" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input required value={password} onChange={(e) => setPassword(e.target.value)} className="shadow transition-colors duration-500 ease-in-out appearance-none border-2 dark:text-white focus:border-pink-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
            <p className="text-red-400 dark:text-pink-300 text-xs mx-2 italic">Please choose a strong password.</p>
          </div>
          <div className="flex items-center justify-between mx-5">
            <button className='rounded-lg outline outline-2 hover:outline-pink-400 px-3 text-center text-lg font-medium shadow-md hover:shadow-pink-300 py-0.5' type="submit"> login</button>

            <Link className="inline-block align-baseline font-bold text-sm dark:text-pink-100 text-gray-400 hover:text-pink-900 dark:hover:text-pink-900 " href="/forget">
              Forgot Password?
            </Link>
          </div>
        </form>
        <BgHexaAnimation />
      </div>
    </>
  )
}

export default login