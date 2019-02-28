import Taro, {Component} from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

export default class SelectedDish extends Component <any, any> {

  onDishClick (data:any) {
    this.props.onDishClick(data)
  }

  render() {
    const {dish} = this.props
    // 替换img中的大小参数，图片更加清晰
    const imgList = dish.img.split('/')
    const imgId = imgList[imgList.length - 1]
    const imgIdList = imgId.split('_')
    imgIdList[0] = '600x450'
    imgList[imgList.length - 1] = imgIdList.join('_')
    const img = imgList.join('/')


    return (
      <View onClick={this.onDishClick.bind(this, dish)} className={'selected_dish'}>
        <View
          className={'dish_image'}
          style={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          <Image mode={'widthFix'} style={{width: '630rpx', borderRadius: '10rpx'}} src={img} />
        </View>
        <View
          className={'dish_title'}
          style={{
            display: 'block',
            marginLeft: `60rpx`,
            fontWeight: 'bold',
            marginTop: '5rpx',
            marginBottom: '20rpx'
          }}
        >
          <Text>{dish.title}</Text>
        </View>
      </View>
    )
  }
}
