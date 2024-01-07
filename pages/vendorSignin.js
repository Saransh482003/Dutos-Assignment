import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styler from "../styles/VendorSign.module.css"
import { useState } from 'react'
import { useRouter } from 'next/router';


const vendorSignin = () => {
    const router = useRouter();
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        vendorName: "",
        password: ""
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault()
        const req = await fetch(`/api/vendorSignin?vendorName=${formData.vendorName}&password=${formData.password}`)
        if (req.status == 200) {
            router.push(`/vendors?vendorName=${formData.vendorName}`);
        }
        else {
            setMessage("You are not registered as our Premium Vendor. Kindly check your credencials")
        }
    }
    return (
        <>

            <section className={styler.all}>
                <section className={styler.nav}>
                    <Link href="/" className={styler.nav1}>
                        User SignIn
                    </Link>
                </section>
                <div className={styler.signers}>
                    <div className={styler.signin}>
                        <h1 className={styler.header}>Sign Up</h1>
                        <form className={styler.sign} onSubmit={handleSubmit}>
                            <label htmlFor="vendorName" className={styler.label}>VENDOR NAME</label>
                            <input type="text" name='vendorName' className={styler.vendorName} onChange={handleChange} />
                            <label htmlFor="vendorName" className={styler.label}>PASSWORD</label>
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

export default vendorSignin