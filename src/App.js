import SocketContext from './Socket';
import { useEffect, useRef, useState } from 'react'
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';
import Home from './Home';
import styles from './styles/App.module.css'
// const socket = io.connect('https://mi-chatapp.herokuapp.com/')
const socket = io.connect('http://localhost:3001')

function App() {

  const [ step, setStep ] = useState(1)
  const [ chat, setChat ] = useState('')
  const [ messages, setMessages ] = useState([])
  const [ roomid, setRoomid ] = useState('')
  const [ isModalLoading, setIsModalLoading ] = useState()
  const [ isModal, setIsModal ] = useState(false)
  const [ roomCode, setRoomCode ] = useState('')
  const inputRef = useRef()
  const scrollRef = useRef()

  const sendMessage = () => {
    setMessages((messages) => [...messages, {message: chat, id: socket.id}])
    socket.emit('sendMessage', {message: chat, id: socket.id, roomid})
    setChat('')
  }
  
  const createRoom = () => {
    let randomNum = 'rn_'
    for ( let i = 0; i < 10; i++ ) { randomNum += Math.floor(Math.random() * 9)}
    setRoomid(randomNum)
    socket.emit('createRoom', randomNum)
    setIsModalLoading(true)
    setTimeout(() => {
      setIsModal(true)
      setIsModalLoading(false)
    }, 1000);
  }

  const unfocusModal = () => {
    setIsModal(false)
  }

  const handleJoin = (e) => {
    setRoomCode(e.target.value);

  }

  console.log(roomid);

  useEffect(() => {
    socket.on('receiveMessage', ({message, id}) => {
      setMessages([...messages, {message, id}])
    })
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  console.log(roomCode);

  const StepTwo = () => {
    setStep(2)
  }

  const StepOne = () => {
    setStep(1)
  }

  return (
    <SocketContext.Provider value={{ 
      messages, 
      scrollRef, 
      chat, 
      inputRef, 
      setChat, 
      sendMessage, 
      createRoom, 
      id: socket.id, 
      isModal, 
      unfocusModal, 
      roomid, 
      isModalLoading,
      StepTwo,
      StepOne,
      step,
      handleJoin,
      roomCode
      }} className={styles.app}>
      <Home />
      {/* <Chat /> */}
    </SocketContext.Provider>
  );
}

export default App;
