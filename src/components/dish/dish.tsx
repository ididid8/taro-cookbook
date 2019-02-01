import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtTag } from 'taro-ui'

if (process.env.TARO_ENV === "weapp") {
require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
require("taro-ui/dist/h5/css/index.css")
}

export default class Dish extends Component <any, any> {
  onDishClick (data:any) {
    this.props.onDishClick(data)
  }

  render () {
    const {data={}} = this.props
    const {albums, tags='', title} = data
    return (
      <View className='at-row' onClick={this.onDishClick.bind(this, data)}>
        <View className='at-col at-col-5' style={{display: 'flex'}}>
          <Image style={{height: '100px', margin: '10px'}} src={albums} mode={'aspectFit'} />
        </View>
        <View className='at-col at-col-7'>
          <View>
            <Text style={{display: 'block', marginTop: '20px', fontSize: '18px', fontWeight: 'bold'}}>{title}</Text>
          </View>
          <View style={{display: 'flex', flexWrap: 'wrap'}}>
            {
              tags.split(';').slice(0, 10).map((tag:any, index:number) => <AtTag size={'small'} circle key={index}>{tag}</AtTag>)
            }
          </View>
        </View>
      </View>
    )
  }
}
