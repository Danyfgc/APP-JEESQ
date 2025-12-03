import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ReadingScreen } from '../screens/ReadingScreen';

export type HomeStackParamList = {
    Home: undefined;
    Reading: {
        reading: string;
        date?: string;
    };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'transparent' },
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Reading" component={ReadingScreen} />
        </Stack.Navigator>
    );
};
