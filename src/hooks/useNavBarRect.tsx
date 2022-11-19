import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'

export default function useNavBarRect() {
  const [initMenu, setInitMenu] = useState(1)
  // 导航栏高度
  const [navBarHeight, setNavBarHeight] = useState(0)

  // 右侧胶囊距离顶部距离
  const [menuDistance, setMenuDistance] = useState(0)

  // 右侧胶囊距离右侧距离，以此计算左侧距离，使左右一致
  const [menuRight, setMenuRight] = useState(0)

  // 胶囊高度
  const [menuHeight, setMenuHeight] = useState(0)

  const initNavBar = () => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync()

    // 获取胶囊按钮信息
    const menuInfo = Taro.getMenuButtonBoundingClientRect()

    // 设置导航栏高度
    setNavBarHeight((menuInfo.top - systemInfo.statusBarHeight!) * 2 + menuInfo.height + systemInfo.statusBarHeight!)

    setMenuDistance(menuInfo.top);
    setMenuRight(systemInfo.screenWidth - menuInfo.right)
    setMenuHeight(menuInfo.height)

    setInitMenu(2)
  }

  useEffect(() => {
    if (process.env.TARO_ENV === 'weapp') {
      initNavBar()
    }
  }, [])

  return {
    navBarHeight,
    menuDistance,
    menuRight,
    menuHeight,
    initMenu
  }
}
