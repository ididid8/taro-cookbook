import Taro, {Component} from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
if (process.env.TARO_ENV === "weapp") {
require("taro-ui/dist/weapp/css/index.css")
} else if (process.env.TARO_ENV === "h5") {
require("taro-ui/dist/h5/css/index.css")
}


export default class CookbokDetail extends Component<any, any> {
  constructor (props:any) {
    super(props)

  }

  render () {
    const {dish} = this.props
    console.log(dish)
    const {Cookbook: cookBookInfo, Step: cookSteps, Ingredients: ingredients} = dish
    cookSteps
    ingredients
    return (
      <View className={'cookbook-detail'}>
        <View className={'cover'}>
          <View className={'cover-img'}>
            <Image src={cookBookInfo.img} style={{width: '750rpx'}} mode={'widthFix'} />
          </View>
          <View className={'cover-title'}>
            <Text style={{display: 'block', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', marginTop: '40rpx', marginBottom: '20rpx'}}>{cookBookInfo.title}</Text>
          </View>
          <View className={'cover-vcnum'}>
            <Text
              style={{
                display: 'block',
                textAlign: 'center',
                fontsize: '10px',
                color: 'rgba(0, 0, 0, 0.3)',
                marginTop: '10rpx',
                marginBottom: '20rpx',
              }}
            >
              {`${cookBookInfo.browse_count}•${cookBookInfo.collect_count}`}
            </Text>
          </View>
          <View className={'cover-intro'}>
            <Text style={{
              display: 'block',
              marginRight: '50rpx',
              marginLeft: '50rpx',
              marginTop: '10rpx',
              marginButtom: '30rpx'
            }}>
              {cookBookInfo.intro}
            </Text>
          </View>
        </View>
        <View className={'ingredients'}>
          <View style={{
            display: 'block',
            fontWeight: 'bold',
            marginTop: '40rpx',
            marginButtom: '30rpx',
            textAlign: 'center'
          }}>
            <Text>— 食材清单 —</Text>
          </View>
            {
              ingredients.map((ingredient:any, index:number) => {
                return (
                  <View key={index} className={'at-row'} style={{
                    marginBottom: '20rpx',
                    paddingBottom: '10rpx',
                    marginTop: '5rpx',
                    width: '650rpx',
                    marginLeft: '50rpx',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.3)'
                  }}>
                    <View className={'at-col at-col-6'}>
                      <Text style={{
                        textAlign: 'left',
                        display: 'block'
                      }}>{ingredient.ingredient}</Text>
                    </View>
                    <View className={'at-col at-col-6'}>
                      <Text style={{
                        textAlign: 'right',
                        display: 'block'
                      }}>{ingredient.weight}</Text>
                    </View>
                  </View>
                )
              })
            }
        </View>
        <View className={'step'}>
          <View className={'step-title'}>
            <Text style={{
              display: 'block',
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: '40rpx',
              marginBottom: '30rpx',
            }}>— 烹饪步骤 —</Text>
          </View>
        </View>
        <View className={'step-list'}>
          {
            cookSteps.map((step:any, index:number) => {
              const {img, step: stepDesc} = step
              const imgList = img.split('/')
              const imgIdList = imgList[imgList.length - 1].split('_')
              imgIdList[0] = '600x450'
              imgList[imgList.length - 1] = imgIdList.join('_')
              const newImg = imgList.join('/')
              const stepDescList = stepDesc.split('\n').slice(1)
              const newStepDesc = (index + 1) + ' ' + stepDescList.join(',')

              return (
                <View key={index} className={'cook-step'}>
                  <View className={'step-img'} style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '20rpx',
                    marginBottom: '20rpx',
                  }}>
                    <Image mode={'widthFix'} style={{
                      width: '630rpx',
                      borderRadius: '10rpx'
                    }} src={newImg} />
                  </View>
                  <View className={'step-desc'} style={{
                    display: 'block',
                    marginRight: '50rpx',
                    marginLeft: '50rpx'
                  }}>
                    <Text>
                      {newStepDesc}
                    </Text>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className={'tips'}>
          <View className={'tips-title'} style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '40px',
            marginBottom: '30px',
            fontWeight: 'bold',
          }}>
            <Text>— 小贴士 —</Text>
          </View>
           <View className={'tips-dest'} style={{
             marginRight: '50rpx',
             marginLeft: '50rpx',
           }}>
            <Text>{cookBookInfo.tip}</Text>
          </View>
        </View>
      </View>
    )
  }
}
