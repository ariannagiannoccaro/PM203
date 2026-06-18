// zona1: importaciones de componetes y archivos  

import { StatusBar } from 'expo-status-bar'; //puede ser opcion quitarlo o no 
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from '../components/Perfil'; //punto extra

// zona2 main aquí van los componetes
export default function TarjetasScreen() { //cambiar el nombre de la funcion 
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
        justifyContent: 'center',
        flexDirection: 'column'
    },

    tarjetaRoja: {
        backgroundColor: '#FF6B6B',
    },

    tarjetaVerde: {
        backgroundColor: '#6BCB77',
    }
});