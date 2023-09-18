import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
// import iconTelefone from '../../img/phone.png';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';


export default function CatalogoProduto({ produto, adicionarAoCarrinho }) {
    let quantidade = 0;
    return (
        <View style={styles.produto} >

            <Text style={styles.listaProdutos}> {produto.nome}</Text>
            <Text style={styles.listaProdutos}> ${produto.preco}</Text>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => adicionarAoCarrinho(produto)}>
                    <AntDesign name="shoppingcart" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );

};