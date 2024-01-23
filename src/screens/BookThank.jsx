import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Burger from '../images/icons/hamburger.png';
import Cart from '../images/icons/cart.png';
import Logo from '../images/icons/xbet-logo.png';
import {COLORS} from '../helpers/customColor';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import HappyIcon from '../images/icons/happy.png';

const {height, width} = Dimensions.get('window');

export default function BookThank() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={Burger} style={styles.burger} />
        </TouchableOpacity>

        <Image source={Logo} style={styles.logo} />

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image source={Cart} style={styles.parcel} />
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Спасибо за {'\n'} резерв!</Text>

        <Image source={HappyIcon} style={styles.smile} />
      </View>

      <View style={styles.qrContainer}>
        {/*<Image source={Smile} style={styles.smile} />*/}
      </View>

      <CustomButton
        text={'НА ГЛАВНУЮ'}
        onPress={() => navigation.navigate('Main')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logo: {
    width: 200,
    height: 40,
    aspectRatio: 3.5,
    resizeMode: 'contain',
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
  parcel: {
    width: 28,
    height: 30,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: height / 6,
    backgroundColor: COLORS.logoBackgroundColor,
    marginTop: height / 10,
  },
  drawerLogo: {
    aspectRatio: 1.8,
    resizeMode: 'contain',
  },
  qrContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  textContainer: {
    width: '100%',
    paddingVertical: 15,
    marginTop: 100,
    marginBottom: 50,
  },
  text: {
    textAlign: 'center',
    color: COLORS.main,
    fontFamily: 'Montserrat-ExtraBold',
    fontWeight: '900',
    fontSize: 30,
  },
  smile: {
    aspectRatio: 1,
    height: 200,
    alignSelf: 'center',
    marginTop: 40,
  },
});
