import React, { useState } from 'react';
import { Alert, Platform, View, SafeAreaView, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { resolveApiBaseUrl } from '../config/apiConfig.mjs';

const API_BASE_URL = resolveApiBaseUrl({
  platform: Platform.OS,
  expoHostUri: Constants.expoConfig?.hostUri,
});

console.log('API_BASE_URL:', API_BASE_URL);

export default function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
      return;
    }

    Alert.alert(titulo, mensaje);
  };

  const guardarUsuario = async () => {
    const nombreLimpio = nombre.trim();
    const edadNumero = Number.parseInt(edad, 10);

    if (nombreLimpio === '' || edad.trim() === '') {
      mostrarMensaje('Campos vacios', 'Todos los campos son obligatorios.');
      return;
    }

    if (Number.isNaN(edadNumero) || edadNumero < 0 || edadNumero > 120) {
      mostrarMensaje('Edad invalida', 'La edad debe ser un numero entre 0 y 120.');
      return;
    }

    try {
      setCargando(true);

      const respuesta = await fetch(`${API_BASE_URL}/v1/usuarios/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombreLimpio,
          edad: edadNumero,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo guardar el usuario.');
      }

      await respuesta.json();
      mostrarMensaje('Exito', 'Se guardo el usuario correctamente.');
      setNombre('');
      setEdad('');
    } catch (error) {
      console.log('Error API:', error);
      mostrarMensaje('Error', 'No se pudo conectar guardar.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.titulo}>
          Registro de Usuarios
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable
          disabled={cargando}
          style={[styles.boton, cargando && styles.botonDeshabilitado]}
          onPress={guardarUsuario}
        >
          <Text style={styles.textoBoton}>
            {cargando ? 'Guardando...' : 'Agregar Usuario'}
          </Text>
        </Pressable>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    elevation: 5, 
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#1F2937',
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#29bb0c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  botonDeshabilitado: {
    backgroundColor: '#7cbf70',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

}); 