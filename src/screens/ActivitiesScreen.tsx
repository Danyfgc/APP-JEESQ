import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { fetchActivities, Activity } from '../services/activitiesService';
import { formatDate } from '../utils/dateUtils';

export const ActivitiesScreen = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadActivities();
    }, []);

    const loadActivities = async () => {
        try {
            setLoading(true);
            const data = await fetchActivities();
            setActivities(data);
        } catch (error) {
            console.error('Error loading activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchActivities(true); // Force refresh
        await loadActivities();
        setRefreshing(false);
    };

    const isUpcoming = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0f0f1e', '#1a1a2e', '#2d1b4e']}
                style={styles.gradient}
            >
                {/* Header */}
                <BlurView intensity={20} style={styles.header}>
                    <Ionicons name="calendar" size={28} color="#ffffff" />
                    <Text style={styles.headerTitle}>Actividades</Text>
                    <View style={styles.placeholder} />
                </BlurView>

                {/* Content */}
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={colors.primary.main}
                        />
                    }
                >
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={colors.primary.main} />
                            <Text style={styles.loadingText}>Cargando actividades...</Text>
                        </View>
                    ) : activities.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="calendar-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
                            <Text style={styles.emptyText}>No hay actividades programadas</Text>
                            <Text style={styles.emptySubtext}>
                                Desliza hacia abajo para actualizar
                            </Text>
                        </View>
                    ) : (
                        <>
                            {/* Upcoming Activities */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Próximas Actividades</Text>
                                {activities
                                    .filter(act => isUpcoming(act.date))
                                    .map((activity) => (
                                        <ActivityCard key={activity.id} activity={activity} upcoming />
                                    ))}
                            </View>

                            {/* Past Activities */}
                            {activities.some(act => !isUpcoming(act.date)) && (
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Actividades Pasadas</Text>
                                    {activities
                                        .filter(act => !isUpcoming(act.date))
                                        .map((activity) => (
                                            <ActivityCard key={activity.id} activity={activity} upcoming={false} />
                                        ))}
                                </View>
                            )}
                        </>
                    )}
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

// Activity Card Component
const ActivityCard = ({ activity, upcoming }: { activity: Activity; upcoming: boolean }) => (
    <BlurView intensity={20} tint="dark" style={[styles.card, globalStyles.shadow]}>
        <View style={styles.cardHeader}>
            <View style={[styles.badge, upcoming ? styles.badgeUpcoming : styles.badgePast]}>
                <Text style={styles.badgeText}>
                    {upcoming ? 'Próximamente' : 'Pasado'}
                </Text>
            </View>
        </View>

        <Text style={styles.cardTitle}>{activity.title}</Text>

        <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary.light} />
            <Text style={styles.infoText}>{formatDate(activity.date)}</Text>
        </View>

        <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={colors.primary.light} />
            <Text style={styles.infoText}>{activity.time}</Text>
        </View>

        <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={colors.primary.light} />
            <Text style={styles.infoText}>{activity.location}</Text>
        </View>
    </BlurView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    gradient: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#ffffff',
    },
    placeholder: {
        width: 28,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
        marginTop: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 20,
    },
    emptySubtext: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 14,
        marginTop: 8,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 16,
        paddingLeft: 4,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 12,
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeUpcoming: {
        backgroundColor: 'rgba(139, 92, 246, 0.3)',
    },
    badgePast: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 15,
        marginLeft: 12,
    },
});
