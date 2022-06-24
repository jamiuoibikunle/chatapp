import React, { useRef } from 'react'
import { useContext } from 'react'
import SocketContext from '../Socket'
import styles from '../styles/Newmeeting.module.css'
import { ShareOutlined, Assignment } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import xmark from '../resources/xmark.svg'
import copy from '../resources/copy.svg'

const NewMeeting = () => {

  const socket = useContext(SocketContext)
  const popupRef = useRef()

  socket.isModalLoading && (popupRef.current.style.boxShadow = '0 0 0 1000px #7d7c7c1a')

  return (
    <div ref={popupRef}>
      {socket.isModalLoading && <CircularProgress className={styles.loading} />}
      {socket.isModal &&
      <main className={styles.modalwrapper}>
        <header className={styles.header}>
          <div>
            Here's a link to your meeting
          </div>
          <img src={xmark} className={styles.xmark} onClick={socket.unfocusModal} />
        </header>
        <div className={styles.copy}>
          Copy this link and send it to people you want to meet with. Make sure that you save it so that you can use it later too.
        </div>
        <div className={styles.roomid}>
          {`localhost:3000/${socket.roomid}`}
          <CopyToClipboard text={`localhost:3000/${socket.roomid}`} className={styles.clipboard}>
            <button>
              <img src={copy} className={styles.copyicon} />
            </button>
          </CopyToClipboard>
        </div>
        <div className={styles.share}>
          <ShareOutlined fontSize='small' /> Share invitation
        </div>
      </main>
      }
    </div>
  )
}

export default NewMeeting