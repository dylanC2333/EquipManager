import { toast } from "./message"

const sysInfo = uni.getSystemInfoSync()
export const getScreenWidth = () => {
  return sysInfo.screenWidth
}

export const getScreenHeight = () => {
  return sysInfo.screenHeight
}

export const getContainerHeight = () => {
  return getScreenHeight() - 100
}

export const getScreenWidthRPX = () => {
  return 750 / getScreenWidth()
}

export const lockScreen = () => {
  const c = plus.navigator.getOrientation()
  if (c === 0) {
    plus.screen.lockOrientation('landscape-primary')
  } else if (c === 180) {
    plus.screen.lockOrientation('landscape-secondary')
  } else if (c === -90) {
    plus.screen.lockOrientation('portrait-primary')
  } else {
    plus.screen.lockOrientation('portrait-secondary')
  }
}

export const unlockScreen = () => {
  plus.screen.unlockOrientation()
}

export const rotateScreen = () => {
  const c = plus.navigator.getOrientation()
  if (c === 0) {
    plus.screen.lockOrientation('landscape-primary')
    
    plus.screen.unlockOrientation()
  } else if (c === 180) {
    plus.screen.lockOrientation('landscape-secondary')
    plus.screen.unlockOrientation()
  } else if (c === -90) {
    plus.screen.lockOrientation('portrait-primary')
    plus.screen.unlockOrientation()
  } else {
    plus.screen.lockOrientation('portrait-secondary')
    plus.screen.unlockOrientation()
  }
}
