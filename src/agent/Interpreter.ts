import { Actions, SpaceInvaders } from '../SpaceInvaders'

var tf = require('@tensorflow/tfjs')

/**
 * This converts the game into a smaller image to be sent to train the agent
 */
export class Interpreter {
  public static experience: any = []
  public static agentEnabled: boolean = true
  public static loss: any = (pred, label) =>
    pred
      .sub(label)
      .square()
      .mean()
  public static optimizer: any = tf.train.sgd(0.0000001)
  public static agent: any = undefined
  public static critic: any = undefined

  readPixels() {
    const gameCanvas: HTMLCanvasElement = document.querySelector(
      '#game-canvas'
    ) as HTMLCanvasElement
    const miniColourCanvas: HTMLCanvasElement = document.querySelector(
      '#mini-colour-canvas'
    ) as HTMLCanvasElement
    const monoCanvas: HTMLCanvasElement = document.querySelector(
      '#mono-canvas'
    ) as HTMLCanvasElement

    const miniColourCanvasCtx = miniColourCanvas.getContext('2d')
    const monoCanvasCtx = monoCanvas.getContext('2d')

    miniColourCanvasCtx.drawImage(gameCanvas, 0, 0, 100, 100)

    // convert to black and white

    const imageData = miniColourCanvasCtx.getImageData(
      0,
      0,
      miniColourCanvas.width,
      miniColourCanvas.height
    )
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]
      // red
      data[i] = brightness
      // green
      data[i + 1] = brightness
      // blue
      data[i + 2] = brightness
    }

    // overwrite original image
    monoCanvasCtx.putImageData(imageData, 0, 0)
    return imageData
  }

  public setupAgent() {
    // Get data from canvas
    var data = this.readPixels()
    const agent = {
      layers: {
        input: tf.input({ shape: [data.width, data.height, 4] }),
        flatten: tf.layers.flatten(),
        dense: tf.layers.dense({ units: 5, activation: 'sigmoid' }),
        output: null
      },
      model: null
    }
    var al = agent.layers
    // Define data flow
    al.output = al.dense.apply(al.flatten.apply(al.input))
    // Build model
    agent.model = tf.model({ inputs: al.input, outputs: al.output })

    const critic = {
      layers: {
        // Input handling
        state: tf.input({ shape: [data.width, data.height, 4] }),
        // Convolutional and pooling layers
        conv: [],
        // Third pooling layer
        pool3: tf.layers.averagePooling2d({
          poolSize: [2, 2],
          strides: [2, 2]
        }),
        // Flatten game state so it can be combined with agent actions
        flatten: tf.layers.flatten(),
        action: tf.input({ shape: [5] }),
        // Combine inputs
        concat: tf.layers.concatenate(),
        dense: tf.layers.dense({ units: 1 }),
        output: null
      },
      model: null
    }
    var cl = critic.layers
    for (var i = 0; i < 3; i++) {
      cl.conv.push(
        tf.layers.conv2d({
          kernelSize: 5,
          filters: 2 ** (i + 2),
          strides: 1,
          activation: 'relu',
          kernelInitializer: 'VarianceScaling'
        }),
        tf.layers.averagePooling2d({
          poolSize: [2, 2],
          strides: [2, 2]
        })
      )
    }
    var composite = cl.state
    for (var i = cl.conv.length - 1; i >= 0; i--) {
      composite = cl.conv[i].apply(composite)
    }

    // Define data flow
    cl.output = cl.dense.apply(cl.concat.apply([cl.flatten.apply(composite), cl.action]))
    // Create model from input and output layers
    critic.model = tf.model({
      inputs: [cl.state, cl.action],
      outputs: cl.output
    })
    // critic.model.compile({optimizer: 'sgd', loss: 'meanSquaredError'})

    // Add first game to experience replay buffer
    Interpreter.experience.push({
      states: [],
      reward: 0
    })

    // Store object containing actor and critic networks for evaluation
    Interpreter.agent = agent
    Interpreter.critic = critic
  }

  public async agentAction() {
    // Check if agent is enabled
    if (Interpreter.agentEnabled) {
      // Get game state data
      var data = this.readPixels()
      var prediction = tf.tidy(() => {
        // Convert canvas data to a tensor
        const inputTensor = tf.tensor(Array.from(data.data), [1, data.width, data.height, 4])
        // Run prediction using agent model on current game state
        return Interpreter.agent.model.predict(inputTensor).dataSync()
      })

      // Handle actions chosen by the agent
      // Movement controls
      if (prediction[0] > 0.5) {
        const newEvent = new CustomEvent(Actions.MOVE_LEFT)
        document.body.dispatchEvent(newEvent)
      }
      if (prediction[1] > 0.5) {
        const newEvent = new CustomEvent(Actions.MOVE_RIGHT)
        document.body.dispatchEvent(newEvent)
      }
      if (prediction[2] > 0.5) {
        const newEvent = new CustomEvent(Actions.MOVE_UP)
        document.body.dispatchEvent(newEvent)
      }
      if (prediction[3] > 0.5) {
        const newEvent = new CustomEvent(Actions.MOVE_DOWN)
        document.body.dispatchEvent(newEvent)
      }
      // Shoot
      if (prediction[4] > 0.5) {
        const newEvent = new CustomEvent(Actions.SHOOT)
        document.body.dispatchEvent(newEvent)
      }

      // Add state/action pairs to experience replay buffer at random intervals throughout game
      if (Math.random() < 0.01) {
        Interpreter.experience[SpaceInvaders.gameNumber].states.push({
          gameState: Array.from(data.data),
          action: prediction
        })
      }

      // Only begin training after the first game is complete and a total reward value is calculated
      if (Interpreter.experience.length > 1) {
        // Reformat collected data so it can be used for training the critic network
        const criticTrainingData = {
          states: [],
          actions: [],
          rewards: []
        }
        // Loop through all recorded games except for the most recent one (it has not yet been completed and the reward score has not been determined)
        for (var i = 0; i < Interpreter.experience.length - 1; i++) {
          // Loop through each recorded state/action pair from game
          for (var j = 0; j < Interpreter.experience[i].states.length; j++) {
            // Add game states, actions, and rewards to three separate arrays
            criticTrainingData.states.push(Interpreter.experience[i].states[j].gameState)
            criticTrainingData.actions.push(Interpreter.experience[i].states[j].action)
            criticTrainingData.rewards.push(Interpreter.experience[i].reward)
          }
        }

        // Train the critic network
        tf.tidy(() => {
          // Convert recorded experiences (state/action pairs) to TensorFlow.js tensors
          const states = tf.tensor(criticTrainingData.states, [
            criticTrainingData.states.length,
            data.width,
            data.height,
            4
          ])
          const actions = tf.tensor(criticTrainingData.actions)
          const rewards = tf.tensor(criticTrainingData.rewards, [
            criticTrainingData.states.length,
            1
          ])

          // Minimize loss value to fit model to data; model.fit is not used because it is asynchronous and causes errors when executed on a loop
          for (var i = 0; i < 1; i++) {
            Interpreter.optimizer.minimize(() => {
              const error = Interpreter.loss(
                Interpreter.critic.model.predict([states, actions]),
                rewards
              )
              error.print()
              return error
            })
          }
        })
      }
      // Display actions chosen by agent below action test buttons
      for (var i = 0; i < 5; i++) {
        var indicator = document.querySelector('#prob' + (i + 1))
        indicator.innerHTML = prediction[i].toFixed(2)
        // Shade tile blue if action is executed by agent event handler
        if (prediction[i] > 0.5) {
          indicator.setAttribute('style', 'background-color: blue;')
        } else {
          indicator.setAttribute('style', '')
        }
      }
    } else {
      for (var i = 0; i < 5; i++) {
        var indicator = document.querySelector('#prob' + (i + 1))
        indicator.innerHTML = '-'
      }
    }

    // Update game/agent information panel
    document.querySelector('#gamesPlayed').innerHTML =
      SpaceInvaders.gameNumber +
      ' ' +
      (SpaceInvaders.gameNumber == 1 ? 'game' : 'games') +
      ' played'
    document.querySelector('#timeElapsed').innerHTML = SpaceInvaders.totalTime + 'ms elapsed'
    document.querySelector('#statesRecorded').innerHTML =
      Interpreter.experience[SpaceInvaders.gameNumber].states.length + ' states recorded'
  }

  // Handle reinforcement learning events that must be done when a game ends
  public endGame() {
    // Calculate and store reward for game after it has ended
    Interpreter.experience[SpaceInvaders.gameNumber].reward = new Interpreter().reward()
    // Add a new game to the experience replay buffer
    Interpreter.experience.push({
      states: [],
      reward: 0
    })
  }

  // Generate composite reward value after game is complete
  public reward() {
    return SpaceInvaders.score + (SpaceInvaders.totalTime * SpaceInvaders.gameSpeed) / 50000
  }
}
