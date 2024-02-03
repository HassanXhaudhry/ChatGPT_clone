import React, { Fragment, useState } from 'react'
import "../styles/main.css"
import "../styles/normalize.css"
import gpticon from '../assets/chatgpt-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import userImage from '../assets/userpng.png';
import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";


const App = () => {

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [mode, setMode] = useState('white');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [icon, setIcon]= useState(FiMoon)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setChatLog([...chatLog, { user: "me", message: input }]);
    setInput("");
    const response = await fetch('http://localhost:8080/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input
      })
    })
    const data = await response.json();
    console.log(data);
    setChatLog(prev => [...prev, { user: "chatgpt", message: data.message.choices[0].text }]);
    setLoading(false);

  }
  const clearChat = () => {
    setChatLog([]);
  }
  const changeMode = () => {
    setMode(mode === 'dark' ? 'white' : 'dark');
  }
  const toggleicon=()=>{
    setIcon(mode === 'white' ? MdOutlineWbSunny : FiMoon);
  }
  const handleClick = () => {
    setIsVisible(false);
  };

  const handleCombinedSubmit = (e) => {
    handleClick();
    handleSubmit(e);
  };

  const handleModeCombined = ()=>{
    changeMode();
    toggleicon();
  }

 

  return (
    <Fragment> 
    <div className='app'>
    <div className='icon-div'>
            <span className='icon'  onClick={()=>{handleModeCombined()}}>
                {icon}
            </span>
         </div>
      <section className={`chatbox ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`} >
      {chatLog.length > 0 ?
        chatLog.map((el, i) => {
          return <ChatMessage key={i} message={el} mode={mode} />
        })
        :
        <div className='start-conversation' >
          <img className="chatgpt-icon" src={gpticon} alt="gpt icon"/>
          <span className={`sub-text ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}>How can I help you today?</span>
        </div>
      }
  {isVisible &&(
        <div className="questions">
        <div class="first-questions-column">
            <span className={`answerScreen ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}>Help me pick<p>a gift for my dad who loves fishing</p></span>
            <span className={`answerScreen ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}>Tell me a fun fact <p>about the Golden State Warriors</p></span>
        </div>
        <div className="second-questions-column">
            <span className={`answerScreen ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}>Write a thank you note <p>to a guest speaker for my class</p></span>
            <span className={`answerScreen ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}>Show me code snippet <p>of a website sticky header</p></span>
        </div>
    </div>
  )}
        <div className='bottom-section'>
            <form className='input-div' onSubmit={handleCombinedSubmit}>
              <input
                placeholder='Message ChatGPT...'
                className={`input-container ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}
                value={input}
                type='text'
                required
                disabled={loading}
                onChange={(e) => { setInput(e.target.value) }}
              />
              <div className='submit-button' onClick={handleCombinedSubmit}><FontAwesomeIcon icon={faArrowUp} /></div>
            </form>
        </div>
      </section>
    </div>
    </Fragment>
  )
}
export default App

const ChatMessage = ({ message, mode }) => {
  
  return (
    <div className="chat-log">
      <div
        className={`chat-message ${mode === "dark" ? "bg-dark" : "bg-white"}`}
      >
      <span className="avatar"><FaRegUser /> </span> 
        <div className="message">
        {message.message}</div>
        
      </div>
      {/*
  <div className='chat-message-center'>
    <div className={`avatar ${message.user === 'chatgpt' && 'chatGPT'}`}>
      {
        message.user === 'chatgpt' &&
        <img src={userImage} alt="User Avatar" />
      }
    </div>
    <div className='message' >
      {message.message}
    </div>
  </div>
*/}
    </div>
  );
}