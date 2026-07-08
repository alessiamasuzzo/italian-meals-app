//pagina degli stili (come se fosse css)

import { StyleSheet } from "react-native";
import { borderRadius, colors, spacing } from "./tokens";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    button: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.round,
        width: 100,
        alignItems: "center",
        marginLeft: 10,
        marginTop: 7,
    },

    buttonDisabled: {
        backgroundColor: colors.primaryDisabled,

    },

    buttonPressed: {
        opacity: 0.8,
    },

    buttonLabel: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

    cardProduct: {
        borderRadius: borderRadius.md,
        borderColor: colors.secondary,
        borderWidth: 2,
        backgroundColor: "white",
        padding: spacing.md,
        margin: 10,
    },

    listaDettaglio: {
        padding: spacing.sm,
        marginLeft: 7,
    },

    // --- lista piatti ---
    listaContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },

    listaContent: {
        padding: spacing.sm,
    },

    mealCard: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: borderRadius.md,
        borderColor: colors.secondary,
        borderWidth: 1,
        backgroundColor: "white",
        padding: spacing.sm,
        marginBottom: spacing.sm,
    },

    mealThumb: {
        width: 64,
        height: 64,
        borderRadius: borderRadius.sm,
        marginRight: spacing.md,
    },

    mealTitle: {
        fontSize: 16,
        fontWeight: "600",
        flexShrink: 1,
    },

    // --- stati loading / error ---
    centerBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg,
    },

    errorText: {
        color: colors.error,
        fontSize: 15,
        textAlign: "center",
        marginBottom: spacing.md,
    },

    emptyText: {
        color: colors.textMuted,
        fontSize: 15,
        textAlign: "center",
    },

    // --- preferiti ---
    favButton: {
        padding: spacing.sm,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: borderRadius.sm,
        marginLeft: spacing.sm,
    },

    favText: {
        fontSize: 18,
    },

    subtitle: {
        color: colors.textMuted,
        marginBottom: spacing.sm,
        marginLeft: spacing.sm,
    },

})

