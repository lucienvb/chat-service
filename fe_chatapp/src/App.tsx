import { useEffect, useState } from 'react'
import logo from './logo.svg'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import io, { Socket } from "socket.io-client"
import MessageInput from './MessageInput'
import Messages from "./Messages"

function App() {
  const [socket, setSocket] = useState<Socket>()
  const[messages, setMessages]=useState<string[]>([])

  const send = (value: string) => {
    socket?.emit("message", value)
  }
  useEffect(() => {
    const newSocket=io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (message: string) => {
    setMessages([...messages, message])
  }
  useEffect(() => {
    socket?.on("message", messageListener)
    return () => {
      socket?.off("message", messageListener)
    }
  }, [messageListener])
  return (
    <>
      {" "}
      <MessageInput send={send} />
      <Messages messages={messages} />
    </>
  )
}

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
