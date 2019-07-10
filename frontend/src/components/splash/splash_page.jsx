import React from "react";
import {Link} from 'react-router-dom';

class SplashPage extends React.Component {

  render() {
    return (
      <div className='splash-wrapper'>
        <div className='hero-wrapper'>
          <img className='hero-background' src="https://i.imgur.com/aBKrTWU.gif" alt="heroes!" />
          <div className='hero-top'>
            <div className='hero-left'>
              <h1>Play with friends</h1>
              <p>anytime, anywhere</p>
            </div>
            <div className='hero-right'>
              <img
                src="https://i.imgur.com/6D1DDnB.png"
                width="150px"
                alt="whatever"
              />
            </div>
          </div>
          <div className='hero-bottom'>
            <Link id='signup-btn' to={"/signup"}>
              <span>Signup</span>
            </Link>
            <Link id='browse-btn' to={"/games"}>
              <span>Browse Games</span>
            </Link>
          </div>
        </div>
        <div className='splash-main'>
          <div>
            <div>
              <img
                src="https://www.dictionary.com/e/wp-content/uploads/2019/06/1000x700-DnD-1.jpg"
                width="300px"
                alt="whatever"
              />
              <div>
                <h2>A platform to play by chat</h2>
                Tones, dice rolls, character sheets and more in a straight
                forward chat application.
              </div>
            </div>
            <div>
              <div>
                <div>
                  <img
                    src="https://www.dictionary.com/e/wp-content/uploads/2019/06/1000x700-DnD-1.jpg"
                    width="300px"
                    alt="whatever"
                  />
                  <div>Beginner Friendly Community</div>
                  No experience with Role Playing? No problem. Find a public
                  game with the "Beginner Friendly" tag and hop in!
                </div>
                <Link id='signup-btn' to={"/signup"}>
                  <span>Join Dungeon Chat</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer>Copyright &copy; 2019 Turd Burglers</footer>
      </div>
    );
  }
};

export default SplashPage;