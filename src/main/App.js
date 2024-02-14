import React, { Fragment, useState } from 'react'
import "../styles/main.css"
import "../styles/normalize.css"
import gpticon from '../assets/chatgpt-icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";


const App = () => {

  const [mode, setMode] = useState('white');
  const [isVisible, setIsVisible] = useState(true);
  const [icon, setIcon]= useState(FiMoon);

  const [promptText, setPromptText] = useState('');
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse([...response, { user: "me", message: promptText }]);
    setPromptText("");
    
    try {
      const response = await fetch('https://zainchaudhary.pythonanywhere.com/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'prompt=' + encodeURIComponent(promptText),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }
      const data = await response.json();
  
      setResponse(prev => [...prev, { user: "chatgpt", message: data.reply }]);
      setError('');
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Error: ' + error.message);
      setResponse('');
    }
  };
  

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
      <section className={`chatbox ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`} >
      <div className='icon-div'  onClick={()=>{handleModeCombined()}}>
        {icon}
      </div>
      {response.length > 0 ?
        response.map((el, i) => {
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
  <div className={`bottom-section-container ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}>
        <div className='bottom-section'>
            <form className='input-div' onSubmit={handleCombinedSubmit}>
              <input
                placeholder='Message ChatGPT...'
                className={`input-container ${mode === 'dark' ? 'bg-dark' : 'bg-white'}`}
                value={promptText}
                type='text'
                disabled={loading}
                onChange={(e) =>  {setPromptText(e.target.value)} }
              />
              <div className='submit-button' onClick={handleCombinedSubmit}><FontAwesomeIcon icon={faArrowUp} /></div>
            </form>
        </div>
    </div>    
      </section>
    </div>
    </Fragment>
  )
}
export default App

const ChatMessage = ({ message, mode }) => {
  return (
    <div className={`chat-log ${mode === "dark" ? "bg-dark" : "bg-white"}`}>
      <span className="avatar"></span> 
      <div className={message.user === 'chatgpt' ? 'chatGPT' : ''}>
        {message.user === 'chatgpt' && (
          <img className='gpt-icon-answer' src={gpticon} alt="User" />
        )}
      </div>
      <div className="message">
        {message.user !== 'chatgpt' && <FaRegUser />} &nbsp; &nbsp; {message.message} 
      </div>
    </div>
  );
};
