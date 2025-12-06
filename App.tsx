import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './src/navigation/HomeStack';
import { ActivitiesScreen } from './src/screens/ActivitiesScreen';
import { ExtrasScreen } from './src/screens/ExtrasScreen';
import { TabBar } from './src/components/TabBar';
import { ThemeProvider } from './src/theme/ThemeContext';
import {
  registerForPushNotificationsAsync,
  scheduleDailyNotifications,
  registerBackgroundFetchAsync
} from './src/services/notificationService';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    async function initNotifications() {
      await registerForPushNotificationsAsync();
      await scheduleDailyNotifications();
      await registerBackgroundFetchAsync();
    }

    initNotifications();
  }, []);
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={(props) => <TabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Inicio" component={HomeStack} />
          <Tab.Screen name="Actividades" component={ActivitiesScreen} />
          <Tab.Screen name="Extras" component={ExtrasScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
