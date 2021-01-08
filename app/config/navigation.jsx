import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Bill from '../../assets/bill.svg';
import Modal from '../screens/Modal';
import HomeIcon from '../../assets/home-icon.svg';
import CartIcon from '../../assets/cart.svg';
import ProfileScreen from '../screens/ProfileScreen';
// import IntroductionScreen from '../screens/IntroductionScreen';
// import ContactDetails from '../screens/ContactDetails';
import HomeScreen from '../screens/HomeScreen';
import Alert from '../screens/Alert';
import CartScreen from '../screens/CartScreen';
import ProfileIcon from '../../assets/profile-icon.svg';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoriesIcon from '../../assets/categories-icon.svg';
import Colors from '../constants/colors';
import SearchScreen from '../screens/SearchScreen';
import ItemDetailsScreen from '../screens/ItemDetailsScreen';
import DrawerContent from '../components/drawer/DrawerContent';
import FavScreen from '../screens/FavScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import ChangeQuantityScreen from '../screens/ChangeQuantityScreen';
import DashboardDrawerContent from '../components/drawer/DashboardDrawerContent';
import DashboardHome from '../screens/dashboard/DashboardHome';
import DashboardProductsScreen from '../screens/dashboard/DashboardProductsScreen';
import AddProductScreen from '../screens/dashboard/AddProductScreen';
import DashboardCategoriesScreen from '../screens/dashboard/DashboardCategoriesScreen';
import AddCategoryScreen from '../screens/dashboard/AddCategoryScreen';
import SignInAdminScreen from '../screens/SignInAdminScreen';
import DashboardItemDetailsScreen from '../screens/dashboard/DashboardItemDetailsScreen';
import OrdersPage from '../screens/OrdersPage';
import DashboardOrdersPage from '../screens/dashboard/DashboardOrdersPage';
import { setUserType } from '../store/action/auth';
import DashboardAccounts from '../screens/dashboard/DashboardAccounts';
import DashboardHomeSlider from '../screens/dashboard/DashboardHomeSlider';
import CustomerService from '../screens/CustomerService';
const ContactsStack = createStackNavigator();
const ContactsStackScreen = ({ navigation }) => (
  <ContactsStack.Navigator headerMode='none'>
    {/* <ContactsStack.Screen name='HomeScreen' component={HomeScreen} /> */}
    <ContactsStack.Screen name='SearchScreen' component={SearchScreen} />
    <ContactsStack.Screen name='FavScreen' component={FavScreen} />

    {/* <ContactsStack.Screen name="ContactDetails" component={ContactDetails} /> */}
  </ContactsStack.Navigator>
);

const TabStack = createStackNavigator();
const TabsStackScreen = ({ navigation }) => (
  <TabStack.Navigator headerMode='none'>
    <RootStack.Screen name='HomeScreen' component={HomeScreen} />
    <ContactsStack.Screen name='SearchScreen' component={SearchScreen} />
    <RootStack.Screen name='FavScreen' component={FavScreen} />
    <RootStack.Screen name='ProfileScreen' component={ProfileScreen} />
    <RootStack.Screen
      name='NotificationsScreen'
      component={NotificationsScreen}
    />
    <RootStack.Screen name='CartScreen' component={CartScreen} />
    <RootStack.Screen name='CategoriesScreen' component={CategoriesScreen} />
    <RootStack.Screen name='OrdersPage' component={OrdersPage} />
  </TabStack.Navigator>
);
// const TabsStack = createBottomTabNavigator();
// const TabsStackScreen = ({ navigation }) => (
//   <TabsStack.Navigator
//     tabBarOptions={{
//       // activeTintColor: GOLDEN,
//       showLabel: false,
//       // activeBackgroundColor:  'blue'
//     }}
//   >
//     <TabsStack.Screen
//       name='ProfileScreen'
//       component={ProfileScreen}
//       options={{
//         tabBarLabel: '',
//         tabBarIcon: (props) => (
//           <ProfileIcon
//             size={props.size}
//             color={props.focused ? Colors.GOLDEN : Colors.IN_ACTIVE_TAP}
//           />
//         ),
//       }}
//     />
//     <TabsStack.Screen
//       name='NotificationsScreen'
//       component={NotificationsScreen}
//       options={{
//         tabBarLabel: '',
//         tabBarIcon: (props) => (
//           //props.foucused
//           <AntDesign
//             name='notification'
//             size={props.size}
//             color={props.focused ? Colors.GOLDEN : Colors.IN_ACTIVE_TAP}
//           />
//         ),
//       }}
//     />
//     <TabsStack.Screen
//       name='ContactsList'
//       component={ContactsStackScreen}
//       options={{
//         tabBarLabel: '',
//         tabBarIcon: (props) => (
//           //props.foucused
//           <View style={{ position: 'relative', bottom: 20 }}>
//             <HomeIcon
//               size={props.size}
//               color={props.focused ? Colors.GOLDEN : Colors.IN_ACTIVE_TAP}
//             />
//           </View>
//         ),
//       }}
//     />

//     <TabsStack.Screen
//       name='CartScreen'
//       component={CartScreen}
//       options={{
//         tabBarIcon: (props) => (
//           //props.foucused
//           <AntDesign
//             name='shoppingcart'
//             size={props.size}
//             color={props.focused ? Colors.GOLDEN : Colors.IN_ACTIVE_TAP}
//           />
//         ),
//       }}
//     />

//     <TabsStack.Screen
//       name='CategoriesScreen'
//       component={CategoriesScreen}
//       options={{
//         tabBarLabel: '',
//         tabBarIcon: (props) => (
//           //props.foucused
//           <CategoriesIcon
//             size={props.size}
//             color={props.focused ? Colors.GOLDEN : Colors.IN_ACTIVE_TAP}
//           />
//         ),
//       }}
//     />

//     {/* <ContactsStack.Screen name="ContactDetails" component={ContactDetails} /> */}
//   </TabsStack.Navigator>
// );

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => (
  <DrawerStack.Navigator
    drawerType='slide'
    drawerContent={({ navigation }) => (
      <DrawerContent navigation={navigation} />
    )}
    //  drawerPosition= "right"
    // drawerType="back"
  >
    <DrawerStack.Screen
      name='ContactsList'
      component={TabsStackScreen}
      options={{
        drawerLabel: 'Home',
        drawerIcon: (props) => (
          //props.foucused
          <AntDesign name='home' size={props.size} color={props.color} />
        ),
      }}
    />
    {/* <ContactsStack.Screen name="ContactDetails" component={ContactDetails} /> */}
  </DrawerStack.Navigator>
);

const DashboardDrawerStack = createDrawerNavigator();
const DashboardDrawerStackScreen = () => (
  <DashboardDrawerStack.Navigator
    drawerType='slide'
    drawerContent={({ navigation }) => (
      <DashboardDrawerContent navigation={navigation} />
    )}
    //  drawerPosition= "right"
    // drawerType="back"
  >
    <DashboardDrawerStack.Screen
      name='DashboardHome'
      component={DashboardHome}
    />

    {/* <ContactsStack.Screen name="ContactDetails" component={ContactDetails} /> */}
  </DashboardDrawerStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode='none'>
    <AuthStack.Screen name='SignInScreen' component={SignInScreen} />
    <AuthStack.Screen name='SignUpScreen' component={SignUpScreen} />
    <AuthStack.Screen name='SignInAdminScreen' component={SignInAdminScreen} />
    {/* <AuthStack.Screen
      name='SignInAdminScreen'
      component={(header) => (
        <SignInAdminScreen navigation={header.navigation} />
      )}
    /> */}

    {/* <ContactsStack.Screen name="ContactDetails" component={ContactDetails} /> */}
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  // const [user, setUser] = React.useState({ userType: '' });
  // const [user, setUser] = React.useState(null);
  const user = useSelector((state) => state.auth.userType);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const getUser = async () => {
      const USER_FROM_ASYNC = await AsyncStorage.getItem('userType');
      const USER_PHONE_FROM_ASYNC = await AsyncStorage.getItem('phone');
      console.log(USER_FROM_ASYNC, 'USER_FROM_ASYNCss');
      if (USER_FROM_ASYNC != null) {
        dispatch(setUserType(USER_FROM_ASYNC, USER_PHONE_FROM_ASYNC));
        // setUser({ userType: USER_FROM_ASYNC })
      }
      setIsLoading(false);
    };
    getUser();
    // setTimeout(() => {
    //   setIsLoading(!isLoading);
    //   setUser();
    // }, 500);
  }, []);

  return (
    <RootStack.Navigator
      headerMode='none'
      screenOptions={{ animationEnabled: false }}
      mode='modal'
    >
      {isLoading ? (
        <RootStack.Screen name='Loading' component={ActivityIndicator} />
      ) : user == null ? (
        <RootStack.Screen
          name='AuthStackScreen'
          component={() => <AuthStackScreen />}
        />
      ) : user === 'admin' || user === 'seller' ? (
        <RootStack.Screen
          name='DashboardDrawerStackScreen'
          component={DashboardDrawerStackScreen}
        />
      ) : (
        <RootStack.Screen
          name='DrawerStackScreen'
          component={DrawerStackScreen}
        />
      )}

      <RootStack.Screen
        name='Modal'
        component={Modal}
        options={{ animationEnabled: true }}
      />
      <RootStack.Screen
        name='Alert'
        component={Modal}
        options={{
          animationEnabled: true,
          cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.15)' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 0.25, 0.7, 1],
                }),
              },
              overlayStyle: {
                opacity: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                  extrapolate: 'clamp',
                }),
              },
            };
          },
        }}
      />

      <RootStack.Screen
        name='ChangeQuantityScreen'
        component={ChangeQuantityScreen}
      />
      <RootStack.Screen name='CustomerService' component={CustomerService} />

      <ContactsStack.Screen
        name='ItemDetailsScreen'
        component={ItemDetailsScreen}
      />
      <ContactsStack.Screen
        name='DashboardItemDetailsScreen'
        component={DashboardItemDetailsScreen}
      />
      {/* <RootStack.Screen name='CategoriesScreen' component={CategoriesScreen} /> */}
      <RootStack.Screen
        name='PasswordResetScreen'
        component={PasswordResetScreen}
      />
      <DashboardDrawerStack.Screen
        name='DashboardProductsScreen'
        component={DashboardProductsScreen}
      />
      <DashboardDrawerStack.Screen
        name='DashboardHomeSlider'
        component={DashboardHomeSlider}
      />
      <DashboardDrawerStack.Screen
        name='DashboardAccounts'
        component={DashboardAccounts}
      />
      <DashboardDrawerStack.Screen
        name='AddProductScreen'
        component={AddProductScreen}
      />
      <DashboardDrawerStack.Screen
        name='DashboardCategoriesScreen'
        component={DashboardCategoriesScreen}
      />
      <DashboardDrawerStack.Screen
        name='DashboardOrdersPage'
        component={DashboardOrdersPage}
      />
      <DashboardDrawerStack.Screen
        name='AddCategoryScreen'
        component={AddCategoryScreen}
      />
    </RootStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
