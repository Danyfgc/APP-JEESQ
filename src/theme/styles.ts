import { StyleSheet } from 'react-native';
import { colors } from './colors';

// Estilos globales y utilidades para efectos glassmorphism
export const globalStyles = StyleSheet.create({
    // Contenedor principal con gradiente
    gradientBackground: {
        flex: 1,
    },

    // Contenedor con padding estándar
    container: {
        flex: 1,
        padding: 20,
    },

    // Efecto de vidrio (glassmorphism)
    glassCard: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        overflow: 'hidden',
    },

    // Tarjeta de vidrio pequeña
    glassCardSmall: {
        borderRadius: 15,
        padding: 15,
        borderWidth: 1,
        overflow: 'hidden',
    },

    // Botón con efecto glass
    glassButton: {
        borderRadius: 15,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        overflow: 'hidden',
    },

    // Sombras
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },

    shadowSmall: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },

    // Texto
    titleLarge: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: -0.3,
    },

    subtitle: {
        fontSize: 18,
        fontWeight: '600',
    },

    body: {
        fontSize: 16,
        lineHeight: 24,
    },

    bodySmall: {
        fontSize: 14,
        lineHeight: 20,
    },

    caption: {
        fontSize: 12,
        lineHeight: 16,
    },

    // Utilidades de espaciado
    mt10: { marginTop: 10 },
    mt15: { marginTop: 15 },
    mt20: { marginTop: 20 },
    mt30: { marginTop: 30 },
    mb10: { marginBottom: 10 },
    mb15: { marginBottom: 15 },
    mb20: { marginBottom: 20 },
    mb30: { marginBottom: 30 },

    // Utilidades de layout
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    column: {
        flexDirection: 'column',
    },

    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

// Configuración de blur intensity para glassmorphism
export const blurConfig = {
    light: 10,   // Blur ligero
    medium: 20,  // Blur medio
    strong: 40,  // Blur fuerte
};

// Configuración de animaciones
export const animations = {
    duration: {
        fast: 200,
        normal: 300,
        slow: 500,
    },
    spring: {
        damping: 15,
        stiffness: 150,
    },
};
