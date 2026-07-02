import { Pressable, Text, StyleSheet } from "react-native";
import { styles } from "../theme/styles";

//tipizzazione delle props
type PrimaryButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
};

//rendo il componente importabile da altri file
export default function PrimaryButton({
    label,
    onPress,
    disabled = false,
    loading = false,
}: PrimaryButtonProps) {
    return (
        <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({ pressed }) => [
            styles.button, 
            //se il button è disabilitato o loading passo lo stile con background color grigio
            (disabled || loading) && styles.buttonDisabled,
            //se pressato lo rendo opaco
            pressed && styles.buttonPressed,
        ]}
        >
            {/* testo del button, cambia ogni bvolta, uso la props label che lo rende riutilizzabile */}
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    )
}