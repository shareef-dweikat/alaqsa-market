import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { useSelector } from 'react-redux';
import HeartIcon from '../../assets/small-heart-icon-vertical.svg';
import HeartIconA from '../../assets/small-heart-empty-icon-vertical.svg';

// import HeartEmptyIcon from '../../assets/small-heart-empty-icon.svg';
import PlusIcon from '../../assets/plus-icon-for-vertical.svg';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: { textAlign: 'right', fontFamily: 'Tajawal-Medium' },
  nameContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    justifyContent: 'space-between',
  },
  nameAndFavContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
export default function VerticalItemCard({
  name,
  price,
  desc,
  isFavHeartAvailable = true,
  image,
  onPress,
  add,
  addToFav,
  deleteFromFav,
  product,
  phone,
}) {
  const [isFav, setIsFav] = useState(false);
  const user = useSelector((state) => state.auth.userType);
  console.log(image,name, "imageeeeeee")
  const handleFav = async () => {
    if (!user) return
    const x = await AsyncStorage.getItem(product.firebaseId);
    if (x) {
       deleteFromFav();
    } else {
      AsyncStorage.setItem(product.firebaseId, product.firebaseId);
      setIsFav(true);
      addToFav(product, phone);
    }
  };
  useEffect(() => {
    const getProductId = async () => {
      const x = await AsyncStorage.getItem(product.firebaseId);
      if (x) {
        setIsFav(true);
      }
    };
     getProductId();
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        height: 90,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1 }}>
        {isFavHeartAvailable && (
          <View style={styles.nameAndFavContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {isFav ? (
                <TouchableOpacity
                  style={{ marginRight: 8 }}
                  onPress={() => handleFav()}
                >
                  <HeartIcon color='red' />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ marginRight: 8 }}
                  onPress={() => handleFav()}
                >
                  <HeartIconA />
                  {/* <image source={HeartEmptyIcon} /> */}
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={add}>
                <PlusIcon  />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{name}</Text>
          </View>
        )}
        {!isFavHeartAvailable && (
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{name}</Text>
          </View>
        )}
        <View
          style={{
            justifyContent: 'flex-end',
            width: '100%',
            paddingHorizontal: 16,
            // height: 30
          }}
        >
          <Text
            style={{
              color: '#B8B8CD',
              textAlign: 'right',
              fontFamily: 'Tajawal-Regular',
            }}
          >
            {desc}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 16,
            marginBottom: 8,
          }}
        >
          <Text
            style={{
              textAlign: 'right',
              fontFamily: 'Tajawal-Bold',
              color: '#515462',
            }}
          >
            {price} شيكل
          </Text>
        </View>
      </View>
      <Image
        style={{ width: 100, height: 80, marginRight: 8, borderRadius: 5 }}
        // resizeMode='contain'
        source={{ uri: image }}
      />
    </TouchableOpacity>
  );
}
