//file con variabili di stile riutilizzabili

export const colors = {
    primary: "#a1021c",
    primaryDisabled: "#866b71",
    secondary: "#ff0000",
    background: "#f0eded",
    error: "#b00020",
    textMuted: "#777777",
    
}

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
}

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    round: 100,

}

export const lightTheme = {
    mode: "light" as const,
    colors: {
        primary: "#a1021c",
        primaryDisabled: "#866b71",
        secondary: "#da0226",
        background: "#f0eded",
        card: "#ffffff",
        text: "#111111",
        textMuted: "#555555",
        error: "#b00020",
    },
}

export const darkTheme = {
    mode: "dark" as const,
    colors: {
        primary: "#da0226",
        primaryDisabled: "#5c4247",
        secondary: "#ff4d6d",
        background: "#121212",
        card: "#1e1e1e",
        text: "#f5f5f5",
        textMuted: "#b0b0b0",
        error: "#ff6679",
    },
}

export type AppTheme = typeof lightTheme;