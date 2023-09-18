import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    compra: {
        backgroundColor: '#a9baae',
        height: 100,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    listaNome: {
        width: '50%',
        fontSize: 18,
        paddingRight: 10,
    },

    dadosListaProdutos: {
        width: '40%',
        flexDirection: 'row',
    },
    dadosBotoesAcao: {
        flexDirection: 'row',
        paddingRight: 10
    },
    iconTelefone: {
        width: 20,
        height: 25,
        marginRight: 5,
    },
    listaProdutos: {
        color: "#FFF",
        fontSize: 18,
    },


});

export default styles;