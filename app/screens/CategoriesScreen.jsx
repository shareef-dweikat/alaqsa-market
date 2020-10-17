import IntroductionSlider from '../components/introductionSlider/IntroductionSlider';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import DrawerIcon from '../../assets/drawer-icon.svg';
import ListViewIcon from '../../assets/list-view.svg';
import GridViewIcon from '../../assets/grid-view.svg';
import SIcon from '../../assets/small-search-icon.svg';
import VerticalItemCard from '../components/VerticalItemCard';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/colors';
import SearchBox from '../components/SearchBox';
import HorizontalItemCard from '../components/HorizontalItemCard';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
export default function CategoriesScreen() {
  // const image = { uri: '../../assets/signin-screen/background.png' };

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            marginHorizontal: 8,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <ListViewIcon
            color={Colors.ACTIVE_VIEW_TAP}
            style={{ marginRight: 8 }}
          />
          <GridViewIcon color={Colors.INACTIVE_VIEW_TAP} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderColor: Colors.BORDER_COLOR,
            borderWidth: 1,
            flex: 3,
            paddingHorizontal: 8,
            borderRadius: 10,
            height: 35,
          }}
        >
          <TextInput style={{ marginRight: 8 }} placeholder='بحث' />
          <SIcon />
        </View>
        <TouchableOpacity
          style={{ marginLeft: 8, flex: 1 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <DrawerIcon />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ maxHeight: 60, marginRight: 16 }} horizontal>
        <Card backgroundColor={Colors.LIGTH_BACKGROUND_COLOR} name='لحم' />
        <Card backgroundColor={Colors.LIGTH_BACKGROUND_COLOR} name='لحم' />
        <Card backgroundColor={Colors.LIGTH_BACKGROUND_COLOR} name='لحم' />
        <Card backgroundColor={Colors.LIGTH_BACKGROUND_COLOR} name='لحم' />
        <Card
          backgroundColor={Colors.GOLDEN}
          color={Colors.WHITE}
          name='الكل'
        />
      </ScrollView>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <VerticalItemCard />
        {/* <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <HorizontalItemCard />
          <HorizontalItemCard />
          <HorizontalItemCard />
          <HorizontalItemCard />
          <HorizontalItemCard />
          <HorizontalItemCard />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Card({ name, backgroundColor, color = 'black' }) {
  // const image = { uri: '../../assets/signin-screen/background.png' };

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        width: 100,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginHorizontal: 4,
      }}
    >
      <Text style={{ color: color, fontFamily: 'Tajawal-Medium' }}>{name}</Text>
    </View>
  );
}
