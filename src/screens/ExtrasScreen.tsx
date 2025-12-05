import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GlassCard } from '../components/GlassCard';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { useTheme } from '../theme/ThemeContext';

interface MenuItem {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    type: 'navigation' | 'toggle';
    action?: () => void;
}

export const ExtrasScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const { theme, isDarkMode, toggleTheme } = useTheme();

    const menuItems: MenuItem[] = [
        {
            id: '2',
            title: 'Recursos',
            icon: 'book-outline',
            type: 'navigation',
            action: () => console.log('Recursos'),
        },
        {
            id: '3',
            title: 'Donaciones',
            icon: 'heart-outline',
            type: 'navigation',
            action: () => console.log('Donaciones'),
        },
    ];

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar style="light" />

            {/* Geometric Background Shapes */}
            <View style={[globalStyles.circleShape, {
                top: -80,
                right: -80,
                width: 250,
                height: 250,
                backgroundColor: theme.secondary.main, // Naranja
                opacity: 0.15,
            }]} />
            <View style={[globalStyles.circleShape, {
                bottom: 100,
                left: -100,
                width: 300,
                height: 300,
                backgroundColor: theme.primary.light, // Azul claro
                opacity: 0.1,
            }]} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[globalStyles.titleLarge, styles.title, { color: theme.text.primary }]}>
                        Extras
                    </Text>
                    <Text style={[globalStyles.subtitle, styles.subtitle, { color: theme.text.secondary }]}>
                        Configuración y más opciones
                    </Text>
                </View>

                <GlassCard style={styles.settingsCard}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Ionicons
                                name="notifications-outline"
                                size={24}
                                color={theme.text.primary}
                            />
                            <Text style={[globalStyles.body, styles.settingText, { color: theme.text.primary }]}>
                                Notificaciones
                            </Text>
                        </View>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            trackColor={{
                                false: 'rgba(255, 255, 255, 0.2)',
                                true: theme.secondary.main,
                            }}
                            thumbColor={'#ffffff'}
                        />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.settingRow}>
                        <View style={styles.settingLeft}>
                            <Ionicons
                                name="moon-outline"
                                size={24}
                                color={theme.text.primary}
                            />
                            <Text style={[globalStyles.body, styles.settingText, { color: theme.text.primary }]}>
                                Modo Oscuro
                            </Text>
                        </View>
                        <Switch
                            value={isDarkMode}
                            onValueChange={toggleTheme}
                            trackColor={{
                                false: 'rgba(255, 255, 255, 0.2)',
                                true: theme.secondary.main,
                            }}
                            thumbColor={'#ffffff'}
                        />
                    </View>
                </GlassCard>

                {/* Menu Items */}
                <Text style={[globalStyles.title, styles.sectionTitle, { color: theme.text.primary }]}>
                    Más Opciones
                </Text>

                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={item.action}
                        activeOpacity={0.7}
                    >
                        <GlassCard style={styles.menuItem}>
                            <View style={styles.menuContent}>
                                <View style={styles.menuLeft}>
                                    <View style={[styles.iconContainer, { backgroundColor: theme.primary.light + '30' }]}>
                                        <Ionicons
                                            name={item.icon}
                                            size={22}
                                            color={theme.text.primary}
                                        />
                                    </View>
                                    <Text style={[globalStyles.body, styles.menuText, { color: theme.text.primary }]}>
                                        {item.title}
                                    </Text>
                                </View>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={theme.text.tertiary}
                                />
                            </View>
                        </GlassCard>
                    </TouchableOpacity>
                ))}

                {/* About Section */}
                <GlassCard style={styles.aboutCard}>
                    <Text style={[globalStyles.subtitle, styles.aboutTitle, { color: theme.text.primary }]}>
                        Acerca de
                    </Text>
                    <Text style={[globalStyles.bodySmall, styles.aboutText, { color: theme.text.secondary }]}>
                        Jesús es el Señor - Comunidad de Fe
                    </Text>
                    <Text style={[globalStyles.caption, styles.versionText, { color: theme.text.tertiary }]}>
                        Versión 1.0.0
                    </Text>
                </GlassCard>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        marginBottom: 25,
    },
    title: {
        marginBottom: 8,
    },
    subtitle: {
        opacity: 0.8,
    },
    sectionTitle: {
        marginBottom: 15,
        fontSize: 20,
    },
    settingsCard: {
        marginBottom: 30,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    settingText: {
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 12,
    },
    menuItem: {
        marginBottom: 12,
        padding: 16,
    },
    menuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        fontSize: 16,
        fontWeight: '600',
    },
    aboutCard: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        paddingVertical: 30,
    },
    aboutTitle: {
        marginBottom: 8,
    },
    aboutText: {
        marginBottom: 4,
    },
    versionText: {
        opacity: 0.6,
    },
    bottomSpacer: {
        height: 100,
    },
});
