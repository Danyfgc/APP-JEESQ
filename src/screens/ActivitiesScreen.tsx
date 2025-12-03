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
import { Calendar, DateData } from 'react-native-calendars';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { fetchActivities, Activity } from '../services/activitiesService';
import { formatDate } from '../utils/dateUtils';

export const ActivitiesScreen = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getTodayString());
    const [markedDates, setMarkedDates] = useState<any>({});

    useEffect(() => {
        loadActivities();
    }, []);

    useEffect(() => {
        // Actualizar marcadores cuando cambien las actividades
        updateMarkedDates();
    }, [activities, selectedDate]);

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
        await fetchActivities(true);
        await loadActivities();
        setRefreshing(false);
    };

    const updateMarkedDates = () => {
        const marked: any = {};

        // Marcar días con actividades
        activities.forEach((activity) => {
            const dateStr = formatDateToYYYYMMDD(activity.date);
            marked[dateStr] = {
                marked: true,
                dotColor: '#8B5CF6',
            };
        });

        // Marcar día seleccionado
        if (marked[selectedDate]) {
            marked[selectedDate] = {
                ...marked[selectedDate],
                selected: true,
                selectedColor: 'rgba(139, 92, 246, 0.3)',
            };
        } else {
            marked[selectedDate] = {
                selected: true,
                selectedColor: 'rgba(139, 92, 246, 0.3)',
            };
        }

        setMarkedDates(marked);
    };

    const onDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
    };

    const selectedActivities = activities.filter(
        (act) => formatDateToYYYYMMDD(act.date) === selectedDate
    );

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
                    ) : (
                        <>
                            {/* Calendar */}
                            <BlurView intensity={20} tint="dark" style={[styles.calendarCard, globalStyles.shadow]}>
                                <Calendar
                                    onDayPress={onDayPress}
                                    markedDates={markedDates}
                                    theme={{
                                        calendarBackground: 'transparent',
                                        textSectionTitleColor: '#ffffff',
                                        selectedDayBackgroundColor: '#8B5CF6',
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: '#8B5CF6',
                                        dayTextColor: '#ffffff',
                                        textDisabledColor: 'rgba(255, 255, 255, 0.3)',
                                        dotColor: '#8B5CF6',
                                        selectedDotColor: '#ffffff',
                                        arrowColor: '#8B5CF6',
                                        monthTextColor: '#ffffff',
                                        textDayFontWeight: '500',
                                        textMonthFontWeight: '700',
                                        textDayHeaderFontWeight: '600',
                                        textDayFontSize: 14,
                                        textMonthFontSize: 18,
                                        textDayHeaderFontSize: 12,
                                    }}
                                />
                            </BlurView>

                            {/* Selected Date Activities */}
                            <View style={styles.activitiesSection}>
                                <Text style={styles.sectionTitle}>
                                    Actividades del {formatSelectedDate(selectedDate)}
                                </Text>

                                {selectedActivities.length === 0 ? (
                                    <BlurView intensity={20} tint="dark" style={[styles.emptyCard, globalStyles.shadow]}>
                                        <Ionicons name="calendar-outline" size={48} color="rgba(255, 255, 255, 0.3)" />
                                        <Text style={styles.emptyText}>No hay actividades este día</Text>
                                    </BlurView>
                                ) : (
                                    selectedActivities.map((activity) => (
                                        <ActivityCard key={activity.id} activity={activity} />
                                    ))
                                )}
                            </View>
                        </>
                    )}
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

// Activity Card Component
const ActivityCard = ({ activity }: { activity: Activity }) => (
    <BlurView intensity={20} tint="dark" style={[styles.activityCard, globalStyles.shadow]}>
        <Text style={styles.cardTitle}>{activity.title}</Text>

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

// Helper Functions
function getTodayString(): string {
    const today = new Date();
    return formatDateToYYYYMMDD(today);
}

function formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatSelectedDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return formatDate(date).toLowerCase();
}

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
    calendarCard: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    activitiesSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 16,
        paddingLeft: 4,
        textTransform: 'capitalize',
    },
    emptyCard: {
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    emptyText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 15,
        marginTop: 12,
    },
    activityCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 15,
        marginLeft: 12,
    },
});
