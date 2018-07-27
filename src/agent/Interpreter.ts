/**
 * Created by nikos on 27/07/2018.
 */
export class Interpreter {

  constructor () {

  }

  public readPixels () {
    const gameCanvas: HTMLCanvasElement = document.querySelector('#game-canvas') as HTMLCanvasElement
    const miniColourCanvas: HTMLCanvasElement = document.querySelector('#mini-colour-canvas') as HTMLCanvasElement
    const monoCanvas: HTMLCanvasElement = document.querySelector('#mono-canvas') as HTMLCanvasElement

    const miniColourCanvasCtx = miniColourCanvas.getContext('2d')
    miniColourCanvasCtx.drawImage(gameCanvas, 0, 0, 100, 100);

  }
}
