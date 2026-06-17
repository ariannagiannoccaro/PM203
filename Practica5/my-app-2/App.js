// zona1: importaciones de componetes y archivos  

import { StatusBar } from 'expo-status-bar'; //puede ser opcion quitarlo o no 
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';

// zona2 main aquí van los componetes
export default function App() {
  return (
    <View style={styles.container}>
      <Perfil estiloExt={styles.tarjetaRoja}
        nombre="Arianna"
        carrera="Ingenieria en Sistemas"
        materia="Programacion Movil"
        cuatri="9no">

      </Perfil>
      <Perfil estiloExt={styles.tarjetaVerde}
        nombre="Jorge"
        carrera="Ingenieria en Sistemas"
        materia="BD"
        cuatri="10">

      </Perfil>
      <StatusBar style="auto" />
      <Perfil estiloExt={styles.tarjetaRoja}
        nombre="Arianna2"
        carrera="Ingenieria en Sistemas"
        materia="Programacion Movil"
        cuatri="9no">

      </Perfil>

    </View>
  );
}


// Zona 3 Estilos y Posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row' 
  }, 

  tarjetaRoja: {
    backgroundColor: '#FF6B6B',
  },

  tarjetaVerde: {
    backgroundColor: '#6BCB77',
  }
});