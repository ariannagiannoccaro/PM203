// zona1: importaciones de componetes y archivos  

import { StatusBar } from 'expo-status-bar'; //puede ser opcion quitarlo o no 
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludo2} from './components/Saludo2';

// zona2 main aquí van los componetes
export default function App() {
  return (
    <View style={styles.container}>
      <Image></Image>
      <Image source={require('./assets/wave.png')}/>
      <Text>!------------------Componentes Nativos------------------</Text>
      <Text>!Hola mundo React Native</Text>

      <Text>!------------------Componentes Propios simples-----------</Text>
      <Saludo></Saludo>
      
      
      <Text>!------------------Componentes Propios Compuestos------</Text>
      {/* <Saludo></Saludo> */}
      <Saludo2></Saludo2>
      <StatusBar style="auto" />
    </View>
  );
}


// Zona 3 Estilos y Posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});