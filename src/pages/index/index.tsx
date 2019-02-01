import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { AtSearchBar, AtToast } from 'taro-ui'
import './index.scss'
import Dish from '../../components/dish/dish'

export default class Index extends Component <any, any> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'black'
  }

  constructor(props:any) {
    super(props)
    this.state = {
      value: '',
      dishData: [],
      curIndex: 0,
      totalNum: 0,
      showLowerMessage: false,
      windowHeight: 0,
    }
  }

  componentWillMount () {
    // 适配设备，计算屏幕高度
    Taro.getSystemInfo().then((res:any) => {
      const windowHeight = res.windowHeight
      console.log(windowHeight)
      this.setState({
        windowHeight
      })
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value:any) {
    this.setState({
      value: value,
    })
  }

  onActionClick () {
    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: 'http://apis.juhe.cn/cook/query.php',
      data: {
        menu: this.state.value,
        key: 'ecf1ede8427c51e926bef642ce307664',
      }
    }).then((res:any) => {
      Taro.hideLoading()
      if (res.data.reason == 'Success') {
        this.setState({
          dishData: res.data.result.data,
          totalNum: res.data.result.totalNum,
          curIndex: 0,
        })
      }
    })
  }

  onScrollToLower () {
    const { totalNum, curIndex } = this.state
    console.log(totalNum, curIndex)
    if (curIndex + 30 >= totalNum) {
      this.setState({
        showLowerMessage: true
      })
      console.log('---------')
      return
    }
    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: 'http://apis.juhe.cn/cook/query.php',
      data: {
        menu: this.state.value,
        key: 'ecf1ede8427c51e926bef642ce307664',
        pn: curIndex + 30
      }
    }).then((res:any) => {
      Taro.hideLoading()
      if (res.data.reason == 'Success') {
        this.setState({
          dishData:  this.state.dishData.concat(res.data.result.data),
          curIndex: curIndex + 30,
        })
      }
    })
  }

  onDishClick (id:any) {
    Taro.navigateTo({
      url: `/pages/dish_detail/index?id=${id}&pn=${this.state.curIndex}&menu=${this.state.value}`
    })
  }

  render () {
    const {showLowerMessage} = this.state
    return (
      <ScrollView
        className='index'
        style={{height: `${this.state.windowHeight}px`}}
        scrollY={true}
        enableBackToTop={true}
        lowerThreshold={10}
        onScrollToLower={this.onScrollToLower.bind(this)}
      >
        <AtSearchBar
          showActionButton value={this.state.value} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)}
          placeholder={'搜你想吃的'}
        />
        {
          this.state.dishData.map((dish:any, index:number) => <Dish data={dish} key={index} onDishClick={this.onDishClick.bind(this, dish.id)} />)
        }
        <AtToast text={'不能再拉了，到底了！'} isOpened={showLowerMessage} />
      </ScrollView>
    )
  }
}
