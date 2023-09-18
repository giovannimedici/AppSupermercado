import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function Compra({ compra }) {
    console.log(compra);
    return (
        <View style={styles.compra} >

            <Text style={styles.listaProdutos}> Produtos comprados: {compra.produtos}</Text>
            <Text style={styles.listaProdutos}> Data da compra: {compra.data}</Text>
            <Text style={styles.listaProdutos}> Total da compra: ${compra.totalVenda}</Text>

        </View>
    );

};