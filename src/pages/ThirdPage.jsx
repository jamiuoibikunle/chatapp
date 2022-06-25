import React from 'react'
import { useContext } from 'react'
import SocketContext from '../Socket'
import styles from '../styles/ThirdPage.module.css'

const ThirdPage = () => {

  const socket = useContext(SocketContext)
  console.log(socket.dispName);

  return (
    <main className={styles.container}>
      <div className={styles.display}>
        Enter your display name:
      </div>
      <input className={styles.input} value={socket.dispName} onChange={socket.setDisplayName} placeholder='Enter your display name' />
      <button className={styles.proceed} onClick={socket.handleDispName}>Proceed to meeting</button>
    </main>
  )
}

export default ThirdPage