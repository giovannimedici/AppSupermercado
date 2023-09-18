import { react, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from 'my-app/styles';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View>
            <Text style={styles.tituloMenu}>Menu Inicial</Text>
            <View style={styles.container}>
                <TouchableOpacity style={styles.botaoCadastro} onPress={() => navigation.navigate('CadastroProduto')}>
                    <Text style={styles.textoBotao}>Cadastro de Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCompras} onPress={() => navigation.navigate('Catalogo')}>
                    <Text style={styles.textoBotao}>Catálogo de Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCompras} onPress={() => navigation.navigate('ConsultaCompras')}>
                    <Text style={styles.textoBotao}>Consulta de Compras</Text>
                </TouchableOpacity>
                
            </View>
            <StatusBar style="auto" />
        </View>

    )
}