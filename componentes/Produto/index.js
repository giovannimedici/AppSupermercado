import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
// import iconTelefone from '../../img/phone.png';
import { Ionicons, Entypo } from '@expo/vector-icons';


export default function Produto({ produto, removerElemento, editar }) {
    return (
        <View style={styles.produto} >

            <Text style={styles.listaProdutos}> {produto.nome}</Text>
            <Text style={styles.listaProdutos}> ${produto.preco}</Text>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(produto.id)}>
                    <Ionicons name="md-remove-circle" size={20} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(produto.id)}>
                    <Entypo name="edit" size={20} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};