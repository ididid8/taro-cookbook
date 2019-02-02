import Taro, {Component, Config} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import { AtSearchBar, AtTag } from 'taro-ui'
import './index.scss'
import Dish from '../../components/dish/dish'

const HotWord = ['大虾', '酱牛肉', '丸子', '烤肉', '涮羊肉']

const selectWords = ['排骨', '肘子', '汤', '牛肉', '凉菜', '生菜', '寿司', '锅包肉', '豆角', '小鸡']

export default class Index extends Component <any, any> {
  config: Config = {
    navigationBarTitleText: '爱吃美食',
    navigationBarTextStyle: 'black'
  }

  constructor (props:any) {
    super(props)
    this.state = {
      value: '',
      selectDishs: [],
    }
  }

  componentWillMount () {
    let selectDishs = []
    Taro.showLoading({title: '加载中...'})
    selectWords.map((word:any) => {
      Taro.request({
        url: 'https://apis.juhe.cn/cook/query.php',
        data: {
          menu: word,
          key: 'ecf1ede8427c51e926bef642ce307664',
        }
      }).then((res:any) => {
        if (res) {
          const {data:resData={}} = res
          const {result={}} = resData
          const {data=[]} = result
          if (data.length) {
            let dishData = res.data.result.data[0]
            dishData.menu = word
            dishData.pn = 0
            selectDishs = selectDishs.concat(dishData)
          }
        }


        if (selectDishs.length == selectWords.length) {
          Taro.hideLoading()
          this.setState({
            selectDishs
          })
        }
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

  onDishClick (id:any, pn:any, menu:any) {
    Taro.navigateTo({
      url: `/pages/dish_detail/index?id=${id}&pn=${pn}&menu=${menu}`
    })
  }

  render () {
    const {selectDishs=[]} = this.state
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
              selectDishs.map((dish:any, index:number) => {
                return (
                  <Dish data={dish} key={index} onDishClick={this.onDishClick.bind(this, dish.id, dish.pn, dish.menu)} />
                )
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
