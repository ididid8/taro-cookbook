import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import { AtSearchBar, AtTag } from 'taro-ui'
import './index.scss'
import SelectedDish from '../../components/selected_dish/selected_dish'

const HotWord = ['大虾', '酱牛肉', '丸子', '烤肉', '涮羊肉']

export default class Index extends Component <any, any> {
  config: Config = {
    navigationBarTitleText: '爱吃美食',
    navigationBarTextStyle: 'black'
  }

  constructor (props:any) {
    super(props)
    this.state = {
      value: '',
      selectedDishs: [],
      windowWidth: 0,
      windowHeight: 0,
    }
  }

  componentWillMount () {
    // 适配设备，计算屏幕高度
    Taro.getSystemInfo().then((res:any) => {
      const windowWidth = res.windowWidth
      const windowHeight = res.windowHeight
      console.log(windowWidth)
      this.setState({
        windowWidth,
        windowHeight,
      })
    })

    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: 'https://biubiubiubiubiubiu.com/index'
    }).then((res:any) => {
      Taro.hideLoading()
      const selected = res.data.Selected
      console.log(selected)
      this.setState({
        selectedDishs: selected
      })
    })
  }

  onChange (value:any) {
    this.setState({
      value,
    })
  }

  onActionClick () {
    // TODO: 跳转到菜单搜索页面，并且携带参数去
    if (this.state.value) {
      Taro.navigateTo({
        url: `/pages/search/index?menu=${this.state.value}`
      })
    }
  }

  onTagClick (tag:any) {
    console.log(tag)
    // TODO: 跳转到菜单搜索页面，并且带点击关键词
    Taro.navigateTo({
      url: `/pages/search/index?menu=${tag.name}`
    })
  }

  onDishClick (dish: any) {
    const {url} = dish
    const id = url.split('/')[2].split('.')[0]
    console.log(id)
    Taro.navigateTo({
      url: `/pages/cookbook_detail/index?id=${id}`
    })
  }

  render () {
    const {selectedDishs=[]} = this.state
    return (
      <View>
        <View className={'search-bar'}>
          <AtSearchBar
            showActionButton value={this.state.value} onChange={this.onChange.bind(this)} onActionClick={this.onActionClick.bind(this)}
            placeholder={'搜你想吃的'}
          />
        </View>

        <View className={'hot'}>
          <View className={'hot-text'}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                display: 'block',
                marginTop: '30px',
                marginBottom: '20px',
              }}
            >
              — 热门搜索 —
            </Text>
          </View>
          {
            HotWord.map((word:any, index:number) => {
              return (
                <AtTag
                  className={'hot-tag'}
                  key={index}
                  circle={true}
                  onClick={this.onTagClick.bind(this, word)}
                  name={word}
                >
                  {word}
                </AtTag>
              )
            })
          }
        </View>

        <View className={'select'}>
          <View className={'select-text'}>
            <Text
              style={{
                display: 'block',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              — 精选推荐 —
            </Text>
          </View>
          <View className={'select-dish'}>
            {
              selectedDishs.map((dish:any, index:number) => {
                return (
                  <SelectedDish key={index} onDishClick={this.onDishClick.bind(this, dish)} dish={dish} windowWidth={this.state.windowWidth} />

                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
