import React from 'react'
import { useContext } from 'react'
import SocketContext from './Socket'
import styles from './styles/Chat.module.css'

const Test = () => {

  const socket = useContext(SocketContext)

  return (
    <div>
      <div className={styles.top}>
        <div className={styles.welcome}>
          You are currently in room {socket.roomid}
        </div>
      </div>
      {socket.messages.length === 0 && <div className={styles.nochat}>Say hello to start a chat!</div>}
      <section className={styles.chats}>
      {socket.messages.map((m) => {
        const sentAt = new Date(m.created)
        const hour = sentAt.getHours()
        const min = sentAt.getMinutes()
        
        if (m.id !== socket.id) {

          return (
            <div className={styles.he} ref={socket.scrollRef} key={m.message + m.created}>
              <p className={styles.hemessagewrapper}>
              <div className={styles.sender}>
                <div>
                  {m.sender}
                </div>
              </div>
              <div className={styles.msg}>
                {m.message}
                <div className={styles.time}>
                  {hour}:{String(min).padStart(2, '0')}
                </div>
              </div>
              </p>
            </div>            
          )
        } else {
          return (
            <div className={styles.me} ref={socket.scrollRef} key={m.message + m.created}>
              <div className={styles.memessagewrapper}>
              <div className={styles.msg}>
                {m.message}
                <div className={styles.time}>
                  {hour}:{String(min).padStart(2, '0')}
                </div>
              </div>
              </div>
            </div>
          )
        }
      })}

      </section>
      <form className={styles.inputs} onSubmit={(e) => e.preventDefault()}>
        <input placeholder='Message' className={styles.input} value={socket.chat} ref={socket.inputRef} onChange={(e) => socket.setChat(e.target.value)} />
        <button type='submit' className={styles.button} onClick={socket.sendMessage}>Send</button>    
      </form>

    </div>
  )
}

export default Test