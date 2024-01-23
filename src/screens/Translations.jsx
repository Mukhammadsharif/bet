import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
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

export default function Translations() {
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
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>NHL</Text>
              </View>
            </View>

            <View style={{width: '65%'}}>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>25.02 00:05</Text>
              </View>
              <View style={styles.texts}>
                <Text style={styles.text}>Montreal Canadiens</Text>
                <Text style={styles.text}>Toronto Maple Leafs</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>NFL</Text>
              </View>
            </View>

            <View style={{width: '65%'}}>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>28.02 23:00</Text>
              </View>
              <View style={styles.texts}>
                <Text style={styles.text}>Green Bay Packers</Text>
                <Text style={styles.text}>Chicago Bears</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>MLB</Text>
              </View>
            </View>

            <View style={{width: '65%'}}>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>07.03 00:10</Text>
              </View>
              <View style={styles.texts}>
                <Text style={styles.text}>Los Angeles Dodgers</Text>
                <Text style={styles.text}>San Francisco Giants</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>NHL</Text>
              </View>
            </View>

            <View style={{width: '65%'}}>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>10.03 02:00</Text>
              </View>
              <View style={styles.texts}>
                <Text style={styles.text}>Boston Bruins</Text>
                <Text style={styles.text}>New York Rangers</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        text={'НА ГЛАВНУЮ'.toUpperCase()}
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
  main: {
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  titleContainer: {
    width: 150,
    marginTop: 12,
  },
  title: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 50,
    color: COLORS.main,
  },
  card: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  timeContainer: {
    borderRadius: 12,
    marginBottom: 5,
  },
  time: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 15,
    color: COLORS.main,
    textAlign: 'left',
    marginLeft: 20,
  },
  texts: {
    marginLeft: 10,
    borderWidth: 1.5,
    borderColor: COLORS.main,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: COLORS.black,
    marginTop: 2,
    letterSpacing: 1.2,
  },
});
