import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Trash from '../images/icons/trash.png';
import {COLORS} from '../helpers/customColor';

const {height, width} = Dimensions.get('window');
export default function CartItem({cart}) {
  const {refresh, setRefresh} = useContext(GlobalContext);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const getCartList = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      if (cartList?.length) {
        setCarts(JSON.parse(cartList));
      }
    };

    getCartList();
  }, [refresh]);

  const increment = async () => {
    if (carts?.length) {
      const selectedItem = carts.find(product => product.name === cart.name);
      if (selectedItem) {
        const selectedIndex = carts.indexOf(selectedItem);
        if (selectedIndex !== null) {
          const newArray = carts;
          newArray[selectedIndex].count = newArray[selectedIndex].count + 1;
          await AsyncStorage.setItem('cartList', JSON.stringify(carts));
          await setRefresh(!refresh);
        }
      }
    }
  };

  const decrement = async () => {
    if (carts?.length) {
      const selectedItem = carts.find(product => product.name === cart.name);
      if (selectedItem) {
        const selectedIndex = carts.indexOf(selectedItem);
        if (selectedIndex !== null) {
          const newArray = carts;
          if (newArray[selectedIndex].count > 0) {
            newArray[selectedIndex].count = newArray[selectedIndex].count - 1;
            await AsyncStorage.setItem('cartList', JSON.stringify(carts));
            await setRefresh(!refresh);
          }
        }
      }
    }
  };

  const deleteItem = async () => {
    if (carts?.length) {
      const newArray = carts.filter(product => product.name !== cart.name);
      await setCarts(newArray);
      await AsyncStorage.setItem('cartList', JSON.stringify(newArray));
      await setRefresh(!refresh);
    }
  };
  return (
    <View style={styles.card}>
      <Image source={cart.image} style={styles.image} />

      <View style={styles.info}>
        <View>
          <View>
            <Text style={styles.name}>{cart.name}</Text>

            <Text style={styles.description}>{cart.description}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{cart.price * cart.count}$</Text>

            <TouchableOpacity onPress={() => deleteItem()}>
              <Image source={Trash} style={styles.trash} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>В КОРЗИНУ</Text>
            </View>

            <View style={styles.countContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (cart.count > 1) {
                    decrement();
                  }
                }}>
                <Text style={styles.action}>-</Text>
              </TouchableOpacity>

              <Text style={styles.count}>{cart?.count}</Text>

              <TouchableOpacity onPress={() => increment()}>
                <Text style={styles.action}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    borderRadius: 12,
    width: '100%',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: COLORS.borderColor,
  },
  info: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 3,
  },
  image: {
    height: 150,
    width: width * 0.45,
    borderRadius: 8,
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
  trash: {
    width: 20,
    height: 24,
    marginLeft: 10,
  },
  plus: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  minus: {
    width: 25,
    height: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priceContainer: {
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.4,
    paddingTop: 5,
  },
  countContainer: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.borderColor,
    flexDirection: 'row',
    backgroundColor: COLORS.borderColor,
    marginLeft: 3,
  },
  action: {
    fontFamily: 'Montserrat-ExtraBold',
    fontWeight: '900',
    color: COLORS.white,
  },
  count: {
    fontFamily: 'Montserrat-ExtraBold',
    fontWeight: '900',
    color: COLORS.white,
    marginHorizontal: 15,
  },
  button: {
    borderRadius: 8,
    backgroundColor: COLORS.main,
    width: width * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '700',
  },
});
