import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';

export const TabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    return (
        <View style={styles.container}>
            <BlurView intensity={40} style={styles.blurContainer}>
                <View style={styles.tabBar}>
                    {state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };

                        // Iconos para cada tab
                        const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
                            switch (routeName) {
                                case 'Inicio':
                                    return 'home';
                                case 'Calendario':
                                    return 'calendar';
                                case 'Actividades':
                                    return 'calendar-outline';
                                case 'Extras':
                                    return 'grid';
                                default:
                                    return 'ellipse';
                            }
                        };

                        return (
                            <TabButton
                                key={route.key}
                                label={label.toString()}
                                iconName={getIconName(route.name)}
                                isFocused={isFocused}
                                onPress={onPress}
                            />
                        );
                    })}
                </View>
            </BlurView>
        </View>
    );
};

interface TabButtonProps {
    label: string;
    iconName: keyof typeof Ionicons.glyphMap;
    isFocused: boolean;
    onPress: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
    label,
    iconName,
    isFocused,
    onPress,
}) => {
    const iconColor = isFocused ? '#ffffff' : 'rgba(255, 255, 255, 0.5)';
    const textColor = isFocused ? '#ffffff' : 'rgba(255, 255, 255, 0.5)';

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.tabButton}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                {isFocused && (
                    <View style={styles.activeIndicator}>
                        <BlurView intensity={20} style={styles.indicatorBlur} />
                    </View>
                )}
                <View>
                    <Ionicons
                        name={iconName}
                        size={24}
                        color={iconColor}
                    />
                </View>
            </View>
            <Text
                style={[
                    styles.tabLabel,
                    { color: textColor },
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 25,
        overflow: 'hidden',
        ...globalStyles.shadow,
    },
    blurContainer: {
        backgroundColor: 'rgba(26, 26, 46, 0.7)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 25,
    },
    tabBar: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    iconContainer: {
        position: 'relative',
        marginBottom: 4,
    },
    activeIndicator: {
        position: 'absolute',
        top: -8,
        left: -8,
        right: -8,
        bottom: -8,
        borderRadius: 20,
        backgroundColor: 'rgba(102, 126, 234, 0.3)',
        overflow: 'hidden',
    },
    indicatorBlur: {
        flex: 1,
    },
    tabLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },
});
