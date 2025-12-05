// Sistema de colores con paleta "Design Studio" (Azul Profundo, Naranja, Amarillo)
export const colors = {
  // Colores primarios - Azul Profundo
  primary: {
    light: '#7077A1', // Azul lavanda suave
    main: '#424769',  // Azul medio
    dark: '#2D3250',  // Azul oscuro profundo (Fondo principal)
    gradient: ['#2D3250', '#424769', '#7077A1'],
  },

  // Colores secundarios - Acentos Vibrantes
  secondary: {
    light: '#F9E0BB', // Amarillo crema
    main: '#F6B17A',  // Naranja suave
    dark: '#FF9843',  // Naranja vibrante
    gradient: ['#F6B17A', '#FF9843'],
  },

  // Fondos oscuros (Modo por defecto)
  dark: {
    background: '#2D3250',      // Fondo principal (Azul oscuro)
    surface: '#424769',          // Superficie (Azul medio)
    elevated: '#7077A1',         // Superficie elevada
    glass: 'rgba(66, 71, 105, 0.9)', // Casi sólido
  },

  // Fondos claros
  light: {
    background: '#F5F5F5',       // Gris muy claro
    surface: '#FFFFFF',          // Blanco
    elevated: '#FFFFFF',         // Blanco
    glass: 'rgba(255, 255, 255, 0.95)', // Sólido
  },

  // Efectos de tarjeta (Modern Card)
  glass: {
    dark: {
      background: '#424769', // Sólido para alto contraste
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.4)',
    },
    light: {
      background: '#FFFFFF',
      border: 'rgba(0, 0, 0, 0.05)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
  },

  // Colores de texto
  text: {
    dark: {
      primary: '#FFFFFF',
      secondary: '#F9E0BB', // Amarillo claro para subtítulos
      tertiary: 'rgba(255, 255, 255, 0.6)',
    },
    light: {
      primary: '#2D3250', // Azul oscuro
      secondary: '#424769', // Azul medio
      tertiary: '#7077A1',
    },
  },

  // Colores de acento
  accent: {
    success: '#10b981',
    warning: '#FF9843', // Naranja
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
