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

    // Efecto de tarjeta moderna (Sólida con sombra suave)
    glassCard: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 0, // Sin borde para look más limpio
        overflow: 'hidden',
        // Sombra suave por defecto
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },

    // Tarjeta pequeña
    glassCardSmall: {
        borderRadius: 20,
        padding: 16,
        borderWidth: 0,
        overflow: 'hidden',
        elevation: 3,
    },

    // Botón moderno
    glassButton: {
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        overflow: 'hidden',
        elevation: 4,
    },

    // Sombras
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },

    shadowSmall: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    // Texto
    titleLarge: {
        fontSize: 36,
        fontWeight: '800', // Más bold
        letterSpacing: -1,
        marginBottom: 8,
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -0.5,
    },

    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: -0.3,
    },

    body: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
    },

    bodySmall: {
        fontSize: 14,
        lineHeight: 20,
    },

    caption: {
        fontSize: 12,
        lineHeight: 16,
        opacity: 0.8,
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

    // Formas geométricas de fondo
    circleShape: {
        position: 'absolute',
        borderRadius: 999,
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
