import SocketContext from './Socket';
import { useEffect, useRef, useState } from 'react'
import './App.css';
import io from 'socket.io-client'
import Chat from './Chat';
import SecondPage from './pages/SecondPage';
import FirstPage from './pages/FirstPage';
import styles from './styles/App.module.css'
import ThirdPage from './pages/ThirdPage';
const socket = io.connect('https://mi-chatapp.herokuapp.com/')
// const socket = io.connect('http://localhost:3001')

function App({children}) {

  const [ step, setStep ] = useState(1)
  const [ chat, setChat ] = useState('')
  const [ messages, setMessages ] = useState([])
  const [ roomid, setRoomid ] = useState('')
  const [ isModal, setIsModal ] = useState(false)
  const [ roomCode, setRoomCode ] = useState('')
  const [ msgOnJoin, setMsgOnJoin ] = useState('')
  const [ dispName, setDispName ] = useState(localStorage.getItem('display_name') || '')
  const [ onNewJoin, setOnNewJoin ] = useState(false)
  const inputRef = useRef()
  const scrollRef = useRef()

  // window.addEventListener('beforeunload', (e) => e.returnValue = 'Are you sure you want to refresh page? Your session will be lost.')

  const sendMessage = () => {
    setMessages((messages) => [...messages, {message: chat, id: socket.id, sender: dispName, created: new Date()}])
    socket.emit('sendMessage', {message: chat, id: socket.id, roomid, sender: dispName, created: new Date()})
    setChat('')
  }
  
  const createRoom = () => {
    let randomNum = 'rn_'
    for ( let i = 0; i < 10; i++ ) { randomNum += Math.floor(Math.random() * 9)}
    setRoomid(randomNum)
    socket.emit('createRoom', randomNum)
    setTimeout(() => {
      setIsModal(true)
    }, 1000);
  }

  const unfocusModal = () => {
    setIsModal(false)
  }

  const handleJoin = (e) => {
    setRoomCode(e.target.value);
  }

  useEffect(() => {
    socket.on('newJoin', (newJoin) => {
      if (newJoin.newJoin === 'True') setOnNewJoin(true)
    })
  }, [socket])

  const getRooms = () => {
    if ( roomCode.length !== 0 ) {
    socket.emit('getRooms', (roomCode))
    setRoomid(roomCode)
    socket.on('joinStatus', (isJoined) => {
      if (isJoined.isJoined === 'Success') {
        StepThree()
        setMsgOnJoin(`You have successfully joined ${roomCode}`)
      } else if (isJoined.isJoined === 'Duplicate') {
        setMsgOnJoin('You are already a member of this room')
      } else {
        setMsgOnJoin(`You are currently in another room. Kindly exit before you attempt to join again`)
      } 
    })} else {
      setMsgOnJoin('You cannot leave the field empty')
    }}

    const setDisplayName = (e) => {
      setDispName(e.target.value)
    }

    const handleDispName = () => {
      localStorage.setItem('display_name', dispName)
      setStep(4)
    }

  useEffect(() => {
    socket.on('receiveMessage', ({message, id, sender, created}) => {
      setMessages([...messages, {message, id, sender, created}])
    })
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])
  
  const StepOne = () => {
    setStep(1)
  }

  const StepTwo = () => {
    setStep(2)
  }

  const StepThree = () => {
    setStep(3)
  }

  const StepFour = () => {
    setStep(4)
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
      StepTwo,
      StepOne,
      StepThree,
      StepFour,
      step,
      handleJoin,
      roomCode,
      getRooms,
      msgOnJoin,
      dispName,
      setDisplayName,
      handleDispName,
      onNewJoin
      }} className={styles.app}>
      {step === 1 && <FirstPage />}
      {step === 2 && <SecondPage />}
      {step === 3 && <ThirdPage />}
      {step === 4 && <Chat />}
    </SocketContext.Provider>
  );
}

export default App;
