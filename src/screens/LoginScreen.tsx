// screens/LoginScreen.tsx
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { createStyles } from "../theme/styles";
import { useTheme } from "../contex/ThemeContex";
import { useAuth } from "../contex/AuthContext";

export function LoginScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    const success = login(email, password);
    if (!success) {
      setError("Email o password non validi");
    }
  }

  return (
    <View style={styles.loginContainer}>
      <Text accessibilityRole="header" style={styles.loginTitolo}>
        Italian Meals App
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.textMuted}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        accessibilityLabel="Campo email"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme.colors.textMuted}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="Campo password"
      />

      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

      <Pressable
        style={({ pressed }) => [styles.loginButton, pressed && styles.pressedFeedback]}
        onPress={handleLogin}
        accessibilityRole="button"
        accessibilityLabel="Accedi"
      >
        <Text style={styles.buttonLabel}>Accedi</Text>
      </Pressable>
    </View>
  );
}