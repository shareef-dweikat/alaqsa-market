import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Modal from '../screens/Modal';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
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
import CategoriesPerStore from '../screens/CategoriesPerStore';
import DashboardNotifications from '../screens/dashboard/DashboardNotifications';
import DashboardStoresScreen from '../screens/dashboard/DashboardStoresScreen';
import AddStoreScreen from '../screens/dashboard/AddStoreScreen';
import DashboardDisacount from '../screens/dashboard/DashboardDisacount';
const ContactsStack = createStackNavigator();
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
    <RootStack.Screen
      name='CategoriesPerStore'
      component={CategoriesPerStore}
    />
    <RootStack.Screen name='OrdersPage' component={OrdersPage} />
  </TabStack.Navigator>
);

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => (
  <DrawerStack.Navigator
    // drawerType='slide'
    edgeWidth={0}
    drawerContent={({ navigation }) => (
      <DrawerContent navigation={navigation} />
    )}
    //  drawerPosition= "right"
    drawerType='back'
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
  </AuthStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const user = useSelector((state) => state.auth.userType);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const getUser = async () => {
      const USER_FROM_ASYNC = await AsyncStorage.getItem('userType');
      const USER_PHONE_FROM_ASYNC = await AsyncStorage.getItem('phone');
      if (USER_FROM_ASYNC != null) {
        dispatch(setUserType(USER_FROM_ASYNC, USER_PHONE_FROM_ASYNC));
        // setUser({ userType: USER_FROM_ASYNC })
      }
      setIsLoading(false);
    };
    getUser();
  }, []);

  return (
    <RootStack.Navigator
      headerMode='none'
      screenOptions={{ animationEnabled: false }}
      mode='modal'
    >
      {isLoading ? (
        <RootStack.Screen name='Loading' component={ActivityIndicator} />
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
        name='AuthStackScreen'
        component={() => <AuthStackScreen />}
      />
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
        name='DashboardNotifications'
        component={DashboardNotifications}
      />

      <DashboardDrawerStack.Screen
        name='DashboardAccounts'
        component={DashboardAccounts}
      />
      <DashboardDrawerStack.Screen
        name='DashboardStoresScreen'
        component={DashboardStoresScreen}
      />
      <DashboardDrawerStack.Screen
        name='AddStoreScreen'
        component={AddStoreScreen}
      />
      <DashboardDrawerStack.Screen
        name='DashboardDisacount'
        component={DashboardDisacount}
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
