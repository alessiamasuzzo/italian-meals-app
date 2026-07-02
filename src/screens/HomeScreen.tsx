//logica della pagina Home 
//mostro i piatti 

import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import {PRODUCTS, Product} from "../services/products";
import { styles } from "../theme/styles";

export default function HomeScreen({ navigation }: any) {
    return (
        <View>
            <FlatList 
            data={PRODUCTS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Pressable
                onPress={() => navigation.navigate("Details", { id: item.id})}
                style={styles.cardProduct}
                >
                <Text>{item.name}</Text>
            </Pressable>
            )}
            >
            </FlatList>
        </View>
    )
}