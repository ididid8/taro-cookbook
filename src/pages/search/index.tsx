import Taro, { Component, Config } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { AtSearchBar, AtToast } from 'taro-ui'
import './index.scss'
import Dish from '../../components/dish/dish'
import Cookbook from '../../components/cookbook/cookbook'


export default class Index extends Component <any, any> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '菜谱搜索',
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
      menu: '',
      repic: [],
      page: {},
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
    // 填充搜索词
    const {menu} = this.$router.params
    this.setState({menu, value: menu})
    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: `https://biubiubiubiubiubiu.com/search/${menu}`,
    }).then((res:any) => {
      const {Page:page, Repic: repic} = res.data

      Taro.hideLoading()
      this.setState({
        page,
        repic,
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
    this.setState({menu: this.state.value})
    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: `https://biubiubiubiubiubiu.com/search/${this.state.value}`,
    }).then((res:any) => {
      const {Page:page, Repic: repic} = res.data

      Taro.hideLoading()
      this.setState({
        page,
        repic,
      })
    })
  }

  onScrollToLower () {
    const { page } = this.state
    const {current, total} = page
    if (current + 20 > total) {
      this.setState({
        showLowerMessage: true
      })
      return
    }
    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: `https://biubiubiubiubiubiu.com/search/${this.state.value}/${ current + 20}`,
    }).then((res:any) => {
      const {Page:page, Repic: repic} = res.data
      const {repic: curRepic} = this.state

      Taro.hideLoading()
      const newRepic = [...curRepic, ...repic]
      console.log(newRepic)
      this.setState({
        page,
        repic: newRepic,
      })
    })
  }

  onCookbookClick (url:any) {
    const id = url.split('/')[2].split('.')[0]
    Taro.navigateTo({
      url: `/pages/cookbook_detail/index?id=${id}`
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
          this.state.repic.map((cookbook:any, index:number) => <Cookbook cookbook={cookbook} key={index} onCookbookClick={this.onCookbookClick} />)
        }
        <AtToast text={'不能再拉了，到底了！'} isOpened={showLowerMessage} />
      </ScrollView>
    )
  }
}
