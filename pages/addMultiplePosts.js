import React, { useState } from 'react'

const addMultiplePosts = () => {
    const [posts, setPosts] = useState([{ title: '', author: '', content: '' }]);
    const handleChange = (index, event) => {
        const newPosts = posts.slice();
        newPosts[index][event.target.name] = event.target.value;
        setPosts(newPosts);
    };
    const addMultiPostBox = () => {
        setPosts([...posts, { title: '', author: '', content: '' }]);
    };
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/addBlogPosts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(posts)
        });
        if (res.ok) {
            console.log("Done: post added");
            setPosts([{ title: '',author:'', content: '' }]);
        } else {
            console.error("failed to create posts");
        }
    }
    return (
        <>
            <section className="text-gray-600 body-font">
                <form onSubmit={handleSubmitForm} >
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap items-center justify-evenly sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                            {posts.map((post, index) => (
                                <div key={index} className="p-4 h-full w-full md:w-1/3 -mx-2.5 my-1.5 border border-dotted border-pink-700 flex flex-col">
                                    <div className="max-w-md w-10/12 mx-auto">
                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input value={post.title} onChange={(e) => handleChange(index, e)} type="text" name="title" id={`postTitle${index}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor={`postTitle${index}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input value={post.author} onChange={(e) => handleChange(index, e)} type="text" name="author" id={`postAuthor${index}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor={`postAuthor${index}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Author</label>
                                            </div>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <textarea value={post.content} onChange={(e) => handleChange(index, e)} type="email" name="content" id={`contentArea${index}`} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " rows={5} required />
                                            <label htmlFor={`contentArea${index}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Content</label>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-evenly '>

                            <button type='button' onClick={addMultiPostBox} className="mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Another Posts</button>
                            <button type='submit' className="mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>

                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default addMultiplePosts