import React from "react";
import {Link} from 'react-router-dom';
import splash_die_glow from "../../assets/public/images/splash-die-glow.png";

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
              <img className="hero-die bobbing spin"
                src={ splash_die_glow }
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
            <div className='splash-primary'>
              <img
                className='primary-img'
                src="https://static.wixstatic.com/media/1c4207_585a5631024c4d9ca265167ca286edb7~mv2_d_5100_3300_s_4_2.jpg/v1/fill/w_1119,h_724,al_c,q_90,usm_0.66_1.00_0.01/1c4207_585a5631024c4d9ca265167ca286edb7~mv2_d_5100_3300_s_4_2.webp"
                width="300px"
                alt="whatever"
              />
              <div className='primary-body'>
                <h2>A platform to play by chat</h2>
                <p>
                  Tones, dice rolls, character sheets and more in a straight
                  forward chat application.
                </p>
              </div>
            </div>
            <div className='secondary-wrapper'>
              <div className='splash-secondary'>
                <div className='secondary-body'>
                  <h2>Beginner Friendly Community</h2>
                  <p>
                    No experience with Role Playing? No problem. Find a public
                    game with the "Beginner Friendly" tag and hop in!
                  </p>
                </div>
                <img
                  className='secondary-img'
                  src="https://ksr-ugc.imgix.net/assets/018/871/460/a8235dd1ee5921d2d618e7c8f19fd8ee_original.png?ixlib=rb-2.1.0&w=680&fit=max&v=1508727446&auto=format&gif-q=50&lossless=true&s=9caf0118c751b207e471e927ad659f24"
                  width="300px"
                  alt="whatever"
                />
              </div>
              <Link id='join-btn' to={"/signup"}>
                <span>Join Dungeon Chat</span>
              </Link>
            </div>
        </div>

        <footer>
          <span>
            Image credits: Randall Hampton
          </span>
          <span>
            Copyright &copy; 2019 aA DungeonMasters
          </span>
        </footer>
      </div>
    );
  }
};

export default SplashPage;