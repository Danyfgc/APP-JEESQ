import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { GlassCard } from '../components/GlassCard';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    type: 'service' | 'meeting' | 'special';
}

const events: Event[] = [
    {
        id: '1',
        title: 'Servicio Dominical',
        date: 'Dom, 8 de Dic',
        time: '10:00 AM',
        type: 'service',
    },
    {
        id: '2',
        title: 'Reunión de Jóvenes',
        date: 'Vie, 13 de Dic',
        time: '7:00 PM',
        type: 'meeting',
    },
    {
        id: '3',
        title: 'Celebración Especial',
        date: 'Dom, 15 de Dic',
        time: '6:00 PM',
        type: 'special',
    },
    {
        id: '4',
        title: 'Estudio Bíblico',
        date: 'Mié, 18 de Dic',
        time: '7:30 PM',
        type: 'meeting',
    },
];

export const CalendarScreen = () => {
    const getEventIcon = (type: Event['type']) => {
        switch (type) {
            case 'service':
                return '⛪';
            case 'meeting':
                return '👥';
            case 'special':
                return '✨';
            default:
                return '📅';
        }
    };

    const getEventColor = (type: Event['type']) => {
        switch (type) {
            case 'service':
                return colors.primary.gradient;
            case 'meeting':
                return colors.secondary.gradient;
            case 'special':
                return ['#f093fb', '#f5576c'];
            default:
                return colors.primary.gradient;
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1a1a2e', '#0f0f1e', '#1a1a2e']}
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
                            Calendario
                        </Text>
                        <Text style={[globalStyles.body, styles.subtitle]}>
                            Próximos eventos de la comunidad
                        </Text>
                    </View>

                    {/* Calendar Month View */}
                    <GlassCard gradient style={styles.monthCard}>
                        <Text style={[globalStyles.title, styles.monthTitle]}>
                            Diciembre 2025
                        </Text>
                        <View style={styles.weekDays}>
                            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                                <Text key={index} style={styles.weekDay}>
                                    {day}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.daysGrid}>
                            {[...Array(31)].map((_, index) => {
                                const day = index + 1;
                                const hasEvent = [8, 13, 15, 18].includes(day);
                                return (
                                    <TouchableOpacity
                                        key={day}
                                        style={[
                                            styles.dayCell,
                                            hasEvent && styles.dayWithEvent,
                                        ]}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.dayNumber,
                                                hasEvent && styles.dayNumberActive,
                                            ]}
                                        >
                                            {day}
                                        </Text>
                                        {hasEvent && <View style={styles.eventDot} />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </GlassCard>

                    {/* Events List */}
                    <Text style={[globalStyles.title, styles.eventsTitle]}>
                        Próximos Eventos
                    </Text>

                    {events.map((event) => (
                        <TouchableOpacity key={event.id} activeOpacity={0.9}>
                            <GlassCard style={styles.eventCard}>
                                <LinearGradient
                                    colors={getEventColor(event.type)}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.eventGradient}
                                >
                                    <View style={styles.eventContent}>
                                        <Text style={styles.eventIcon}>
                                            {getEventIcon(event.type)}
                                        </Text>
                                        <View style={styles.eventDetails}>
                                            <Text style={[globalStyles.subtitle, styles.eventTitle]}>
                                                {event.title}
                                            </Text>
                                            <View style={[globalStyles.row, styles.eventMeta]}>
                                                <Text style={styles.eventDate}>📅 {event.date}</Text>
                                                <Text style={styles.eventTime}>🕐 {event.time}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </GlassCard>
                        </TouchableOpacity>
                    ))}

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
    monthCard: {
        marginBottom: 30,
    },
    monthTitle: {
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    weekDay: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        fontWeight: '600',
        width: 40,
        textAlign: 'center',
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCell: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 2,
    },
    dayWithEvent: {
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderRadius: 10,
    },
    dayNumber: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
    },
    dayNumberActive: {
        color: '#ffffff',
        fontWeight: '600',
    },
    eventDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#f093fb',
        marginTop: 2,
    },
    eventsTitle: {
        color: '#ffffff',
        marginBottom: 15,
    },
    eventCard: {
        marginBottom: 15,
        padding: 0,
    },
    eventGradient: {
        padding: 16,
        borderRadius: 20,
    },
    eventContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventIcon: {
        fontSize: 36,
        marginRight: 15,
    },
    eventDetails: {
        flex: 1,
    },
    eventTitle: {
        color: '#ffffff',
        marginBottom: 8,
    },
    eventMeta: {
        gap: 15,
    },
    eventDate: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 13,
    },
    eventTime: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 13,
    },
    bottomSpacer: {
        height: 100,
    },
});
