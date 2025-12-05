import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { DailyReadingCard } from '../components/DailyReadingCard';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { getTodayReading } from '../data/readingCalendar';
import { getUpcomingActivities, Activity } from '../services/activitiesService';
import { formatDate } from '../utils/dateUtils';
import { HomeStackParamList } from '../navigation/HomeStack';
import { useTheme } from '../theme/ThemeContext';
import { getTodaysCelebrations, Celebration } from '../services/celebrationService';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [nextEvent, setNextEvent] = useState<Activity | null>(null);
    const { theme, isDarkMode } = useTheme();
    const [celebrations, setCelebrations] = useState<Celebration[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadNextEvent();
    }, []);

    const loadNextEvent = async (forceRefresh = false) => {
        try {
            const upcoming = await getUpcomingActivities(forceRefresh);
            if (upcoming.length > 0) {
                setNextEvent(upcoming[0]); // Primer evento próximo
            }

            const todaysCelebrations = await getTodaysCelebrations(forceRefresh);
            setCelebrations(todaysCelebrations);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadNextEvent(true);
        setRefreshing(false);
    };

    const handleReadingPress = () => {
        const todayReading = getTodayReading();
        if (todayReading) {
            navigation.navigate('Reading', {
                reading: todayReading.reading,
                date: new Date().toISOString(),
            });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar style="light" />

            {/* Geometric Background Shapes */}
            <View style={[globalStyles.circleShape, {
                top: -100,
                right: -50,
                width: 300,
                height: 300,
                backgroundColor: theme.secondary.main, // Naranja
                opacity: 0.2,
            }]} />
            <View style={[globalStyles.circleShape, {
                top: 100,
                left: -100,
                width: 200,
                height: 200,
                backgroundColor: theme.primary.light, // Azul claro
                opacity: 0.1,
            }]} />
            <View style={[globalStyles.circleShape, {
                bottom: -50,
                right: -50,
                width: 250,
                height: 250,
                backgroundColor: theme.accent.warning, // Amarillo/Naranja
                opacity: 0.15,
            }]} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.text.primary}
                        colors={[theme.secondary.main]} // Android: Naranja
                    />
                }
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={[globalStyles.titleLarge, styles.title, { color: theme.text.primary }]}>
                        Jesús es el Señor
                    </Text>
                    <Text style={[globalStyles.subtitle, styles.subtitle, { color: theme.text.secondary }]}>
                        Bienvenido a nuestra comunidad
                    </Text>
                </View>

                {/* Celebration Banner */}
                {celebrations.length > 0 && (
                    <View style={{ marginBottom: 20 }}>
                        {celebrations.map((celebration) => (
                            <GlassCard key={celebration.id} style={{
                                marginBottom: 10,
                                backgroundColor: isDarkMode ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 215, 0, 0.3)',
                                borderColor: 'rgba(255, 215, 0, 0.5)'
                            }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 32, marginRight: 15 }}>
                                        {celebration.category.toLowerCase().includes('aniversario') ? '💍' : '🎂'}
                                    </Text>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[globalStyles.subtitle, {
                                            color: theme.text.primary,
                                            fontWeight: 'bold',
                                            fontSize: 18
                                        }]}>
                                            ¡Feliz {celebration.category}!
                                        </Text>
                                        <Text style={[globalStyles.body, {
                                            color: theme.text.primary,
                                            fontSize: 16,
                                            marginVertical: 4
                                        }]}>
                                            {celebration.name}
                                        </Text>
                                        <Text style={[globalStyles.caption, {
                                            color: theme.text.secondary,
                                            fontStyle: 'italic'
                                        }]}>
                                            Dios los bendiga abundantemente
                                        </Text>
                                    </View>
                                </View>
                            </GlassCard>
                        ))}
                    </View>
                )}

                {/* Next Event Card */}
                {nextEvent && (
                    <GlassCard gradient style={styles.heroCard}>
                        <View style={styles.eventBadge}>
                            <Ionicons name="calendar" size={16} color="#ffffff" />
                            <Text style={styles.eventBadgeText}>Próximo Evento</Text>
                        </View>
                        <Text style={[globalStyles.title, styles.heroTitle, { color: theme.text.primary }]}>
                            {nextEvent.title}
                        </Text>
                        <View style={styles.eventDetails}>
                            <View style={styles.eventRow}>
                                <Ionicons name="calendar-outline" size={20} color={colors.primary.light} />
                                <Text style={[globalStyles.body, styles.eventText]}>
                                    {formatDate(nextEvent.date)}
                                </Text>
                            </View>
                            <View style={styles.eventRow}>
                                <Ionicons name="time-outline" size={20} color={colors.primary.light} />
                                <Text style={[globalStyles.body, styles.eventText]}>
                                    {nextEvent.time}
                                </Text>
                            </View>
                            <View style={styles.eventRow}>
                                <Ionicons name="location-outline" size={20} color={theme.primary.light} />
                                <Text style={[globalStyles.body, styles.eventText, { color: theme.text.primary }]}>
                                    {nextEvent.location}
                                </Text>
                            </View>
                        </View>
                    </GlassCard>
                )}

                {/* Daily Reading Card */}
                <DailyReadingCard onPress={handleReadingPress} />

                {/* Feature Cards Grid */}
                <View style={styles.grid}>
                    <View style={styles.gridRow}>


                        <GlassCard style={styles.featureCard}>
                            <Text style={styles.featureIcon}>🙏</Text>
                            <Text style={[globalStyles.subtitle, styles.featureTitle]}>
                                Oración
                            </Text>
                            <Text style={[globalStyles.bodySmall, styles.featureText]}>
                                Momentos de paz
                            </Text>
                        </GlassCard>
                    </View>

                    <View style={styles.gridRow}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => navigation.navigate('Community')}
                            activeOpacity={0.7}
                        >
                            <GlassCard style={styles.featureCard}>
                                <Text style={styles.featureIcon}>👥</Text>
                                <Text style={[globalStyles.subtitle, styles.featureTitle, { color: theme.text.primary }]}>
                                    Comunidad
                                </Text>
                                <Text style={[globalStyles.bodySmall, styles.featureText, { color: theme.text.secondary }]}>
                                    Conecta con otros
                                </Text>
                            </GlassCard>
                        </TouchableOpacity>

                        <GlassCard style={styles.featureCard}>
                            <Text style={styles.featureIcon}>🎵</Text>
                            <Text style={[globalStyles.subtitle, styles.featureTitle, { color: theme.text.primary }]}>
                                Alabanza
                            </Text>
                            <Text style={[globalStyles.bodySmall, styles.featureText, { color: theme.text.secondary }]}>
                                Música y adoración
                            </Text>
                        </GlassCard>
                    </View>
                </View>



                {/* Bottom Spacing for Tab Bar */}
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </View >
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
        marginBottom: 30,
    },
    title: {
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    heroCard: {
        marginBottom: 30,
    },
    heroTitle: {
        color: '#ffffff',
        marginBottom: 12,
    },
    heroText: {
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
    },
    mt20: {
        marginTop: 20,
    },
    grid: {
        marginBottom: 20,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    featureCardContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    featureCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 25,
    },
    featureIcon: {
        fontSize: 40,
        marginBottom: 12,
    },
    featureTitle: {
        color: '#ffffff',
        marginBottom: 4,
        textAlign: 'center',
    },
    featureText: {
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
    },
    infoCard: {
        marginBottom: 20,
    },
    infoTitle: {
        color: '#ffffff',
        marginBottom: 12,
    },
    infoText: {
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
    },
    mt15: {
        marginTop: 15,
    },
    infoDetail: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
    },
    eventBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(139, 92, 246, 0.3)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    eventBadgeText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6,
    },
    eventDetails: {
        marginTop: 20,
    },
    eventRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    eventText: {
        color: '#ffffff',
        marginLeft: 12,
        flex: 1,
    },
    bottomSpacer: {
        height: 100,
    },
});
