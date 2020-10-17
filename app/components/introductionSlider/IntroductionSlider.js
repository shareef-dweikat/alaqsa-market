/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Logo from '../../../assets/logo.svg';
 import GenerateSlide from './utils';
 import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
 import Swipeable from 'react-native-gesture-handler/Swipeable';
// import {
//   WELCOME_TO_NERVATECHS,
//   DISCOVER_YOURSELF_SUBTITLE,
//   GET_TO_KNOW_PEOPLE_SUBTITLE,
//   ANALIZE_YOURSELF_SUBTITLE,
//   CONTACT_SPECILISTS_SUBTITLE,
//   WELCOME_TO_NERVATECHS_SUBTITLE,
//   SKIP,
//   SIGN_UP,
//   NOT_NOW
// } from '../../constants/strings';

class IntroductionSlider extends React.Component {
  state = {
    slide: {},
    count: 1,
    data : [
      {id:0, img:require('../../../assets/intro-slider/firstslide.png'), desc:"أهلا وسهلا بك في تطوير",
      desc2:"يمكنك طلب مشروعك من هنا"},
      //  {id:1, img:require('../../../assets/slider/slide2.png'),
      //  desc:"أهلا وسهلا بك في تطوير",
      // desc2:"يمكنك طلب مشروعك من هنا"},
      // {id:2, img:require('../../../assets/slider/slide3.png'), desc:"أهلا وسهلا بك في تطوير",
      // desc2:"يمكنك طلب مشروعك من هنا"}

      // {id:3, img:require('../../assets/images/slide3.jpg'), desc2:"ANALIZE_YOURSELF_SUBTITLE"},
      // {id:4, img:require('../../assets/images/slide4.jpg'), desc2:"CONTACT_SPECILISTS_SUBTITLE"},
    ],
    mySlider:{}
  };
  componentDidMount() {
    let {data} = this.state
    let mySlider = new GenerateSlide(data);

    this.setState({mySlider, slide:mySlider.getNextSlide()});
   
  }
 
  onSwipeUp(gestureState) {
  
  }
 
  onSwipeDown(gestureState) {

  }
 
  onSwipeLeft(gestureState) {
   console.log(gestureState.dx)
    let {data, mySlider} = this.state
     let slide = mySlider.getPrevSlide()
      console.log(slide)
      if(slide){
     
        if(gestureState.dx <0){
            
          this.setState({slide});
        }
    }
  }
 
  onSwipeRight(gestureState) {
  
     
     let {data, mySlider} = this.state
     let slide = mySlider.getNextSlide()
      console.log(slide)
      if(slide){
     
        if(gestureState.dx >1){
            
          this.setState({slide});
        }
    }
     

  }
  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }
  handleSkip = () => {
    let {data} = this.state
    let mySlider = new GenerateSlide(data);
    let slide = {}
    for(let i = 0 ; i <data.length ; i ++){
      slide = mySlider.getNextSlide();
    }
    this.setState({mySlider, slide});
   
  }
  render() {

      let {data, slide} =this.state
      let {navigation} = this.props
      let dots =[]
      for(let i=0; i<data.length; i++){
        if(slide.id==i){
          dots.push(
          <View
            style={{
              ...styles.circle,
              backgroundColor:'#F0B70E', 
              }}>
          </View>
          );
        }else{
          dots.push(<View style={{...styles.circle}}></View>)
        }
      }

    
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    let screenHeight = Dimensions.get('window').height;
    return (
      <GestureRecognizer
       onSwipe={(direction, state) => this.onSwipe(direction, state)}
      onSwipeUp={(state) => this.onSwipeUp(state)}
      onSwipeDown={(state) => this.onSwipeDown(state)}
      onSwipeLeft={(state) => this.onSwipeLeft(state)}
      onSwipeRight={(state) => this.onSwipeRight(state)}
      config={config}
      style={{
        // flex: 1,
        backgroundColor: this.state.backgroundColor
      }}
      >
       
      <View style={styles.container}>
            
          <Image  source={slide.img} style={{height: '100%'}}  resizeMode='cover' aspectRatio={1}/>
            <View style={{position: 'absolute', height: '100%' ,alignItems: 'center', paddingTop: screenHeight * 0.1}}>
            <Logo  />
           <View style={{marginTop: 32}}>
            <Text style={styles.desc}>{slide.desc}</Text>
            <Text style={styles.desc2}>{slide.desc2}</Text>
          </View>

        <View style={{position: 'absolute', bottom: 10}}>
          <Text style={{color: 'white', fontSize: 16, textAlign: 'center', fontFamily: 'Cairo-Regular'}}>هذا النص هو مثال لنص يمكن أن يستبدل </Text>
          <Text style={{color: 'white', marginBottom: 32, fontSize: 16, textAlign: 'center', fontFamily: 'Cairo-Regular'}}>هذا النص هو مثال لنص يمكن أن  </Text>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')} style={{backgroundColor: '#F0B70E', height: 50, justifyContent: 'center', borderRadius: 10, marginBottom: 16}}>
            <Text style={{textAlign: 'center', fontSize: 18, color: 'white', fontFamily: 'Cairo-Regular'}}>ابدأ مشروعك الأن</Text>
          </TouchableOpacity>
        <View style={styles.circleRowAndSkip}>
          <View style={styles.circleRow}>
              {dots}
          </View>
        </View> 
        </View>
        </View>
      </View>
      </GestureRecognizer>
 

    );
  }
}
const styles = StyleSheet.create({
  img: {
    // height: 300,
    position: 'relative',
    top: '20%',
    height: undefined,
    width: undefined,
    flex: 0.7,
  },
  skipText: {
    color: '#8A8A8A',
    // fontFamily: 'Cairo-Regular',
  },
  imgFirstSlider: {
    //  height: 300,
    height: undefined,
    width: undefined,
    flex: 1,
  },
  signUp: {
    backgroundColor: '#25AE88', 
    alignSelf:'center',
    width: 120,
    marginTop: 8,
    padding: 8,
    paddingRight: 32,
    paddingLeft: 32,
    borderRadius: 20,
  },
  signUpText: {
    color: 'white',
    // fontFamily: 'Cairo-Regular',
  },
  container: {
    width: '100%',
    height: '100%',
    // paddingTop: 200,
    backgroundColor: 'white',

    alignItems: "center",
  },
  desc: {
    textAlign: 'center',
    fontSize: 24, 
    color: 'white',
     fontFamily: 'Cairo-Bold',
  },
  desc2: {
    textAlign: 'center',
    marginTop: 16,
     fontFamily: 'Cairo-Regular',
    color: 'white',
    width: 300
  },
  circle: {
    height: 15,
    width: 15,
    backgroundColor: '#8A8A8A',
    borderRadius: 30,
    marginLeft: 16,
  },
  circleRow: {
    flexDirection: 'row-reverse',
    padding: 8,
    flex: 1,
    justifyContent:'center',
  },
  circleRowAndSkip: {

    flexDirection: 'row',
    // position: 'absolute',
    justifyContent: 'space-between',
  },
  notNow: {
    color: '#25AE88',
    // fontFamily: 'Cairo-Regular',
    textAlign: 'center',
  },
  divider: {
    borderStyle: 'solid',
    borderColor: '#BBB4B7',
    borderWidth: 1,
    margin: 8,
    marginTop: 50,
    width: 330,
  },
});


export default IntroductionSlider;
