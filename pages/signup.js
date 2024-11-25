import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';


const signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cityDist, setCityDist] = useState('');
    const [state, setState] = useState('');
    const [pinCode, setPinCode] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, email, password, cityDist, state, pinCode }),
        });

        const data = await res.json();

        if (res.ok) {
            alert('User added successfully');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setCityDist('');
            setState('');
            setPinCode('');
            router.push('/login')
        } else {
            alert(data.message || 'Something went wrong');
        }
    };
    return (
        <>
            <div className=" md:pb-20">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl dark:bg-slate-800/50">
                    <div className="hidden lg:block lg:w-1/2 bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&amp;amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;amp;auto=format&amp;amp;fit=crop&amp;amp;w=667&amp;amp;q=80'" }}></div>
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl uppercase font-semibold text-gray-700 text-center dark:text-gray-200 ">welcome back</h2>
                        <p className="text-xl text-gray-600 text-center mt-4 dark:text-gray-300">Create an Account!</p>
                        <span className="flex items-center justify-center my-3">
                            <div className="g_id_signin text-gray-600 font-bold" data-text="signup_with" data-type="standard">
                                <div className="" style={{
                                    position: "relative",
                                }}>
                                </div>
                            </div>
                        </span>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 lg:w-1/4"></span><span className="text-xs  mb-4 text-center text-gray-500 uppercase dark:text-gray-400 ">or sign up with email</span><span className="border-b w-1/5 lg:w-1/4"></span>
                        </div>
                        <form onSubmit={handleSubmit} className="w-full max-w-lg py=2">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
                                        First Name
                                    </label>
                                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700  border focus:border-pink-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Rajesh" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
                                        Last Name
                                    </label>
                                    <input onChange={(e) => setLastName(e.target.value)} value={lastName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="last-name" type="text" placeholder="Chaurasiya" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                        email id
                                    </label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="email" type="email" placeholder="user123@gmail.com" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                                        Password
                                    </label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="password" type="password" placeholder="******************" />
                                    <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you liked strong</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                                        City/District
                                    </label>
                                    <input value={cityDist} onChange={(e) => setCityDist(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="city" type="text" placeholder="Albuquerque" />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                                        State
                                    </label>
                                    <div className="relative ">
                                        <select value={state} onChange={(e) => setState(e.target.value)} className="block appearance-none uppercase w-full bg-setgray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="state">
                                            <option value={''} >choose your state</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                        </select>

                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pin-code">
                                        Pin-code
                                    </label>
                                    <input value={pinCode} onChange={(e) => setPinCode(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-pink-400" id="pin-code" type="number" placeholder="902100" />
                                </div>
                            </div>

                            <div className="my-4 flex items-center justify-between">
                                <span className="border-b w-1/5 md:w-1/4"></span>
                                <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
                                    or <Link href={"/login"} className='text-blue-500 text-base'>Login</Link>
                                </span>
                                <span className="border-b w-1/5 md:w-1/4"></span>
                            </div>
                            <div className='text-center mt-4'>
                                <button className="rounded-xl outline outline-2 hover:outline-pink-400 px-3 text-center text-lg font-medium shadow-md hover:shadow-pink-300 py-0.5" type="submit">Click Me!</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default signup