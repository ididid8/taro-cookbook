import Taro, {Component, Config} from '@tarojs/taro'
import {View} from '@tarojs/components'
import CookBook from  '../../components/cookbook_detail/cookbook_detail'

export default class CookbokDetail extends Component <any, any> {
  config: Config = {
    navigationBarTitleText: '菜谱详情',
    navigationBarTextStyle: 'black'
  }

  constructor (props:any) {
    super(props)
    this.state = {
      dish: {}
    }
  }

  componentWillMount () {
    // 发起请求，获取详情数据
    const {id} = this.$router.params
    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: `https://biubiubiubiubiubiu.com/cookbook/${id}`
    }).then((res:any) => {
      Taro.hideLoading()
      this.setState({
        dish: res.data
      })
    })
  }

  render () {
    return (
      <View>
        <CookBook dish={this.state.dish} />
      </View>

    )
  }
}
