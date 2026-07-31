
import React, { useState } from 'react';
import { Alert, Modal, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';
import { resolveApiBaseUrl } from '../../config/apiConfig.mjs';

const API_BASE_URL = resolveApiBaseUrl({
  platform: Platform.OS,
  expoHostUri: Constants.expoConfig?.hostUri,
});

console.log('API_BASE_URL:', API_BASE_URL);

const AUTH_HEADER = 'Basic YWRtaW46MTIzNA==';

export default function DetalleUsuario() {
  const { id, nombre, edad } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
      return;
    }

    Alert.alert(titulo, mensaje);
  };

  const eliminarUsuario = async () => {
    try {
      setEliminando(true);

      const respuesta = await fetch(`${API_BASE_URL}/v1/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: AUTH_HEADER,
        },
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar el usuario.');
      }

      setModalVisible(false);
      mostrarMensaje('Eliminado', 'Usuario eliminado correctamente.');
      router.replace('/consulta');
    } catch (error) {
      console.log('Error API:', error);
      mostrarMensaje('Error', 'No se pudo eliminar el usuario.');
    } finally {
      setEliminando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalles Usuario</Text>

        <Text style={styles.label}>ID</Text>
        <Text style={styles.valor}>{id}</Text>

        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.valor}>{edad} años</Text>

        <Pressable
          style={styles.botonEditar}
          onPress={() => router.push({
            pathname: '/usuarios/editar/[id]',
            params: { id, nombre, edad },
          })}
        >
          <Text style={styles.textoBoton}>Editar</Text>
        </Pressable>

        <Pressable
          style={styles.botonEliminar}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textoBoton}>Eliminar</Text>
        </Pressable>

      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFondo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Confirmar eliminacion</Text>
            <Text style={styles.modalTexto}>
              ¿Deseas eliminar a {nombre}?
            </Text>

            <Pressable
              disabled={eliminando}
              style={styles.botonEliminar}
              onPress={eliminarUsuario}
            >
              <Text style={styles.textoBoton}>
                {eliminando ? 'Eliminando...' : 'Si, eliminar'}
              </Text>
            </Pressable>

            <Pressable
              style={styles.botonCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 22,
    textAlign: 'center',
  },

  label: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 10,
  },

  valor: {
    color: '#1F2937',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 4,
  },

  botonEditar: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 24,
  },

  botonEliminar: {
    backgroundColor: '#DC2626',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 12,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },

  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 22,
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },

  modalTexto: {
    color: '#4B5563',
    fontSize: 16,
    marginBottom: 12,
  },

  botonCancelar: {
    alignItems: 'center',
    paddingVertical: 13,
    marginTop: 8,
  },

  textoCancelar: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
