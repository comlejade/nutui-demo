import useNavBarRect from "../../hooks/useNavBarRect"
import { NavBar } from "@nutui/nutui-react-taro"
import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { FC, ReactNode } from "react"

import styles from './nav.module.scss'

interface IProps {
  title: string;
  children: ReactNode;
}

const AppNav: FC<IProps> = (props) => {

  const { title, children } = props

  const { navBarHeight, menuDistance, menuHeight } = useNavBarRect()

  return (
    <View className={styles.container}>
      {
        process.env.TARO_ENV === 'weapp' && 
        <View className={styles.nav} style={{height: `${navBarHeight}px`, paddingTop: `${menuDistance}px`}}>
          <NavBar leftShow title={title} onClickBack={() => Taro.navigateBack()} style={{height: `${menuHeight}px`, boxShadow: 'none', padding: '0 16px', marginBottom: 0}} />
        </View>
      }
      {
        process.env.TARO_ENV === 'h5' &&
        <NavBar leftShow title={title} onClickBack={() => Taro.navigateBack()} />
      }
      {/* <View className={styles.content}> */}
        {children}
      {/* </View> */}
    </View>
  )
}

export default AppNav
