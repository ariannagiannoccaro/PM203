import React, { useState } from 'react';
import { Alert, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import { resolveApiBaseUrl } from '../../../config/apiConfig.mjs';

const API_BASE_URL = resolveApiBaseUrl({
  platform: Platform.OS,
  expoHostUri: Constants.expoConfig?.hostUri,
});

console.log('API_BASE_URL:', API_BASE_URL);

const AUTH_HEADER = 'Basic YWRtaW46MTIzNA==';

export default function EditarUsuario() {
  const params = useLocalSearchParams();
  const [nombre, setNombre] = useState(params.nombre?.toString() ?? '');
  const [edad, setEdad] = useState(params.edad?.toString() ?? '');
  const [guardando, setGuardando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
      return;
    }

    Alert.alert(titulo, mensaje);
  };

  const actualizarUsuario = async () => {
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
      setGuardando(true);

      const respuesta = await fetch(`${API_BASE_URL}/v1/usuarios/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
        body: JSON.stringify({
          nombre: nombreLimpio,
          edad: edadNumero,
        }),
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo actualizar el usuario.');
      }

      mostrarMensaje('Actualizado', 'Usuario actualizado correctamente.');
      router.replace({
        pathname: '/usuarios/[id]',
        params: {
          id: params.id,
          nombre: nombreLimpio,
          edad: edadNumero,
        },
      });
    } catch (error) {
      console.log('Error API:', error);
      mostrarMensaje('Error', 'No se pudo actualizar el usuario.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Actualizar Usuario</Text>

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
          disabled={guardando}
          style={[styles.boton, guardando && styles.botonDeshabilitado]}
          onPress={actualizarUsuario}
        >
          <Text style={styles.textoBoton}>
            {guardando ? 'Actualizando...' : 'Actualizar Usuario'}
          </Text>
        </Pressable>

        <Pressable style={styles.botonVolver} onPress={() => router.back()}>
          <Text style={styles.textoVolver}>Cancelar</Text>
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
    padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
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
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  botonDeshabilitado: {
    backgroundColor: '#7FA4E8',
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  botonVolver: {
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 8,
  },

  textoVolver: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: 'bold',
  },
});