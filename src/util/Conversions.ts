export function degreesToRadians(degrees: number): number {
  return (degrees / 360) * 2 * Math.PI
}

export function radiansToDegress(radians: number): number {
  return (radians * 360) / (2 * Math.PI)
}
