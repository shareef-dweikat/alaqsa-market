import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SIcon from '../../assets/small-search-icon.svg';
const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    backgroundColor: 'white',
    height: 45,
    justifyContent: 'flex-end',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    flex: 3
  },
  input: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 10,
    marginRight: 8,
  },
});
export default function SearchBox({ value, width="100%", borderWidth=0, borderColor='white', placeholder='' }) {
  return (
    <View style={{...styles.container, borderWidth, borderColor}}>
      <TextInput style={styles.input} placeholder={placeholder} />
      <SIcon />
    </View>
  );
}
