import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { GlassCard } from '../components/GlassCard';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';

interface MenuItem {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    type: 'navigation' | 'toggle';
    action?: () => void;
}

export const ExtrasScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(true);

    const menuItems: MenuItem[] = [
        {
            id: '1',
            title: 'Mi Perfil',
            icon: 'person-outline',
            type: 'navigation',
            action: () => console.log('Perfil'),
        },
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
        {
            id: '4',
            title: 'Configuración',
            icon: 'settings-outline',
            type: 'navigation',
            action: () => console.log('Configuración'),
        },
    ];

    const communityStats = [
        { label: 'Miembros', value: '250+', icon: '👥' },
        { label: 'Eventos', value: '15', icon: '📅' },
        { label: 'Recursos', value: '50+', icon: '📚' },
    ];

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#2d1b4e', '#1a1a2e', '#0f0f1e']}
                style={styles.gradient}
            >
                <StatusBar style="light" />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={[globalStyles.titleLarge, styles.title]}>
                            Extras
                        </Text>
                        <Text style={[globalStyles.body, styles.subtitle]}>
                            Configuración y más opciones
                        </Text>
                    </View>

                    {/* Community Stats */}
                    <GlassCard gradient style={styles.statsCard}>
                        <Text style={[globalStyles.title, styles.statsTitle]}>
                            Nuestra Comunidad
                        </Text>
                        <View style={styles.statsGrid}>
                            {communityStats.map((stat, index) => (
                                <View key={index} style={styles.statItem}>
                                    <Text style={styles.statIcon}>{stat.icon}</Text>
                                    <Text style={[globalStyles.title, styles.statValue]}>
                                        {stat.value}
                                    </Text>
                                    <Text style={[globalStyles.bodySmall, styles.statLabel]}>
                                        {stat.label}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </GlassCard>

                    {/* Settings Section */}
                    <Text style={[globalStyles.title, styles.sectionTitle]}>
                        Ajustes
                    </Text>

                    <GlassCard style={styles.settingsCard}>
                        <View style={styles.settingRow}>
                            <View style={styles.settingLeft}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color="rgba(255, 255, 255, 0.9)"
                                />
                                <Text style={[globalStyles.body, styles.settingText]}>
                                    Notificaciones
                                </Text>
                            </View>
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{
                                    false: 'rgba(255, 255, 255, 0.2)',
                                    true: colors.primary.main,
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
                                    color="rgba(255, 255, 255, 0.9)"
                                />
                                <Text style={[globalStyles.body, styles.settingText]}>
                                    Modo Oscuro
                                </Text>
                            </View>
                            <Switch
                                value={darkModeEnabled}
                                onValueChange={setDarkModeEnabled}
                                trackColor={{
                                    false: 'rgba(255, 255, 255, 0.2)',
                                    true: colors.primary.main,
                                }}
                                thumbColor={'#ffffff'}
                            />
                        </View>
                    </GlassCard>

                    {/* Menu Items */}
                    <Text style={[globalStyles.title, styles.sectionTitle]}>
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
                                        <View style={styles.iconContainer}>
                                            <Ionicons
                                                name={item.icon}
                                                size={22}
                                                color="rgba(255, 255, 255, 0.9)"
                                            />
                                        </View>
                                        <Text style={[globalStyles.body, styles.menuText]}>
                                            {item.title}
                                        </Text>
                                    </View>
                                    <Ionicons
                                        name="chevron-forward"
                                        size={20}
                                        color="rgba(255, 255, 255, 0.5)"
                                    />
                                </View>
                            </GlassCard>
                        </TouchableOpacity>
                    ))}

                    {/* About Section */}
                    <GlassCard style={styles.aboutCard}>
                        <Text style={[globalStyles.subtitle, styles.aboutTitle]}>
                            Acerca de
                        </Text>
                        <Text style={[globalStyles.bodySmall, styles.aboutText]}>
                            Jesús es el Señor - Comunidad de Fe
                        </Text>
                        <Text style={[globalStyles.caption, styles.versionText]}>
                            Versión 1.0.0
                        </Text>
                    </GlassCard>

                    {/* Bottom Spacing */}
                    <View style={styles.bottomSpacer} />
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
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
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    statsCard: {
        marginBottom: 30,
    },
    statsTitle: {
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    statValue: {
        color: '#ffffff',
        marginBottom: 4,
    },
    statLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
    },
    sectionTitle: {
        color: '#ffffff',
        marginBottom: 15,
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
        color: 'rgba(255, 255, 255, 0.9)',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: 12,
    },
    menuItem: {
        marginBottom: 12,
    },
    menuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        color: 'rgba(255, 255, 255, 0.9)',
    },
    aboutCard: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    aboutTitle: {
        color: '#ffffff',
        marginBottom: 8,
    },
    aboutText: {
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 4,
    },
    versionText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    bottomSpacer: {
        height: 100,
    },
});
