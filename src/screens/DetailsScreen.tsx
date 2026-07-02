//logica pagian di dettaglio per ogni prodotto

import { View, Text, StyleSheet } from "react-native";
import { PRODUCTS } from "../services/products";
import PrimaryButton from "../components/PrimaryButton";
import { styles } from "../theme/styles";

export default function DetailsScreen({ route, navigation} : any) {

    //leggo l'id passaro dalla schermata precedente
    const id = route.params?.id;

    //in caso di id mancante do feedback all'utente
    if (!id) {
        return (
            <View>
                <Text>Parametro di routing non valido</Text>
            </View>
        );
    }

    //cerco il prodotto corrispondente 
    const product = PRODUCTS.find((p) => p.id === id);

    //se id presente ma nessun prodotto corrisponde do un feedback all'utente
    if(!product) {
        return (
            <View>
                <Text>Prodotto non trovato</Text>
            </View>
        );
    }

    //trovo il prodotto
    return (
        <View>
            <Text style={styles.cardProduct}>{product.name} </Text>
            <Text style={styles.listaDettaglio}>{product.description}</Text>
            <PrimaryButton label="Indietro" onPress={() => navigation.goBack()}/>
        </View>
    );
    }