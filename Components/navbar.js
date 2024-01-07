import React from 'react'
import styler from "../styles/Navbar.module.css"
import Link from 'next/link'

const Navbar = () => {
  return (
    <>
        <section className={styler.nav}>
            <div className={styler.nav1} style={{fontSize:"1.2rem"}}>
                Dutos Stationary and Accessories
            </div>
            <div className={styler.nav1} style={{flexDirection:"row-reverse"}}>
                <Link href="/" style={{textDecoration:"none"}}>Logout</Link>
            </div>
            
        </section>
        <hr />
    </>
  )
}

export default Navbar