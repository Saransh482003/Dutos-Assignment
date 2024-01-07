import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styler from "../styles/Index.module.css"
import { useState } from 'react'
import { useRouter } from 'next/router';


const index = () => {
  const router = useRouter();
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    const req = await fetch(`/api/signin?username=${formData.username}&password=${formData.password}`)
    if (req.status == 200) {
      router.push(`/user?username=${formData.username}`);
    }
    else {
      setMessage("You are not registered as our Premium Client. Kindly check your credencials")
    }
  }
  return (
    <>

      <section className={styler.all}>
        <section className={styler.nav}>
          <Link href="/vendorSignin" className={styler.nav1}>
            Vendor SignIn
          </Link>
        </section>
        <div className={styler.signers}>
          <div className={styler.signin}>
            <h1 className={styler.header}>Sign Up</h1>
            <form className={styler.sign} onSubmit={handleSubmit}>
              <label htmlFor="username" className={styler.label}>USERNAME</label>
              <input type="text" name='username' className={styler.username} onChange={handleChange} />
              <label htmlFor="username" className={styler.label}>PASSWORD</label>
              <input type="password" name='password' className={styler.password} onChange={handleChange} />
              <button type="submit" className={styler.submit}>Continue &#x2192;</button >
              <p className="message" style={{ textAlign: "center", marginTop: "2rem", color: "white", fontWeight: "500" }}>{message}</p>
            </form>
          </div>
        </div>
      </section>
    </>

  )
}

export default index