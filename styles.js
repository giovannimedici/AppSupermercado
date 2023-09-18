        import { StyleSheet } from 'react-native';

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
            },
            titulo: {
                fontSize: 40,
                color: '#a9baae',
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Roboto'
            },
            total: {
                fontSize: 20,
                color: '#a9baae',
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Roboto'
            },
            tituloMenu: {
                fontSize: 40,
                color: '#a9baae',
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Roboto',
                marginTop: 40
            },
            label: {
                color: '#a9baae',
                marginLeft: 10
            },
            caixaTexto: {
                borderColor: "#a9baae",
                borderWidth: 0.5,
                height: 35,
                width: '90%',
                paddingHorizontal: 10,
                color: "#a9baae",
                marginLeft: 10
            },
            botao: {
                width: '10%',
                height: 35,
                borderColor: "#a9baae",
                borderWidth: 2,
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#a9baae',
                marginTop: 20
            },
            botaoCadastro: {
                width: '50%',
                height: 35,
                borderColor: "#a9baae",
                borderWidth: 2,
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#a9baae',
                marginTop: 300
            },
            botaoCompras: {
                width: '50%',
                height: 35,
                borderColor: "#a9baae",
                borderWidth: 2,
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#a9baae',
                marginTop: 20
            },
            areaDados: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%'
            },
            areaBotoes: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '20%'
            },
            textoBotao: {
                color: '#FFF',
            },
            areaNome: {
                width: '55%',
            },
            areaPreco: {
                width: '30%',
            },

            listaProdutos: {
                width: '100%',
                height: '100%',
                backgroundColor: '#FFF',
                marginTop: 20,
            },
            produto: {
                backgroundColor: '#ed8f1c',
                flexDirection: 'row',
                height: 80,
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
                elevation: 3,
            },
            listaNome: {
                width: '50%',
                fontSize: 18,
                paddingRight: 10,
            },

            dadosLista: {
                width: '40%',
                flexDirection: 'row',
            },
            dadosBotoesAcao: {
                width: '10%',
            },
            iconTelefone: {
                width: 20,
                height: 25,
                marginRight: 5,
            },
            listaPreco: {
                color: "#FFF",
                fontSize: 18,
            },
            navigationBar: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#a9baae', 
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
                flexDirection: 'row',
                
            },
            navigationText: {
                color: '#FFF',
                fontSize: 18,
                fontWeight: 'bold',
                marginRight: 200
            },
            navigationTextFinalizar: {
                color: '#FFF',
                fontSize: 18,
                fontWeight: 'bold'
            },
            iconCreditCard: {
                marginRight: 20
            }
        });

        export default styles;