import React from "react";
import {Link} from 'react-router-dom';

class SplashPage extends React.Component {

  render() {
    return (
      <div>
        {/* <h1>DungeonChat</h1> */}
        <div>
          <div>
            <div>
              <h1>Tabletop RPGs</h1>
              <h1>anytime, anywhere</h1>
            </div>
            <div>
              <img
                src="https://www.dictionary.com/e/wp-content/uploads/2019/06/1000x700-DnD-1.jpg"
                width="220px"
                alt="whatever"
              />
            </div>
          </div>
          <Link id='signup-btn' to={"/signup"}>
            <span>Signup</span>
          </Link>
          <button>Browse Games</button>
        </div>
        <div>
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