import Link from 'next/link'
import React from 'react'

const about = () => {
  return (
    <>
      <div>
        <h1>About Us</h1>
        <p>Our mission is to educate individuals about the stock market and provide a platform for sharing knowledge.</p>
      </div>
      <div>
        <h1>Welcome to Stock Market Learning & Blogging</h1>
        <p>Your go-to platform for learning about the stock market and sharing insights.</p>
        <Link href="/blog"><p>Read Our Blog</p></Link>
        <Link href="/learn"><p>Start Learning</p></Link>
      </div>
    </>
  )
}

export default about