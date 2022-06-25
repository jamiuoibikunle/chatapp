import React, { useEffect, useState, useContext } from 'react'
import styles from '../styles/FirstPage.module.css'
import meeting from '../resources/meeting.png'
import NewMeeting from '../modals/Newmeeting'
import SocketContext from '../Socket'
import { ArrowForward } from '@material-ui/icons'

const FirstPage = () => {

  const socket = useContext(SocketContext)

  const [ toggle, setToggle ] = useState(false)

  return (
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
    {socket.onNewJoin === true ?
      <section className={styles.newJoin}>
        <div className={styles.notify}>
          Someone just joined the room.
        </div>
        <div className={styles.proceed} onClick={socket.StepFour}>
          <ArrowForward fontSize='small' /> Proceed to room
        </div>
      </section>
    :
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
}
  </main>
  )
}

export default FirstPage