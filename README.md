# DungeonChat
DungeonChat is an online platform for tabletop DnD-esque games.

Live Project: [Unavailable](unavailable "not yet available")

Maybe you're interested in starting an exciting but lengthy campaign with friends, or maybe you're looking to get into tabletop games but don't know where to start, don't have friends to play with, or simply don't have a schedule that makes meeting up with friends possible.  

Enter DungeonChat, an online gaming platform that allows you to create and play your very own campaigns asynchronously, whenever and wherever you want, all online.

DungeonChat gives DM's the ability to create their own unique campaigns/stories while characters can join and play along via a shared chat/channel.  Functionality is built into the chat to roll dice and make decisions about the campaign direction, express character exposition, and even chat with spectators viewing the game.

# Project Team
* Brad Barnes
* Josh Burnwatt
* Steven Terry
* Mike Warner

# Functionality and MVP
## User Authentication
* Users can create accounts, login, and logout
* User demo account and functionality
* Protected/Auth routes to ensure user login

## Games
* Users can create new games
* Users can join an existing game
* Game 'templates' are provided to assist user in creating a game
* Users can browse games from the landing page once signed in

## Chat
* Each game instance will have a chat component
* The chat keeps track of the history of the game, and allows the users to declare their actions and roll the dice to determine the outcome
* Each game chat shows the current players in the game (with a link to the character show page)
* Spectators are allowed to view the game, but are unable to participate
* Game creators will have additional functionality to add acts/chapters/scenes as the Game Master

## Characters
* Each user will have a character per game
* Each character will have a show page to allow users to view the character's stats

## Search
* Users can search for games by title

# Work Breakdown
## July 8 (**all**)
* [x] Develop Project Proposal (**Group**)
* [x] Determine initial schema/routes (**Group**)
* [x] Project Setup (**Steven**)
   * [x] MongoDB
   * [x] Nodes
   * [x] server/webpack
* [x] Backend User Auth  (**Steven**)
* [x] Determine individual tasks for coming days (**Group**)

## July 9
* [x] Finalize schema (**Group**)
* [ ] Setup initial branching(**Group**)
* [ ] Splash Page frontend/styling (**Brad/Josh**)
* [ ] Campaign Backend/Landing Page (**Michael/Steven**)


## July 10
* [ ] Campaigns backend/routes 
* [ ] Chat backend/routes


## July 11
* [ ] Setup Frontend Components

## July 12
* [ ] Styling

## Weekend
* [ ] Catchup

# Technologies Used
* MongoDB
* Express
* React
* Node.js

# Technological Challenges
* Using git branches with team
