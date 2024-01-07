import React, { useEffect, useState } from 'react'
import Navbar from '@/Components/navbar'
import styler from "../styles/User.module.css"
import Image from 'next/image'
import { useRouter } from 'next/router';


const user = () => {
  const [inventory, setInventory] = useState([])
  const [basket, setBasket] = useState([])
  const router = useRouter();
  const { username } = router.query;
  useEffect(() => {
    fetch("/api/allProducts").then((a) => {
      return a.json()
    }).then((res) => {
      setInventory(res)
    })
  }, [])
  const order = async () => {
    try {
      const updatedBasket = basket.map((item) => {
        return {
          ...item,
          userName: username,
        };
      });
      // console.log(updatedBasket)
      const response = await fetch('/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBasket),
      });

      if (!response.ok) {
        console.error('Error:', response.statusText);
        return;
      }
      else {
        alert("Order Placed. Thank you!!")
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const putInCart = (cardInfo) => {
    let flag = false;
    const updatedBasket = basket.map((item) => {
      if (item.itemName === cardInfo.itemName) {
        flag = false
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        flag = true;
        return item;
      }
    });
    if (flag || updatedBasket.length == 0) {
      cardInfo.quantity = 1
      updatedBasket.push(cardInfo)
      console.log(updatedBasket)
    }
    setBasket(updatedBasket);
  }
  const plusCart = (cardInfo) => {
    const updatedBasket = basket.map((item) => {
      if (item.itemName === cardInfo.itemName) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else {
        return item;
      }
    });
    setBasket(updatedBasket);
  };
  const minusCart = (cardInfo) => {
    const updatedBasket = basket.map((item) => {
      if (item.itemName === cardInfo.itemName && item.quantity >= 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      } else {
        return item;
      }
    });
    setBasket(updatedBasket);
  };
  const deleteCart = (cardInfo) => {
    const updatedBasket = basket.filter((item) => item.itemName !== cardInfo.itemName);
    setBasket(updatedBasket);
  }

  return (

    <>
      <Navbar />
      <section className={styler.main}>
        <section className={styler.productDisplay}>
          {
            inventory.map((inv) => {
              return <div className={styler.card}>
                <div className={styler.img}><Image src="/product-placeholder.png" width={500} height={500} className={styler.productImg}></Image></div>
                <div className={styler.content}>
                  <h3 className={styler.contHead}>{inv.itemName}</h3>
                  <p className={styler.contVendor}>VENDOR : <span style={{ color: "black" }}>{inv.vendorName}</span></p>
                  <div className={styler.priceAndGrow}>
                    <p className={styler.contPrice}>${inv.price} <span style={{ color: "#3e3e3e", fontSize: "1rem", textDecoration: "line-through" }}>${(inv.price + 5).toFixed(2)}</span></p>
                    <div className={styler.plusMinus}>
                      <div className={styler.plus} onClick={() => plusCart(inv)}>+</div>
                      <div className={styler.minus} onClick={() => minusCart(inv)}>-</div>
                    </div>
                  </div>

                </div>
                <div className={styler.cart} onClick={() => putInCart(inv)}>
                  <Image src="/cart.png" height={600} width={600} className={styler.cartImg}></Image>
                </div>
              </div>
            })
          }
        </section>
        <section className={styler.basket}>
          <h1 className={styler.header}>Your Basket</h1>
          <hr style={{ border: "0.15rem solid black" }} />
          <div className={styler.baskRow}>
            <div className={styler.baskPro} style={{ fontSize: "0.8rem", letterSpacing: "0.2rem" }}>PRODUCT</div>
            <div className={styler.baskQua} style={{ fontSize: "0.8rem", letterSpacing: "0.2rem", height: "max-content" }}>QUANTITY</div>
            <div className={styler.baskDel}></div>
          </div>
          {
            basket.map((item) => {
              return <div className={styler.baskRow}>
                <div className={styler.baskPro}>{item.itemName}</div>
                <div className={styler.baskQua}>{item.quantity}</div>
                <div className={styler.baskDel}><Image src="/delete.png" height={200} width={200} className={styler.delete} onClick={() => deleteCart(item)}></Image></div>
              </div>
            })
          }
          {basket.length > 0 && <>
            <div className={styler.baskRow}>
              <div className={styler.baskPro}>TOTAL</div>
              <div className={styler.baskQua}>${basket.reduce((sum, item) => sum + (item.price*item.quantity), 0).toFixed(2)}</div>
            </div>
            <div className={styler.complete}>
              <div className={styler.buy} onClick={() => order()}>
                Place Order
              </div>
            </div>
          </>

          }

        </section>
      </section>
    </>
  )
}

export default user