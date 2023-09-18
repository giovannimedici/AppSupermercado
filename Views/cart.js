import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from 'my-app/styles';
import CatalogoProduto from '../componentes/Produto/produtoCatalogo';
import { AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import {
    createTableCompras,
    adicionaCompra,
} from 'my-app/services/dbservice';


export default function Cart({ navigation }) {
    const { carrinho } = navigation.state.params;
    const total = somarPrecos(carrinho);
    let tabelasCriadas = false;

    async function processamentoUseEffect() {
        if (!tabelasCriadas) {
            console.log('Verificando necessidade de criar tabelas...');
            tabelasCriadas = true;
            await createTableCompras();
        }
    }

    useEffect(
        () => {
            console.log('Executando useffect');
            processamentoUseEffect();
        }, []);


    function somarPrecos(carrinho) {
        let precoTotal = 0;

        for (let i = 0; i < carrinho.length; i++) {
            const precoComoString = carrinho[i].preco;
            const precoComoNumero = parseInt(precoComoString, 10);

            if (!isNaN(precoComoNumero)) {
                precoTotal += precoComoNumero;
            }
        }

        return precoTotal;
    }

    function confirmarCompra(carrinho) {
        Alert.alert('Atenção', 'Confirma a compra?',
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaCompra(carrinho)
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ]);
    }

    async function efetivaCompra(carrinho) {
        let obj = {
            id: createUniqueId(),
            produtos: geraStringProdutos(carrinho),
            data: formatarData(Date.now()),
            totalVenda: total.toString()
        }

        try {
            let resposta = (await adicionaCompra(obj))

            if (resposta)
                Alert.alert('Adicionado com sucesso');
            else
                Alert.alert('Erro ao salvar');

            Alert.alert('Dados da compra', "Id: " + obj.id +
                " Produtos: " + obj.produtos +
                " Data: " + obj.data +
                " Total da venda: " + obj.totalVenda + " ", [
                {
                    text: 'Ok',
                    style: 'cancel'
                }
            ])
        }
        catch(e){
            Alert.alert(e.toString());
        }
    }

    function formatarData(data) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        const formatted = new Intl.DateTimeFormat('pt-BR', options).format(data);
        return formatted;
    }

    function geraStringProdutos(carrinho) {
        let produtos = "";

        for (i = 0; i < carrinho.length; i++) {
            produtos += carrinho[i].nome + " ; ";
        }

        return produtos;
    }

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Carrinho</Text>
            <Text style={styles.total}>TOTAL À PAGAR: ${total}</Text>
            <ScrollView
                style={styles.listaProdutos}
            >
                {
                    carrinho.map((produto, index) => (
                        <CatalogoProduto produto={produto} key={index.toString()}
                        />
                    ))
                }

            </ScrollView>

            <View style={styles.navigationBar}>
                <TouchableOpacity onPress={() => navigation.navigate('Catalogo')}>
                    <Text style={styles.navigationText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => confirmarCompra(carrinho)}>
                    <AntDesign name="creditcard" size={30} color="white" style={styles.iconCreditCard}></AntDesign>
                    <Text style={styles.navigationTextFinalizar}>Finalizar Compra</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style='auto' />
        </View>
    )
}