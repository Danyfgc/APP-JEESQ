import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';

interface GlassButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'small' | 'medium' | 'large';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
    title,
    onPress,
    style,
    textStyle,
    variant = 'primary',
    size = 'medium',
}) => {
    const getButtonColors = () => {
        switch (variant) {
            case 'primary':
                return colors.primary.gradient;
            case 'secondary':
                return colors.secondary.gradient;
            case 'outline':
                return ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'];
            default:
                return colors.primary.gradient;
        }
    };

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { padding: 12, fontSize: 14 };
            case 'medium':
                return { padding: 16, fontSize: 16 };
            case 'large':
                return { padding: 20, fontSize: 18 };
            default:
                return { padding: 16, fontSize: 16 };
        }
    };

    const sizeStyles = getSizeStyles();

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
            >
                <LinearGradient
                    colors={getButtonColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.gradient, { padding: sizeStyles.padding }]}
                >
                    <BlurView intensity={10} style={styles.blur}>
                        <Text
                            style={[
                                styles.text,
                                globalStyles.subtitle,
                                { fontSize: sizeStyles.fontSize },
                                textStyle,
                            ]}
                        >
                            {title}
                        </Text>
                    </BlurView>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        overflow: 'hidden',
        ...globalStyles.shadowSmall,
    },
    gradient: {
        borderRadius: 15,
    },
    blur: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffff',
        fontWeight: '600',
        textAlign: 'center',
    },
});
