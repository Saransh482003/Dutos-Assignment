import React, { useEffect, useState } from 'react'
import Navbar from '@/Components/navbar'
import styler from "../styles/Vendors.module.css"
import Image from 'next/image'
import { useRouter } from 'next/router';


const vendors = () => {
    const [inventory, setInventory] = useState([])
    const [orders, setOrders] = useState([])
    const router = useRouter();
    const { vendorName } = router.query;
    useEffect(() => {
        fetch(`/api/vendorProducts?vendorName=${vendorName}`).then((a) => {
            return a.json()
        }).then((res) => {
            setInventory(res)
        })
    }, [router, vendorName])
    useEffect(() => {
        fetch(`/api/vendorOrders?vendorName=${vendorName}`).then((a) => {
            return a.json()
        }).then((res) => {
            setOrders(res)
        })
    }, [router, vendorName])
    const approve = async (cardInfo) => {
        const updateInv = inventory.map((item) => {
            if (item.itemName === cardInfo.itemName && (item.quantity - cardInfo.quantity) >= 0) {
                return {
                    ...item,
                    quantity: item.quantity - cardInfo.quantity
                }
            }
            else {
                return item
            }
        })
        setInventory(updateInv)
        const updateOrder = orders.filter((item) =>
            (item.itemName !== cardInfo.itemName) ||
            (item.userName !== cardInfo.userName));
        setOrders(updateOrder);

        const request = await fetch(`/api/vendorApprove?vendorName=${cardInfo.vendorName}&itemName=${cardInfo.itemName}&userName=${cardInfo.userName}`)
        if (request.ok) {
            alert("Order Approved!!")
        }
        else {
            alert("Error approving. Try again.")
        }
    }
    const reject = async (cardInfo) => {
        // const updateInv = inventory.map((item) => {
        //     if (item.itemName === cardInfo.itemName && (item.quantity - cardInfo.quantity) >= 0) {
        //         return {
        //             ...item,
        //             quantity: item.quantity - cardInfo.quantity
        //         }
        //     }
        //     else {
        //         return item
        //     }
        // })
        // setInventory(updateInv)
        const updateOrder = orders.filter((item) =>
            (item.itemName !== cardInfo.itemName) ||
            (item.userName !== cardInfo.userName));
        setOrders(updateOrder);
        const request = await fetch(`/api/vendorApprove?vendorName=${cardInfo.vendorName}&itemName=${cardInfo.itemName}&userName=${cardInfo.userName}`)
        if (request.ok) {
            alert("Order Rejected!!")
        }
        else {
            alert("Error approving. Try again.")
        }
    }

    return (

        <>
            <Navbar />
            <section className={styler.main}>
                <section className={styler.productDisplay}>
                    {
                        orders.map((inv) => {
                            return <div className={styler.card}>
                                <div className={styler.img}><Image src="/product-placeholder.png" width={500} height={500} className={styler.productImg}></Image></div>
                                <div className={styler.content}>
                                    <h3 className={styler.contHead}>{inv.itemName}</h3>
                                    <p className={styler.contVendor}>CLIENT : <span style={{ color: "black" }}>{inv.userName}</span></p>
                                    <p className={styler.contVendor}>QUANTITY DEMANDED: <span style={{ color: "black" }}>{inv.quantity}</span></p>
                                </div>
                                <div className={styler.cart}>
                                    <div className={styler.tick} style={{ borderTopRightRadius: "2rem", backgroundColor: "green" }} title='Approve Order' onClick={() => approve(inv)}>
                                        <Image src="/tick.png" height={600} width={600} className={styler.tickImg}></Image>
                                    </div>
                                    <div className={styler.tick} style={{ borderBottomRightRadius: "2rem", backgroundColor: "#b60000" }} title='Reject Order' onClick={() => reject(inv)}>
                                        <Image src="/cross.png" height={600} width={600} className={styler.tickImg}></Image>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </section>
                <section className={styler.basket}>
                    <h1 className={styler.header}>Your Inventory</h1>
                    <hr style={{ border: "0.15rem solid black" }} />
                    <div className={styler.baskRow}>
                        <div className={styler.baskPro} style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}>PRODUCT</div>
                        <div className={styler.baskQua} style={{ fontSize: "0.8rem", letterSpacing: "0.2rem", height: "max-content" }}>QUANTITY</div>
                    </div>
                    {
                        inventory.map((item) => {
                            return <div className={styler.baskRow}>
                                <div className={styler.baskPro}>{item.itemName}</div>
                                <div className={styler.baskQua}>{item.quantity}</div>
                            </div>
                        })
                    }
                    {/* {orders.length > 0 && <>
                        <div className={styler.baskRow}>
                            <div className={styler.baskPro}>TOTAL</div>
                            <div className={styler.baskQua}>${basket.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</div>
                        </div>
                        <div className={styler.complete}>
                            <div className={styler.buy} onClick={() => order()}>
                                Place Order
                            </div>
                        </div>
                    </>

                    } */}

                </section>
            </section>
        </>
    )
}

export default vendors