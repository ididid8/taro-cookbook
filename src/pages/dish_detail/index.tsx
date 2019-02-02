import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import Dish from '../../components/dish_detail/dish_detail'


export default class DishDetail extends Component<any, any> {

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
    console.log(this.$router.params)
    const {id, pn, menu} = this.$router.params
    Taro.showLoading({title: '加载中...'})
    Taro.request({
      url: 'https://apis.juhe.cn/cook/query.php',
      data: {
        menu: menu,
        key: 'ecf1ede8427c51e926bef642ce307664',
        pn: pn
      }
    }).then((res:any) => {
      Taro.hideLoading()
      const dish = res.data.result.data.filter((dish:any) => dish.id == id)[0]
      this.setState({
        dish
      })
    })
  }

  render () {
    const {dish={}} = this.state
    return (
      <View>
        <Dish dish={dish} onDishClick={this.props.onDishClick} />
      </View>
    )
  }
}
