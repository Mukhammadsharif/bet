import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GlobalContext} from '../contexts/GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from '../helpers/customColor';

const {width, height} = Dimensions.get('window');
export default function Card({item}) {
  const {refresh, setRefresh} = useContext(GlobalContext);
  const [added, setAdded] = useState(false);
  const add = async product => {
    const cartList = await AsyncStorage.getItem('cartList');
    if (cartList) {
      const cartArray = JSON.parse(cartList);
      const existProduct = cartArray.find(cart => cart.name === product.name);
      if (!existProduct) {
        cartArray.push(product);
        await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
      }
    } else {
      const cartArray = [];
      cartArray.push(product);
      await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    }
    await setRefresh(!refresh);
  };

  const trash = async product => {
    const cartList = await AsyncStorage.getItem('cartList');
    if (cartList) {
      const cartArray = JSON.parse(cartList);
      const existProduct = cartArray.find(cart => cart.name === product.name);
      if (existProduct) {
        const newArray = cartArray.filter(cart => cart.name !== product.name);
        await AsyncStorage.setItem('cartList', JSON.stringify(newArray));
      }
    }
    await setRefresh(!refresh);
  };

  const define = async product => {
    const cartList = await AsyncStorage.getItem('cartList');
    if (cartList) {
      const cartArray = JSON.parse(cartList);
      const existProduct = cartArray.find(cart => cart.name === product.name);
      if (existProduct) {
        trash(product);
      } else {
        add(product);
      }
    } else {
      add(product);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      if (cartList) {
        const cartArray = JSON.parse(cartList);
        const existProduct = cartArray.find(cart => cart.name === item.name);
        if (existProduct) {
          setAdded(true);
        } else {
          setAdded(false);
        }
      } else {
        setAdded(false);
      }
    };

    getProduct();
  }, [refresh]);
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.rightContainer}>
        <View>
          <Text style={styles.name}>{item.name}</Text>

          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price}$</Text>
          </View>

          {added ? (
            <TouchableOpacity style={styles.addedButton}>
              <Text style={styles.buttonText}>ДОБАВЛЕНО</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => define(item)}>
              <Text style={styles.buttonText}>В КОРЗИНУ</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: COLORS.borderColor,
  },
  image: {
    height: 150,
    width: width * 0.45,
    borderRadius: 8,
  },
  rightContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 3,
  },
  name: {
    color: COLORS.black,
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 14,
    width: width * 0.4,
  },
  description: {
    color: COLORS.black,
    fontFamily: 'Montserrat-Light',
    fontWeight: '200',
    fontSize: 10,
    paddingTop: 3,
    height: 30,
    width: width * 0.35,
  },
  price: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 16,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'column',
    marginTop: 5,
  },
  button: {
    borderRadius: 8,
    backgroundColor: COLORS.main,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '700',
  },
  priceContainer: {
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  addedButton: {
    borderRadius: 8,
    backgroundColor: COLORS.main,
    width: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
});
