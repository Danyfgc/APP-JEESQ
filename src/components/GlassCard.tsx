import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    intensity?: number;
    variant?: 'dark' | 'light';
    gradient?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    style,
    intensity = 20,
    variant = 'dark',
    gradient = false,
}) => {
    const glassColors = variant === 'dark' ? colors.glass.dark : colors.glass.light;

    if (gradient) {
        return (
            <View style={[styles.container, globalStyles.shadow, style]}>
                <LinearGradient
                    colors={['rgba(102, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.3)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                >
                    <BlurView intensity={intensity} style={styles.blur}>
                        <View
                            style={[
                                globalStyles.glassCard,
                                {
                                    backgroundColor: glassColors.background,
                                    borderColor: glassColors.border,
                                },
                            ]}
                        >
                            {children}
                        </View>
                    </BlurView>
                </LinearGradient>
            </View>
        );
    }

    return (
        <View style={[styles.container, globalStyles.shadow, style]}>
            <BlurView intensity={intensity} style={styles.blur}>
                <View
                    style={[
                        globalStyles.glassCard,
                        {
                            backgroundColor: glassColors.background,
                            borderColor: glassColors.border,
                        },
                    ]}
                >
                    {children}
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    blur: {
        borderRadius: 20,
    },
    gradient: {
        borderRadius: 20,
    },
});
