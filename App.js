import { StatusBar } from "expo-status-bar";
import {Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import CadastroProduto from "./Views/cadastroProduto";
import Home from './Views/home';
import Catalogo from "./Views/catalogo";
import Cart from './Views/cart';
import ConsultaCompras from "./Views/consultaCompras";

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    CadastroProduto,
    Catalogo,
    Cart, 
    ConsultaCompras
  })
)

export default function App(){
  return(
    <Routes/>
  );
}