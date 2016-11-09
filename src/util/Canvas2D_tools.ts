import * as GameMath from './Vectors'

export function rotateAndPaintImage ( context, image, angleInDegrees , positionX, positionY, axisX, axisY ) {
  let angleInRadians = GameMath.degreesToRadians(angleInDegrees)
  context.translate( positionX, positionY )
  context.rotate( angleInRadians )
  context.drawImage( image, -axisX, -axisY )
  context.rotate( -angleInRadians )
  context.translate( -positionX, -positionY )
}
