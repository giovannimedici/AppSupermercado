import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from 'my-app/styles';
import CatalogoProduto from 'my-app/componentes/Produto/produtoCatalogo';
import { useState, useEffect } from 'react';
import {
    createTable,
    obtemTodosProdutos,
} from 'my-app/services/dbservice';
import { AntDesign } from '@expo/vector-icons';

export default function Catalogo({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    let tabelasCriadas = false;
    const [carrinho, setCarrinho] = useState([]);
    const [quantidade, setQuantidade] = useState();
    const [id, setId] = useState();

    const adicionarAoCarrinho = (produto) => {
        let obj = {
            id: createUniqueId(),
            nome: produto.nome,
            preco: produto.preco
        }
        setCarrinho([...carrinho, obj]);
    }
    console.log(carrinho);
    useEffect(
        () => {
            console.log('Executando useffect');
            processamentoUseEffect();
        }, []);

    async function processamentoUseEffect() {
        if (!tabelasCriadas) {
            console.log('Verificando necessidade de criar tabelas...');
            tabelasCriadas = true;
            await createTable();
        }

        await carregaDados();
    }

    async function carregaDados() {
        try {
            let produtos = await obtemTodosProdutos()
            setProdutos(produtos);
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Catálogo de produtos</Text>
            <ScrollView
                style={styles.listaProdutos}
            >
                {
                    produtos.map((produto, index) => (
                        <CatalogoProduto produto={produto} key={index.toString()}
                            adicionarAoCarrinho={adicionarAoCarrinho} />
                    ))
                }

            </ScrollView>

            <View style={styles.navigationBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.navigationText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart', {carrinho})}>
                    <AntDesign name="shoppingcart" size={40} color="white" />
                </TouchableOpacity>
            </View>
 
            <StatusBar style='auto' />
        </View>
    )
}