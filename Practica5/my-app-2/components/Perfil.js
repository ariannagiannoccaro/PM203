//perfil usando destructuracion 
import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react';

export const Perfil = ({ nombre, carrera, materia, cuatri, estiloExt }) => {
    const [mostrar, setMostrar] = useState(false);
    return (
        <View style={[styles.tarjeta, estiloExt]}>
            <Text style={styles.nombre} >{nombre}</Text>

            {/* Renderizado condicional */}
            {mostrar &&
                /* Fragments*/
                <>
                    <Text style={styles.carrera}>{carrera}</Text>
                    <Text style={styles.otroTexto}>{materia}</Text>
                    <Text style={styles.otroTexto}>{cuatri}</Text>
                </>
            }
            <Button title="Mostrar Perfil" onPress={() => setMostrar(!mostrar)} />
        </View>
    )
}

const styles = StyleSheet.create({
    nombre: {
        fontSize: 24, //tamaño de letra
        fontWeight: 600, //es poner negritas, 100 es la más delgado y 900 la más gruesa
        textTransform: 'uppercase', //transforma el texto a mayúsculas
    },
    carrera: {
        fontSize: 18,
        color: 'blue',
        fontFamily: 'Roboto',
    },
    otroTexto: {
        fontSize: 12,
        fontFamily: 'Courier',
        fontStyle: 'italic',
    },
    tarjeta: {
        borderWidth: 2, //ancho del contorno de la tarjeta
        padding: 25, //margen interno
        margin: 15,
    },
})
