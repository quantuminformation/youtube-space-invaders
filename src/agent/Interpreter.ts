import { Actions } from "../SpaceInvaders";

var tf = require('@tensorflow/tfjs');

/**
 * This converts the game into a smaller image to be sent to train the agent
 */
export class Interpreter {
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
    return imageData;
  }

  public setupAgent() {
    var data = this.readPixels();
    const agent = {
      'layers': {
        'input': tf.input({shape: [data.width, data.height, 4]}),
        'flatten': tf.layers.flatten(),
        'dense': tf.layers.dense({units: 5, activation: 'sigmoid'}),
        'output': null
      },
      'model': null
    };
    var al = agent.layers;
    al.output = al.dense.apply(
          al.flatten.apply(
                al.input
          )
    );
    agent.model = tf.model({inputs: al.input, outputs: al.output});

    const critic = {
      'layers': {
        'state': tf.input({shape: [data.width, data.height, 4]}),
        'flatten': tf.layers.flatten(),
        'action': tf.input({shape: [5]}),
        'concat': tf.layers.concatenate(),
        'dense': tf.layers.dense({units: 1}),
        'output': null
      },
      'model': null
    };
    var cl = critic.layers;
    cl.output = cl.dense.apply(
          cl.concat.apply([
                cl.flatten.apply(
                      cl.state
                ),
                cl.action
          ])
    );
    critic.model = tf.model({
         inputs: [
               cl.state,
               cl.action
         ],
         outputs: cl.output
    });

    return {
          'agent': agent,
          'critic': critic
    };
  }

  public agentAction(ai) {
    var data = this.readPixels();
    const inputTensor = tf.tensor(Array.from(data.data), [1, data.width, data.height, 4]);
    var prediction = ai.agent.model.predict(inputTensor).dataSync();

    if (prediction[0] > 0.5) {
      const newEvent = new CustomEvent(Actions.MOVE_LEFT);
      document.body.dispatchEvent(newEvent);
    }
    if (prediction[1] > 0.5) {
      const newEvent = new CustomEvent(Actions.MOVE_RIGHT);
      document.body.dispatchEvent(newEvent);
    }
    if (prediction[2] > 0.5) {
      const newEvent = new CustomEvent(Actions.MOVE_UP);
      document.body.dispatchEvent(newEvent);
    }
    if (prediction[3] > 0.5) {
      const newEvent = new CustomEvent(Actions.MOVE_DOWN);
      document.body.dispatchEvent(newEvent);
    }
    if (prediction[4] > 0.5) {
      const newEvent = new CustomEvent(Actions.SHOOT);
      document.body.dispatchEvent(newEvent);
    }
  }
}
