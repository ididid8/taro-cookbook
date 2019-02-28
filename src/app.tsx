import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/classify/index',
      'pages/dish_detail/index',
      'pages/search/index',
      'pages/cookbook_detail/index',
      // 'pages/collect/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#fff',
      selectedColor: '#000',
      backgroundColor: '#fff',
      borderStyle: 'white',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'asset/images/home.png',
        selectedIconPath: 'asset/images/home_sel.png'
      },{
        pagePath: 'pages/classify/index',
        text: '分类',
        iconPath: 'asset/images/classification.png',
        selectedIconPath: 'asset/images/classification_sel.png'
      }]
      // },{
      //   pagePath: 'pages/collect/index',
      //   text: '收藏',
      //   iconPath: 'asset/images/collectino.png',
      //   selectedIconPath: 'asset/images/collection_sel.png'
      // }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
