import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

import Popup from './Popup';

const Game = ({ leaderboard, setLeaderboard }) => {
  const [clockRunning, setClockRunning] = useState (false);
  const [wordIsWrong, setWordIsWrong] = useState (false);
  const [showPopup, setShowPopup] = useState (false);
  const [finishedTime, setFinishedTime] = useState (0);
  const inputRef = useRef(null);
  const word = "Makers of a sustainable future"; //You know you can learn it at Knowit

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleOnInput = (event) => {
    setClockRunning(true)

    // check if event.currentTarget.value exists inside word  
    if (word.includes(event.currentTarget.value) == false) {
      // Input is wrong
      setWordIsWrong(true)
    }
    else {
      // Input is correct
      setWordIsWrong(false)

      if (event.currentTarget.value == word) {
        // We won!
        setClockRunning(false)
        event.currentTarget.value = ""
      }
    }

    // On every input change
  }

  const handleDone = (time) => {
    if (time == 0) return
    // Update leaderboard
    setFinishedTime(time)
    setShowPopup(false)
    setShowPopup(true)
  }

  const addToLeaderboard = (name, email, nick) => {
    console.log("adding to leaderboard")
    // Add to leaderboard
    setShowPopup(false)
    setLeaderboard(prev => [...prev, { name, email, nick, time: finishedTime }])
  }


  return (
    <div className="game">
        <label htmlFor='wordInput' className='game__phrase' data-phrase={word}>
          { word }
        </label>
        <textarea id="wordInput" ref={inputRef} className={ wordIsWrong ? 'game__input input--error' : 'game__input'} type="text" rows="1" onChange={event => handleOnInput(event)} />
     
        <Popup {...{ time: finishedTime, leaderboard, addToLeaderboard, showPopup, setShowPopup }} />       

        <Stopwatch {...{ isActive: clockRunning, handleDone }} />
    </div>
  )
};


const Stopwatch = ({ isActive, handleDone }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleDone(time)
    setTime(0)
  }, [isActive])

  useEffect(() => {
    let intervalId = null;
    const startTime = Date.now();

    if (isActive) {
      intervalId = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 100);
    } 
    else if (!isActive && time !== 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);

  }, [isActive]);

  return (
      <span className='game__time'>
        { (time / 1000).toFixed(2).replace(".", ":") }
      </span>
  );
}


export default Game;
