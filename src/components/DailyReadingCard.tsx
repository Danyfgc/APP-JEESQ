import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GlassCard } from './GlassCard';
import { getTodayReading } from '../data/readingCalendar';
import { getBibleSummary } from '../services/bibleService';
import { formatDateShort } from '../utils/dateUtils';
import { globalStyles } from '../theme/styles';
import { colors } from '../theme/colors';

interface DailyReadingCardProps {
    onPress?: () => void;
}

export const DailyReadingCard: React.FC<DailyReadingCardProps> = ({ onPress }) => {
    const [reading, setReading] = useState<string>('');
    const [bibleText, setBibleText] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        loadTodayReading();
    }, []);

    const loadTodayReading = async () => {
        try {
            setLoading(true);
            const todayReading = getTodayReading();

            if (!todayReading) {
                setReading('No hay lectura programada');
                setBibleText('');
                setLoading(false);
                return;
            }

            setReading(todayReading.reading);

            // Intentar obtener el texto de la API
            const summary = await getBibleSummary(todayReading.reading, 250);
            setBibleText(summary);

        } catch (error) {
            console.error('Error loading reading:', error);
            setBibleText('No se pudo cargar el texto bíblico');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.9} disabled={!onPress}>
            <GlassCard gradient style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.icon}>📖</Text>
                    <View style={styles.headerText}>
                        <Text style={[globalStyles.subtitle, styles.title]}>
                            Lectura del Día
                        </Text>
                        <Text style={[globalStyles.bodySmall, styles.date]}>
                            {formatDateShort(date)}
                        </Text>
                    </View>
                    {onPress && (
                        <View style={styles.arrowContainer}>
                            <Text style={styles.arrow}>→</Text>
                        </View>
                    )}
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#ffffff" />
                        <Text style={[globalStyles.bodySmall, styles.loadingText]}>
                            Cargando lectura...
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={[globalStyles.body, styles.reference]}>
                            {reading}
                        </Text>

                        {bibleText && (
                            <Text style={[globalStyles.bodySmall, styles.text]}>
                                {bibleText}
                            </Text>
                        )}
                    </>
                )}
            </GlassCard>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        fontSize: 32,
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    title: {
        color: '#ffffff',
        marginBottom: 4,
    },
    date: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
    arrowContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrow: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    reference: {
        color: '#ffffff',
        fontWeight: '600',
        marginBottom: 12,
        fontSize: 16,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.85)',
        lineHeight: 22,
        fontStyle: 'italic',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.7)',
        marginLeft: 10,
    },
});
