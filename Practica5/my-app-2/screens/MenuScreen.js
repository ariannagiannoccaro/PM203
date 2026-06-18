// zona1: importaciones de componetes y archivos  

import { StatusBar } from 'expo-status-bar'; //puede ser opcion quitarlo o no 
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import TextInputScreen from './TextInputScreen';
import PressableScreen from './PressableScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import ModalScreen from './ModalScreen';

// zona2 main aquí van los componetes
export default function MenuScreen() {

    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen />;
        case 'safeArea':
            return <SafeAreaScreen />;
        case 'textInput':
            return <TextInputScreen />;
        case 'pressable':
            return <PressableScreen />;
        case 'flatList':
            return <FlatListScreen />;
        case 'imageBackground':
            return <ImageBackgroundScreen />;
        case 'activityIndicator':
            return <ActivityIndicatorScreen />;
        case 'modal':
            return <ModalScreen />;
        case 'menu':
        default:
            return (
                <View style={styles.container}>

                    <Text>Menu de Practicas: </Text>

                    <Button onPress={() => setScreen('tarjetas')} title='Practica: Tarjetas' />

                    <Button onPress={() => setScreen('safeArea')} title='Practica: SafeAreaView' />

                    <Button onPress={() => setScreen('textInput')} title='Practica: TextInput' />

                    <Button onPress={() => setScreen('pressable')} title='Practica: Pressable' />

                    <Button onPress={() => setScreen('flatList')} title='Practica: FlatList' />

                    <Button onPress={() => setScreen('imageBackground')} title='Practica: ImageBackground' />

                    <Button onPress={() => setScreen('activityIndicator')} title='Practica: ActivityIndicator' />

                    <Button onPress={() => setScreen('modal')} title='Practica: Modal' />

                    <StatusBar style="auto" />

                </View>
            );
    }
}


// Zona 3 Estilos y Posicionamiento
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },

});