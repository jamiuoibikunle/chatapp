import React from 'react'
import { useContext } from 'react'
import SocketContext from './Socket'
import styles from './styles/Chat.module.css'

const Test = () => {

  const socket = useContext(SocketContext)

  return (
    <div>
      <section className={styles.chats}>
      {socket.messages.map((m) => {
        if (m.id !== socket.id) {
          return (
            <div className={styles.he} ref={socket.scrollRef} key={m.message}>
              {m.message}
            </div>            
          )
        } else {
          return (
            <div className={styles.me} ref={socket.scrollRef} key={m.message}>
              {m.message}
            </div>
          )
        }
      })}

      </section>
      <form className={styles.inputs} onSubmit={(e) => e.preventDefault()}>
        <input placeholder='Message' value={socket.chat} ref={socket.inputRef} onChange={(e) => socket.setChat(e.target.value)} />
        <button type='submit' onClick={socket.sendMessage}>Send</button>    
      </form>

    </div>
  )
}

export default Test