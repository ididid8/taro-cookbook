import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

if (process.env.TARO_ENV === "weapp") {
require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
require("taro-ui/dist/h5/css/index.css")
}


export default class DishDetail extends Component<any, any> {

  componentWillMount () {
    // 适配设备，计算屏幕高度
    Taro.getSystemInfo().then((res:any) => {
      const ImageWidth = res.windowWidth
      const listWidth = ImageWidth - 60
      const stepWidth = ImageWidth - 60
      console.log(ImageWidth)
      const ImageHeight = Math.floor(ImageWidth / 1.3)
      const stepHeight = Math.floor(stepWidth / 1.3)
      this.setState({
        ImageWidth,
        ImageHeight,
        listWidth,
        stepWidth,
        stepHeight,
      })
    })
  }

  render () {
    const {dish={}} = this.props
    const {ingredients='', burden='', steps=[]} = dish
    const ingredient_list = ingredients.split(',')
    const burdens = burden.split(';')
    return (
      <View>
        <View className={'albums'}>
          <Image src={dish.albums} style={{marginBottom: '25px', width: `${this.state.ImageWidth}px`, height: `${this.state.ImageHeight}px`}} />
        </View>
        <View className={'title'}>
          <Text style={{fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '25px', display: 'block'}}>{dish.title}</Text>
        </View>

        <View className={'ingredients'}>
          <Text style={{fontWeight: 'bold', textAlign: 'center', display: 'block', marginBottom: '20px'}}>—主料—</Text>
          <View className={'at-row'} style={{borderWidth: '0 0 1px 0', borderColor: 'rgba(0, 0, 0, 0.2)', borderStyle: 'solid', width: `${this.state.listWidth}px`, marginLeft: '30px', marginRight: '10px', paddingBottom: '7px', paddingTop: '7px'}}>
            <View className={'at-col at-col-6'}>
              <Text style={{textAlign: 'left', display: 'block'}}>{ingredient_list[0]}</Text>
            </View>
            <View className={'at-col at-col-6'}>
              <Text style={{textAlign: 'right', display: 'block'}}>{ingredient_list[1]}</Text>
            </View>
          </View>
        </View>

        <View className={'burden'}>
          <Text style={{fontWeight: 'bold', textAlign: 'center', display: 'block', marginBottom: '20px', marginTop: '10px'}}>—辅料—</Text>
          {
            burdens.map((burden: any, index: number) => {
              const burden_list = burden.split(',')
              return (
                <View className={'at-row'} style={{borderWidth: '0 0 1px 0', borderColor: 'rgba(0, 0, 0, 0.2)', borderStyle: 'solid', width: `${this.state.listWidth}px`, marginLeft: '30px', marginRight: '10px', paddingBottom: '7px', paddingTop: '7px'}} key={index}>
                  <View className={'at-col at-col-6'}>
                    <Text style={{textAlign: 'left', display: 'block'}}>{burden_list[0]}</Text>
                  </View>
                  <View className={'at-col at-col-6'}>
                    <Text style={{textAlign: 'right', display: 'block'}}>{burden_list[1]}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View>
          <Text style={{marginBottom: '20px', marginTop: '30px', fontWeight: 'bold', textAlign: 'center', display: 'block'}}>—烹饪步骤—</Text>
        </View>
        {
          steps.map((step:any, index:number) => {
            return (
              <View className="step" key={index}>
                <View className="stepImage">
                  <Image src={step.img} style={{width: `${this.state.stepWidth}px`, height: `${this.state.stepHeight}px`, display: 'block', marginLeft: '30px', marginBottom: '10px'}}/>
                </View>
                <View className="stepDesc">
                  <Text style={{marginBottom: '25px', display: 'block', marginRight: '30px', marginLeft: '30px'}}>
                    {step.step}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
