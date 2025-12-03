import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { fetchBibleText, getBibleGatewayUrl } from '../services/bibleService';
import { formatDate } from '../utils/dateUtils';

type ReadingScreenRouteProp = RouteProp<{
    Reading: {
        reading: string;
        date?: string; // ISO string
    };
}, 'Reading'>;

export const ReadingScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<ReadingScreenRouteProp>();
    const { reading, date } = route.params;

    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [translation, setTranslation] = useState<string>('');

    const displayDate = date ? new Date(date) : new Date();

    useEffect(() => {
        loadReadingText();
    }, [reading]);

    const loadReadingText = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchBibleText(reading);

            if (result && result.text) {
                setText(result.text);
                setTranslation(result.translation_name);

                // Si la traducción es en inglés (WEB), mostramos opción de leer en español
                if (result.translation_name === 'WEB' || result.translation_name.includes('English')) {
                    setError('Texto disponible solo en inglés por el momento.');
                }
            } else {
                setError('No se pudo cargar el texto automáticamente.');
            }
        } catch (err) {
            setError('Ocurrió un error al cargar la lectura.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openInBrowser = () => {
        const url = getBibleGatewayUrl(reading);
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0f0f1e', '#1a1a2e', '#2d1b4e']}
                style={styles.gradient}
            >
                {/* Header */}
                <BlurView intensity={20} style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Lectura del Día</Text>
                    <View style={styles.placeholder} />
                </BlurView>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.card}>
                        <Text style={styles.date}>{formatDate(displayDate)}</Text>
                        <Text style={styles.reference}>{reading}</Text>

                        <View style={styles.divider} />

                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={colors.primary.main} />
                                <Text style={styles.loadingText}>Cargando sagradas escrituras...</Text>
                            </View>
                        ) : (
                            <>
                                {text && !error && (
                                    <Text style={styles.scriptureText}>{text}</Text>
                                )}

                                {error && (
                                    <View style={styles.errorContainer}>
                                        <Ionicons name="book-outline" size={48} color="rgba(255, 255, 255, 0.7)" />
                                        <Text style={styles.errorText}>
                                            {translation === 'WEB'
                                                ? "El texto se cargó en inglés. Para leer en español (Reina Valera 1960), por favor abre el enlace externo."
                                                : "No pudimos cargar el texto directamente en la aplicación."}
                                        </Text>

                                        <TouchableOpacity style={[styles.browserButton, globalStyles.shadow]} onPress={openInBrowser}>
                                            <Text style={styles.browserButtonText}>Leer en Biblia Católica (DHH)</Text>
                                            <Ionicons name="open-outline" size={20} color="#ffffff" style={{ marginLeft: 8 }} />
                                        </TouchableOpacity>

                                        {text && (
                                            <View style={{ marginTop: 30, width: '100%' }}>
                                                <Text style={[styles.date, { marginBottom: 10 }]}>Texto en Inglés ({translation}):</Text>
                                                <Text style={styles.scriptureText}>{text}</Text>
                                            </View>
                                        )}
                                    </View>
                                )}
                            </>
                        )}
                    </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    date: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    reference: {
        color: '#ffffff',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 20,
    },
    scriptureText: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 18,
        lineHeight: 32,
        fontFamily: 'System',
    },
    loadingContainer: {
        alignItems: 'center',
        padding: 40,
    },
    loadingText: {
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: 16,
    },
    errorContainer: {
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 24,
        lineHeight: 24,
        fontSize: 16,
    },
    browserButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: colors.primary.main,
        borderRadius: 30,
    },
    browserButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
