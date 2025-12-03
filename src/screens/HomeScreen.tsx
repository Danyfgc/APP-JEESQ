import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { GlassCard } from '../components/GlassCard';
import { GlassButton } from '../components/GlassButton';
import { DailyReadingCard } from '../components/DailyReadingCard';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { getTodayReading } from '../data/readingCalendar';
import { HomeStackParamList } from '../navigation/HomeStack';

const { width } = Dimensions.get('window');

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

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
        <View style={styles.container}>
            <LinearGradient
                colors={['#0f0f1e', '#1a1a2e', '#2d1b4e']}
                style={styles.gradient}
            >
                <StatusBar style="light" />
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Text style={[globalStyles.titleLarge, styles.title]}>
                            Jesús es el Señor
                        </Text>
                        <Text style={[globalStyles.body, styles.subtitle]}>
                            Bienvenido a nuestra comunidad
                        </Text>
                    </View>

                    {/* Hero Card */}
                    <GlassCard gradient style={styles.heroCard}>
                        <Text style={[globalStyles.title, styles.heroTitle]}>
                            ✨ Comunidad de Fe
                        </Text>
                        <Text style={[globalStyles.body, styles.heroText]}>
                            Un espacio para crecer juntos en la fe, compartir experiencias y
                            fortalecer nuestro camino espiritual.
                        </Text>
                        <View style={styles.mt20}>
                            <GlassButton
                                title="Explorar"
                                onPress={() => console.log('Explorar')}
                                variant="primary"
                            />
                        </View>
                    </GlassCard>

                    {/* Daily Reading Card */}
                    <DailyReadingCard onPress={handleReadingPress} />

                    {/* Feature Cards Grid */}
                    <View style={styles.grid}>
                        <View style={styles.gridRow}>
                            <TouchableOpacity
                                style={styles.featureCardContainer}
                                onPress={handleReadingPress}
                                activeOpacity={0.8}
                            >
                                <GlassCard style={styles.featureCard}>
                                    <Text style={styles.featureIcon}>📖</Text>
                                    <Text style={[globalStyles.subtitle, styles.featureTitle]}>
                                        Lecturas
                                    </Text>
                                    <Text style={[globalStyles.bodySmall, styles.featureText]}>
                                        Reflexiones diarias
                                    </Text>
                                </GlassCard>
                            </TouchableOpacity>

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
                            <GlassCard style={styles.featureCard}>
                                <Text style={styles.featureIcon}>👥</Text>
                                <Text style={[globalStyles.subtitle, styles.featureTitle]}>
                                    Comunidad
                                </Text>
                                <Text style={[globalStyles.bodySmall, styles.featureText]}>
                                    Conecta con otros
                                </Text>
                            </GlassCard>

                            <GlassCard style={styles.featureCard}>
                                <Text style={styles.featureIcon}>🎵</Text>
                                <Text style={[globalStyles.subtitle, styles.featureTitle]}>
                                    Alabanza
                                </Text>
                                <Text style={[globalStyles.bodySmall, styles.featureText]}>
                                    Música y adoración
                                </Text>
                            </GlassCard>
                        </View>
                    </View>

                    {/* Info Card */}
                    <GlassCard style={styles.infoCard}>
                        <Text style={[globalStyles.subtitle, styles.infoTitle]}>
                            Próximo Encuentro
                        </Text>
                        <Text style={[globalStyles.body, styles.infoText]}>
                            Únete a nosotros este domingo para un tiempo de adoración y
                            comunión.
                        </Text>
                        <View style={[globalStyles.row, styles.mt15]}>
                            <Text style={styles.infoDetail}>📅 Domingo, 10:00 AM</Text>
                        </View>
                    </GlassCard>

                    {/* Bottom Spacing for Tab Bar */}
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
    bottomSpacer: {
        height: 100,
    },
});
