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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { globalStyles } from '../theme/styles';
import { useTheme } from '../theme/ThemeContext';
import { fetchCommunityData, CommunityCategory, CommunityMember } from '../services/communityService';
import { GlassCard } from '../components/GlassCard';
import { StatusBar } from 'expo-status-bar';

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
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar style="light" />

            {/* Geometric Background Shapes */}
            <View style={[globalStyles.circleShape, {
                top: -60,
                right: -60,
                width: 280,
                height: 280,
                backgroundColor: theme.secondary.main, // Naranja
                opacity: 0.15,
            }]} />
            <View style={[globalStyles.circleShape, {
                bottom: 50,
                left: -80,
                width: 220,
                height: 220,
                backgroundColor: theme.primary.light, // Azul claro
                opacity: 0.1,
            }]} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color={theme.text.primary} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text.primary }]}>Comunidad</Text>
                <View style={styles.placeholder} />
            </View>

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
                                                <View style={[styles.avatarContainer, { backgroundColor: theme.primary.light + '30' }]}>
                                                    <Text style={[styles.avatarText, { color: theme.secondary.main }]}>
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
                                                    style={[styles.contactButton, { borderColor: theme.secondary.main }]}
                                                    onPress={() => handleContactPress(member.contact)}
                                                >
                                                    <Ionicons name="logo-whatsapp" size={20} color={theme.secondary.main} />
                                                    <Text style={[styles.contactText, { color: theme.secondary.main }]}>
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
        </View>
    );
};

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
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
    },
    placeholder: {
        width: 36,
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
        fontSize: 22,
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
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 20,
        fontWeight: 'bold',
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
        paddingVertical: 12,
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
