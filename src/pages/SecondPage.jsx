import React, { useEffect, useState } from 'react'
import styles from '../styles/SecondPage.module.css'
import { useContext } from 'react'
import SocketContext from '../Socket'
import { ArrowBack } from '@material-ui/icons'
import { useRef } from 'react'

const SecondPage = () => {

  const socket = useContext(SocketContext)

  const [ toggle, setToggle ] = useState(false)

  const joinRef = useRef()

  useEffect(() => {
    if (socket.roomCode.length === 13) {
      joinRef.current && (joinRef.current.style.color = 'rgb(39, 104, 201)')
    } else {
      joinRef.current && (joinRef.current.style.color = 'rgb(173, 172, 172)')
    }
  }, [socket.roomCode])

  useEffect(() => {
    socket.isModal && setToggle(true)
    !socket.isModal && setToggle(false)
  }, [socket.isModal])

  return (
    <main className={styles.page2}>
      <section className={styles.header2}>
        <ArrowBack onClick={socket.StepOne} className={styles.arrow} />
        <div className={styles.headerjoin}>
          Join with a code
        </div>
        <button className={styles.joinbtn} ref={joinRef} onClick={socket.getRooms}>
          Join
        </button>
      </section>
      <section className={styles.entercode}>
        Enter the code provided by the meeting organiser
      </section>
      <section>
        <input placeholder='Example: rm_1927530912' className={styles.entercodeinput} onChange={socket.handleJoin} />
      </section>
      <section className={styles.errormsg}>
        {socket.msgOnJoin}
      </section>
    </main>
  )
}

export default SecondPage