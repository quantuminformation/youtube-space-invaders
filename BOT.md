# Bot for Space Invaders

In addition to the main web-based game, an artificial intelligence-based bot is under development to play the Space Invaders game developed by Nikos. This AI uses reinforcement learning - more specifically, an actor-critic method of reinforcement learning - to gradually become better at playing the game after starting with no idea how to play it. The bot is developed using [TensorFlow.js](https://js.tensorflow.org/), a version of the [TensorFlow](https://www.tensorflow.org/) machine learning library developed specifically for use with JavaScript.

# Learning Strategy

I will not delve too deep into the system used for reinforcement learning in this case, as there are many great resources exactly how the actor-critic RL strategy works; I will link to some of these below. Essentially, the "agent" is the main neural network that plays the game. It accepts a game state as input and returns a set of actions as an output. Throughout the playing of the game, data is collected about the current game state and the specific actions that the agent chose in response to that state.

<div style="text-align:center"><img src="https://cdn-images-1.medium.com/max/1024/1*-GfRVLWhcuSYhG25rN0IbA.png" /><br/><br/>*Credit https://cs.wmich.edu/~trenary/files/cs5300/RLBook/node66.html*</div><br/>

Another network, the "critic", analyzes these state-action pairs to learn which actions are best for which situations. It can then predict how well a given action will perform, which can be used to improve the score the actor network through gradient descent or a similar optimization method. Details about the architecture of both networks can be found below.
