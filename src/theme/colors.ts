// Sistema de colores con paleta oscura y clara para glassmorphism
export const colors = {
  // Colores primarios - Gradientes vibrantes
  primary: {
    light: '#667eea', // Azul/morado claro
    main: '#764ba2',  // Morado medio
    dark: '#5b3a8f',  // Morado oscuro
    gradient: ['#667eea', '#764ba2', '#f093fb'], // Gradiente principal
  },
  
  // Colores secundarios
  secondary: {
    light: '#f093fb',
    main: '#c471ed',
    dark: '#a855f7',
    gradient: ['#f093fb', '#f5576c'],
  },
  
  // Fondos oscuros
  dark: {
    background: '#0f0f1e',      // Fondo principal oscuro
    surface: '#1a1a2e',          // Superficie oscura
    elevated: '#252540',         // Superficie elevada
    glass: 'rgba(26, 26, 46, 0.7)', // Vidrio oscuro
  },
  
  // Fondos claros
  light: {
    background: '#f5f7fa',       // Fondo principal claro
    surface: '#ffffff',          // Superficie clara
    elevated: '#f0f2f5',         // Superficie elevada
    glass: 'rgba(255, 255, 255, 0.7)', // Vidrio claro
  },
  
  // Efectos de vidrio (glassmorphism)
  glass: {
    dark: {
      background: 'rgba(26, 26, 46, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.3)',
    },
    light: {
      background: 'rgba(255, 255, 255, 0.6)',
      border: 'rgba(255, 255, 255, 0.8)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
  },
  
  // Colores de texto
  text: {
    dark: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
    },
    light: {
      primary: '#1a1a2e',
      secondary: 'rgba(26, 26, 46, 0.7)',
      tertiary: 'rgba(26, 26, 46, 0.5)',
    },
  },
  
  // Colores de acento
  accent: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Exportar paletas completas por tema
export const darkTheme = {
  background: colors.dark.background,
  surface: colors.dark.surface,
  elevated: colors.dark.elevated,
  glass: colors.glass.dark,
  text: colors.text.dark,
  primary: colors.primary,
  secondary: colors.secondary,
  accent: colors.accent,
};

export const lightTheme = {
  background: colors.light.background,
  surface: colors.light.surface,
  elevated: colors.light.elevated,
  glass: colors.glass.light,
  text: colors.text.light,
  primary: colors.primary,
  secondary: colors.secondary,
  accent: colors.accent,
};
