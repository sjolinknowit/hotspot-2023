import {useState, useContext, createContext} from 'react';
import useLocalStorage from "use-local-storage";
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import Game from './components/Game';

import './App.css';
import TreeBench from './assets/parkpixelated.png';
import Cat from './assets/sovandekatt.gif';


function App () {
  const [leaderboard, setLeaderboard] = useLocalStorage ("leaderboard", []);

  return (
    <div className="app">

      <Header />

      <section className="content">

        <div className="content__game">
          <div className="instructions">
            <h2 className="instructions__title">Instruktioner</h2>
            <p className="instructions__text">
              Stava rätt till nedanstående ord så fort som möjligt. Klockan startar samma sekund som du börjar skriva!
            </p>
          </div>
          <Game {...{ leaderboard, setLeaderboard }} />
        </div>

        <div className="content__leaderboard">
          <Leaderboard {...{ leaderboard}} />
        </div>

      </section>

      <div className="footer">
        <img className="footer__treeBench" src={TreeBench} alt="" />
        <img className="footer__cat" src={Cat} alt="" />
        <p className="footer__copyright">© 2023 Knowit Experience</p>

      </div>
    </div>
  );
}

export default App;
