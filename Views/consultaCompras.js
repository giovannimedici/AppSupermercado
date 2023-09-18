import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from 'my-app/styles';
import CatalogoProduto from '../componentes/Produto/produtoCatalogo';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {
    createTableCompras,
    obtemTodasCompras
} from 'my-app/services/dbservice';
import Compra from '../componentes/Compra';

export default function ConsultaCompras({ navigation }) {
    const [compras, setCompras] = useState([]);
    let tabelasCriadas = false;

    async function processamentoUseEffect() {
        if (!tabelasCriadas) {
            console.log('Verificando necessidade de criar tabelas...');
            tabelasCriadas = true;
            await createTableCompras();
        }

        await carregaDados();
    }

    useEffect(
        () => {
            console.log('Executando useffect');
            processamentoUseEffect();
        }, []);

    async function carregaDados() {
        try {
            let listaCompras = await obtemTodasCompras()
            setCompras(listaCompras);
            
        } catch (e) {
            Alert.alert(e.toString());
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.tituloMenu}>Histórico de Compras</Text>
            <ScrollView
                style={styles.listaProdutos}
            >
                {
                    compras.map((compra, index) => (
                        <Compra compra={compra} key={index.toString()} />
                    ))
                }

            </ScrollView>
            <View style={styles.navigationBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navigationText}>Voltar</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </View>
    )
}