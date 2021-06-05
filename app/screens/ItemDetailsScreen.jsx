import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import RightArrow from '../../assets/right-arrow.svg';
import { StatusBar } from 'expo-status-bar';
import VerticalItemDetailsCard from '../components/VerticalItemDetailsCard';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  image: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'flex-end',
    height: Dimensions.get('window').height * 0.15,
  },
});
export default function ItemDetailsScreen({ route, navigation }) {
  const product = route.params.item ? route.params.item : route.params.product;
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      {/* <StatusBar backgroundColor={Colors.BACKGROUND} barStyle='light-conten' /> */}
      <View style={styles.image}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <RightArrow />
        </TouchableOpacity>
        <View style={{ width: '100%' }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: 'Tajawal-Medium',
              color: 'white',
            }}
          >
            التفاصيل
          </Text>
        </View>
      </View>
      <VerticalItemDetailsCard product={product} navigation={navigation} />
    </SafeAreaView>
  );
}
