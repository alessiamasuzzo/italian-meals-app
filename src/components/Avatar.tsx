// components/Avatar.tsx
import { useState } from "react";
import { View, Image, Text } from "react-native";
import { createStyles } from "../theme/styles";
import { useTheme } from "../contex/ThemeContex";

type Props = {
  uri: string;
  size?: number;
};

export function Avatar({ uri, size = 48 }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [failed, setFailed] = useState(false);

  return (
    <View style={[styles.avatarContainer, { width: size, height: size, borderRadius: size / 2 }]}>
      {failed ? (
        <Text style={{ textAlign: "center", lineHeight: size, color: theme.colors.text }}>?</Text>
      ) : (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          onError={() => setFailed(true)}
          accessibilityLabel="Avatar utente"
        />
      )}
    </View>
  );
}