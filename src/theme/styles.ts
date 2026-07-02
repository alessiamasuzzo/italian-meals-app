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
    }

})

