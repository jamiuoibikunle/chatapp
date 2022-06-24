import React, { useEffect, useState } from 'react'
import styles from './styles/Home.module.css'
import meeting from './resources/meeting.png'
import { useContext } from 'react'
import SocketContext from './Socket'
import NewMeeting from './modals/Newmeeting'
import { ArrowBack } from '@material-ui/icons'
import { useRef } from 'react'

const Home = () => {

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

  return socket.step === 1 ? (
    <main className={styles.homewrapper}>
      <NewMeeting />
      <header className={styles.homeheader}>
        Mi-Meet
      </header>
      <section className={styles.hometop}>
        <button className={styles.newmeeting} disabled={toggle} onClick={socket.createRoom}>
          New meeting
        </button>
        <button className={styles.joinwith} disabled={toggle} onClick={socket.StepTwo}>
          Join with a code
        </button>
      </section>
      <section className={styles.middle}>
        <img src={meeting} className={styles.meeting} alt='Meeting' />
        <dl className={styles.dl}>
          <dt className={styles.dt}>
            Get a link that you can share
          </dt>
          <dd className={styles.dd}>
            Tap new meeting to get a link that you can send to people that you want to meet with
          </dd>
        </dl>
      </section>
    </main>
  ) : (
    <main className={styles.page2}>
      <section className={styles.header2}>
        <ArrowBack onClick={socket.StepOne} className={styles.arrow} />
        <div className={styles.headerjoin}>
          Join with a code
        </div>
        <button className={styles.joinbtn} ref={joinRef}>
          Join
        </button>
      </section>
      <section className={styles.entercode}>
        Enter the code provided by the meeting organiser
      </section>
      <section>
        <input placeholder='Example: rm_1927530912' className={styles.entercodeinput} onChange={socket.handleJoin} />
      </section>
    </main>
  )
}

export default Home