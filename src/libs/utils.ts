export function isMobileDevice(): boolean {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator?.userAgent) ||
    window.innerWidth < 600
  );
}

export class NoMetamaskError extends Error {
  code: number
  constructor() {
    super()
    this.code = 0
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NoMetamaskError.prototype)
  }
}