import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Burger from '../images/icons/hamburger.png';
import Cart from '../images/icons/cart.png';
import Logo from '../images/icons/xbet-logo.png';
import {COLORS} from '../helpers/customColor';
import {producs} from '../products/producs';
import Card from '../components/Card';

const {height, width} = Dimensions.get('window');
export default function Main() {
  const navigation = useNavigation();
  const [category, setCategory] = useState(0);
  return (
    <SafeAreaView>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={Burger} style={styles.burger} />
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image source={Cart} style={styles.cart} />
        </TouchableOpacity>
      </View>

      <View style={styles.categories}>
        <TouchableOpacity
          onPress={() => setCategory(0)}
          style={!category ? styles.active : styles.category}>
          <Text style={!category ? styles.activeText : styles.categoryText}>
            Закуски и {'\n'} Первые блюда
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategory(1)}
          style={category === 1 ? styles.active : styles.category}>
          <Text
            style={category === 1 ? styles.activeText : styles.categoryText}>
            Первые {'\n'} Блюда
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategory(2)}
          style={category === 2 ? styles.active : styles.category}>
          <Text
            style={category === 2 ? styles.activeText : styles.categoryText}>
            Закуски
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategory(3)}
          style={category === 3 ? styles.active : styles.category}>
          <Text
            style={category === 3 ? styles.activeText : styles.categoryText}>
            Десерты
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {producs[category].map((item, index) => (
          <Card item={item} key={item.name} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.main,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  burger: {
    width: 30,
    height: 25,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  cart: {
    width: 28,
    height: 30,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  logo: {
    width: 200,
    height: 40,
    aspectRatio: 3.5,
    resizeMode: 'contain',
  },
  categories: {
    width: width,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: height / 2,
  },
  category: {
    marginTop: 8,
    position: 'relative',
    borderWidth: 2,
    borderColor: COLORS.borderColor,
    borderRadius: 8,
    height: 60,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: width * 0.43,
    height: 120,
    borderRadius: 18,
  },
  active: {
    marginTop: 8,
    position: 'relative',
    borderWidth: 2,
    borderColor: COLORS.borderColor,
    borderRadius: 8,
    height: 60,
    width: '49%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.borderColor,
  },
  categoryText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '800',
  },
  activeText: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '800',
  },
});
