import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    ActivityIndicator,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { useTheme } from '../theme/ThemeContext';
import { fetchCommunityData, CommunityCategory, CommunityMember } from '../services/communityService';
import { GlassCard } from '../components/GlassCard';

export const CommunityScreen = () => {
    const navigation = useNavigation();
    const { theme, isDarkMode } = useTheme();
    const [categories, setCategories] = useState<CommunityCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await fetchCommunityData();
            setCategories(data);
        } catch (error) {
            console.error('Error loading community data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCommunityData(true);
        await loadData();
        setRefreshing(false);
    };

    const handleContactPress = (contact: string) => {
        // Intentar abrir WhatsApp o marcador
        const cleanNumber = contact.replace(/[^0-9+]/g, '');
        const url = `https://wa.me/${cleanNumber}`;

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Linking.openURL(`tel:${cleanNumber}`);
            }
        });
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={isDarkMode ? ['#0f0f1e', '#1a1a2e', '#2d1b4e'] : ['#f5f7fa', '#ffffff', '#e0e0e0']}
                style={styles.gradient}
            >
                {/* Header */}
                <BlurView intensity={20} tint={isDarkMode ? 'dark' : 'light'} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.text.primary} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.text.primary }]}>Comunidad</Text>
                    <View style={styles.placeholder} />
                </BlurView>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={theme.primary.main}
                        />
                    }
                >
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={theme.primary.main} />
                            <Text style={[styles.loadingText, { color: theme.text.secondary }]}>
                                Cargando información...
                            </Text>
                        </View>
                    ) : (
                        <>
                            {categories.length === 0 ? (
                                <View style={styles.emptyContainer}>
                                    <Ionicons name="people-outline" size={48} color={theme.text.tertiary} />
                                    <Text style={[styles.emptyText, { color: theme.text.secondary }]}>
                                        No hay información disponible
                                    </Text>
                                </View>
                            ) : (
                                categories.map((category) => (
                                    <View key={category.id} style={styles.categorySection}>
                                        <Text style={[styles.categoryTitle, { color: theme.text.primary }]}>
                                            {category.title}
                                        </Text>

                                        {category.members.map((member) => (
                                            <GlassCard key={member.id} style={styles.memberCard}>
                                                <View style={styles.memberHeader}>
                                                    <View style={styles.avatarContainer}>
                                                        <Text style={styles.avatarText}>
                                                            {member.name.charAt(0)}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.memberInfo}>
                                                        <Text style={[styles.memberName, { color: theme.text.primary }]}>
                                                            {member.name}
                                                        </Text>
                                                        <Text style={[styles.memberRole, { color: theme.text.secondary }]}>
                                                            {member.role}
                                                        </Text>
                                                    </View>
                                                </View>

                                                {member.contact && (
                                                    <TouchableOpacity
                                                        style={[styles.contactButton, { borderColor: theme.primary.light }]}
                                                        onPress={() => handleContactPress(member.contact)}
                                                    >
                                                        <Ionicons name="logo-whatsapp" size={20} color={theme.primary.main} />
                                                        <Text style={[styles.contactText, { color: theme.primary.main }]}>
                                                            Contactar
                                                        </Text>
                                                    </TouchableOpacity>
                                                )}
                                            </GlassCard>
                                        ))}
                                    </View>
                                ))
                            )}
                        </>
                    )}

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
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    placeholder: {
        width: 40,
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
        marginTop: 16,
        fontSize: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
    },
    categorySection: {
        marginBottom: 30,
    },
    categoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    memberCard: {
        marginBottom: 16,
    },
    memberHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(118, 75, 162, 0.2)', // Primary color with opacity
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#764ba2', // Primary main
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    memberRole: {
        fontSize: 14,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        gap: 8,
    },
    contactText: {
        fontSize: 14,
        fontWeight: '600',
    },
    bottomSpacer: {
        height: 40,
    },
});
