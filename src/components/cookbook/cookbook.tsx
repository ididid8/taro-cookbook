import Taro, {Component} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'

if (process.env.TARO_ENV === "weapp") {
require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
require("taro-ui/dist/h5/css/index.css")
}

export default class Cookbook extends Component<any, any> {
  onCookbookClick () {
    console.log(this.props.cookbook)
    this.props.onCookbookClick(this.props.cookbook.url)
  }

  render () {
    const {img, major, title} = this.props.cookbook
    const imgList = img.split('/')
    const imgIdList = imgList[imgList.length - 1].split('_')
    imgIdList[0] = '600x450'
    imgList[imgList.length - 1] = imgIdList.join('_')
    const newImg = imgList.join('/')
    return (
      <View className={'cookbook'} style={{
        marginBottom: '50rpx',
      }} onClick={this.onCookbookClick.bind(this)}>
        <View className='at-row'>
            <View className='at-col at-col-6'>
              <View className={'cookbook-img'}>
                <Image mode={'scaleToFill'} src={newImg} style={{
                  marginLeft: '50rpx',
                  display: 'block',
                  height: '225rpx',
                  width: '300rpx',
                  borderRedius: '20rpx'
                }} />
              </View>
            </View>
            <View className={'at-col at-col-6'} style={{

            }}>
              <View className={'cookbook-title'} style={{
                marginTop: '20rpx',
                marginBottom: '15rpx',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                <Text style={{
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>{title}</Text>
              </View>
              <View className={'cookbook-major'} style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                <Text style={{
                  fontSize: '10px',
                  color: 'rgba(0, 0, 0, 0.5)',
                }}>主料：{major}</Text>
              </View>
            </View>
        </View>
      </View>
    )
  }
}
