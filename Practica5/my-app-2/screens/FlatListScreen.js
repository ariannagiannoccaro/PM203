// zona1: importaciones de componetes y archivos  

import { StatusBar } from 'expo-status-bar'; //puede ser opcion quitarlo o no 
import { StyleSheet, Text, View, } from 'react-native';


// zona2 main aquí van los componetes
export default function FlatListScreen() {
  return (
    <View style={styles.container}>
      <Text>Aqui va la practica de Aaron </Text>
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
    justifyContent: 'flex-start',
    flexDirection: 'row' 
  }, 

});