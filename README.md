# GreedyPig

GreedyPig is an innovative dice and roulette game designed to test the limits of a player's greed. The game offers a unique blend of traditional and blockchain gaming experiences, allowing users to play both off-chain and on-chain. Additionally, GreedyPig provides options for playing with and without staking, catering to a wide range of player preferences.

## Key Features

- **Dual Gameplay Modes**: Players can choose between off-chain and on-chain gameplay, providing flexibility and accessibility for different types of users.
- **Staking Options**: GreedyPig supports both staking and non-staking modes, allowing players to decide the level of risk and reward they are comfortable with.
- **Greed Testing**: The core gameplay mechanics revolve around testing how greedy players are, adding a psychological layer to the game.

## Review of the Current State of the App

### **Current Working Implementation**
- Users can create games and join the game.
- Users can participate with their social login.
- Users can see their past games created and joined.
- Participants can play the game.
- Participants can see their leaderboard.

### **Issues with the Current Implementation (Bugs)**
- **Leaderboard Overflow**: Once the leaderboard exceeds a certain number of users, it overflows.
- **Turn-Based Play Issue**: Active players were, at times, unable to play, receiving a "not your turn" message. (A possible solution is to replace local storage handling.)
- **Scalability Issues**: When too many players participate, the game flow becomes impractical as each player must wait for their turn. (The design and play flow need improvement.)

## Possible Improvements

- **Enhanced Design Flow**: Make the design more similar to Kahoot, enabling more players to participate simultaneously. (A possible solution could also include reducing the number of players per session.)
- **UI Enhancements**: Improve the UI to make it more gamified and engaging.
- **Comprehensive Feature Representation**: Ensure the game website clearly captures all three main features—on-chain, off-chain, and staking (both on-chain and off-chain staking and non-staking options).
- **Elimination Mechanism**: Introduce an elimination system after three rounds to reduce the number of active players and maintain engagement.
- **Single-Player Mode**: Allow players to play against a computer without requiring other participants. (This mode would not support staking.)

