import { StatusBar } from 'expo-status-bar';
import {
  Alert, Text, TextInput, TouchableOpacity,
  View, Keyboard, ScrollView, Image, StyleSheet, Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from 'my-app/styles';
import Produto from 'my-app/componentes/Produto';

import {
  createTable,
  obtemTodosProdutos,
  adicionaProduto,
  alteraProduto,
  excluiProduto,
  excluiTodosProdutos,
} from 'my-app/services/dbservice';

export default function CadastroProduto({navigation}) {
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [preco, setPreco] = useState();
  const [produtos, setProdutos] = useState([]);
  let tabelasCriadas = false;

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log('Verificando necessidade de criar tabelas...');
      tabelasCriadas = true;
      await createTable();
    }

    await carregaDados();
  }

  useEffect(
    () => {
      console.log('Executando useffect');
      processamentoUseEffect();
    }, []);

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function salvaDados() {
    let novoRegistro = id == undefined;

    let obj = {
      id: novoRegistro ? createUniqueId() : id,
      nome: nome,
      preco: preco,
    };

    try {
      if (novoRegistro) {
        let resposta = (await adicionaProduto(obj))

        if (resposta)
          Alert.alert('Adicionado com sucesso');
        else
          Alert.alert('Erro ao salvar');
        carregaDados();
        limparCampos();
      }
      else {
        let resposta = await alteraProduto(obj);
        if (resposta)
          Alert.alert('Produto alterado com sucesso!');
        else
          Alert.alert('Falha ao alterar produto');
        carregaDados();
        limparCampos();
      }

      Keyboard.dismiss();

    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function carregaDados() {
    try {
      let produtos = await obtemTodosProdutos()
      setProdutos(produtos);
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function limparCampos() {
    setNome("");
    setPreco("");
    setId(undefined);
    Keyboard.dismiss();
  }

  function removerElemento(identificador) {
    Alert.alert('Atenção', 'Confirma a remoção do produto?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverElemento(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverElemento(identificador) {
    try {
      await excluiProduto(identificador);
      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
      Alert.alert('Produto excluído com sucesso!!!');
    } catch (e) {
      Alert.alert(e);
    }
  }

  function editar(identificador) {
    const produto = produtos.find(produto => produto.id == identificador);

    if (produto != undefined) {
      setId(produto.id);
      setNome(produto.nome);
      setPreco(produto.preco);
    }

    console.log(produto);
  }
//   const [scrollEnabled, setScrollEnabled] = useState(true);
//   const contentHeight = 1000;
//   const handleScroll = (event) => {
//     const scrollY = event.nativeEvent.contentOffset.y;
//     const windowHeight = Dimensions.get('window').height;
//     const threshold = contentHeight - windowHeight;


//     if (scrollY >= threshold) {
//       setScrollEnabled(false);
//     } else {
//       setScrollEnabled(true);
//     }
//   };


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Produtos</Text>
      <Text /><Text />


      <View style={styles.areaDados}>

        <View style={styles.areaNome}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setNome(texto)}
            value={nome} />
        </View>

        <View style={styles.areaPreco}>
          <Text style={styles.label}>Preço</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setPreco(texto)}
            value={preco}
            keyboardType='phone-pad' />
        </View>

        <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>+</Text>
        </TouchableOpacity>

      </View>






      <ScrollView
        style={styles.listaProdutos}
        // scrollEnabled={scrollEnabled}
        // onScroll={handleScroll}
        // scrollEventThrottle={16}
      >
        {
          produtos.map((produto, index) => (
            <Produto produto={produto} key={index.toString()}
              removerElemento={removerElemento} editar={editar} />
          ))
        }

      </ScrollView>

      <View style={styles.navigationBar}>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Text style={styles.navigationText}>Voltar</Text>
        </TouchableOpacity>
      </View>


      <StatusBar style="auto" />
    </View>
  );


}