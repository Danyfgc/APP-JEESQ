import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar, DateData } from 'react-native-calendars';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { fetchActivities, Activity } from '../services/activitiesService';
import { formatDate } from '../utils/dateUtils';
import { useTheme } from '../theme/ThemeContext';
import { StatusBar } from 'expo-status-bar';

export const ActivitiesScreen = () => {
    const { theme, isDarkMode } = useTheme();
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
                dotColor: theme.secondary.main, // Naranja
            };
        });

        // Marcar día seleccionado
        if (marked[selectedDate]) {
            marked[selectedDate] = {
                ...marked[selectedDate],
                selected: true,
                selectedColor: theme.secondary.main, // Naranja
                selectedTextColor: '#ffffff',
            };
        } else {
            marked[selectedDate] = {
                selected: true,
                selectedColor: theme.secondary.main, // Naranja
                selectedTextColor: '#ffffff',
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
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar style="light" />

            {/* Geometric Background Shapes */}
            <View style={[globalStyles.circleShape, {
                top: -50,
                left: -50,
                width: 200,
                height: 200,
                backgroundColor: theme.secondary.main, // Naranja
                opacity: 0.15,
            }]} />
            <View style={[globalStyles.circleShape, {
                top: 100,
                right: -80,
                width: 300,
                height: 300,
                backgroundColor: theme.primary.light, // Azul claro
                opacity: 0.1,
            }]} />

            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="calendar" size={28} color={theme.text.primary} />
                <Text style={[styles.headerTitle, { color: theme.text.primary }]}>Actividades</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.text.primary}
                        colors={[theme.secondary.main]}
                    />
                }
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.secondary.main} />
                        <Text style={[styles.loadingText, { color: theme.text.secondary }]}>Cargando actividades...</Text>
                    </View>
                ) : (
                    <>
                        {/* Calendar */}
                        <View style={[globalStyles.glassCard, styles.calendarCard]}>
                            <Calendar
                                onDayPress={onDayPress}
                                markedDates={markedDates}
                                theme={{
                                    calendarBackground: 'transparent',
                                    textSectionTitleColor: theme.text.secondary,
                                    selectedDayBackgroundColor: theme.secondary.main,
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: theme.secondary.main,
                                    dayTextColor: theme.text.primary,
                                    textDisabledColor: theme.text.tertiary,
                                    dotColor: theme.secondary.main,
                                    selectedDotColor: '#ffffff',
                                    arrowColor: theme.secondary.main,
                                    monthTextColor: theme.text.primary,
                                    textDayFontWeight: '500',
                                    textMonthFontWeight: '700',
                                    textDayHeaderFontWeight: '600',
                                    textDayFontSize: 14,
                                    textMonthFontSize: 18,
                                    textDayHeaderFontSize: 12,
                                }}
                            />
                        </View>

                        {/* Selected Date Activities */}
                        <View style={styles.activitiesSection}>
                            <Text style={[styles.sectionTitle, { color: theme.text.primary }]}>
                                Actividades del {formatSelectedDate(selectedDate)}
                            </Text>

                            {selectedActivities.length === 0 ? (
                                <View style={[globalStyles.glassCard, styles.emptyCard]}>
                                    <Ionicons name="calendar-outline" size={48} color={theme.text.tertiary} />
                                    <Text style={[styles.emptyText, { color: theme.text.secondary }]}>No hay actividades este día</Text>
                                </View>
                            ) : (
                                selectedActivities.map((activity) => (
                                    <ActivityCard key={activity.id} activity={activity} theme={theme} isDarkMode={isDarkMode} />
                                ))
                            )}
                        </View>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

// Activity Card Component
const ActivityCard = ({ activity, theme, isDarkMode }: { activity: Activity; theme: any; isDarkMode: boolean }) => (
    <View style={[globalStyles.glassCard, styles.activityCard]}>
        <Text style={[styles.cardTitle, { color: theme.text.primary }]}>{activity.title}</Text>

        <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color={theme.secondary.main} />
            <Text style={[styles.infoText, { color: theme.text.secondary }]}>{activity.time}</Text>
        </View>

        <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color={theme.secondary.main} />
            <Text style={[styles.infoText, { color: theme.text.secondary }]}>{activity.location}</Text>
        </View>
    </View>
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
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
        fontSize: 16,
        marginTop: 16,
    },
    calendarCard: {
        marginBottom: 24,
        padding: 10, // Ajuste para el calendario
    },
    activitiesSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        paddingLeft: 4,
        textTransform: 'capitalize',
    },
    emptyCard: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 15,
        marginTop: 12,
    },
    activityCard: {
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 15,
        marginLeft: 12,
    },
});
