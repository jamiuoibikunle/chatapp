import React, { useRef } from 'react'
import { useContext } from 'react'
import SocketContext from '../Socket'
import styles from '../styles/Newmeeting.module.css'
import { ShareOutlined } from '@material-ui/icons'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import xmark from '../resources/xmark.svg'
import copy from '../resources/copy.svg'

const NewMeeting = () => {

  const socket = useContext(SocketContext)
  const popupRef = useRef()

  const handleShare = () => {

    if (navigator.share) {
      navigator.share({
        title: 'Mi-Meet Group Invite',
        text: 'Hey! Join me in my group chat with this link',
        url: 'https://mi-chatapp.netlify.app'
      })
    }
  }

  return (
    <div ref={popupRef}>
      {socket.isModal &&
      <main className={styles.modalwrapper}>
        <header className={styles.header}>
          <div>
            Here's a link to your meeting
          </div>
          <img src={xmark} alt='xmark' className={styles.xmark} onClick={socket.unfocusModal} />
        </header>
        <div className={styles.copy}>
          Copy this link and send it to people you want to meet with. Make sure that you save it so that you can use it later too.
        </div>
        <div className={styles.roomid}>
          {`${socket.roomid}`}
          <CopyToClipboard text={`${socket.roomid}`} className={styles.clipboard}>
              <img src={copy} alt='copy' className={styles.copyicon} />
          </CopyToClipboard>
        </div>
        <div className={styles.share} onClick={handleShare}>
          <ShareOutlined fontSize='small' /> Share invitation
        </div>
      </main>
      }
    </div>
  )
}

export default NewMeeting