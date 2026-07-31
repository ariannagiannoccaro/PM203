import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import Constants from 'expo-constants';
import { resolveApiBaseUrl } from '../config/apiConfig.mjs';

const API_BASE_URL = resolveApiBaseUrl({
  platform: Platform.OS,
  expoHostUri: Constants.expoConfig?.hostUri,
});

console.log('API_BASE_URL:', API_BASE_URL);

export default function ConsultaUsuariosScreen() {

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);
      setError('');

      const respuesta = await fetch(`${API_BASE_URL}/v1/usuarios/`);

      if (!respuesta.ok) {
        throw new Error('No se pudo consultar la lista de usuarios.');
      }

      const datos = await respuesta.json();
      setUsuarios(datos.usuarios ?? []);
    } catch (apiError) {
      console.log('Error API:', apiError);
      setError('No se pudo conectar con la API.');
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(useCallback(() => {
    obtenerUsuarios();
  }, []));

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <Pressable
        style={styles.botonDetalle}
        onPress={() => router.push({
          pathname: '/usuarios/[id]',
          params: {
            id: item.id,
            nombre: item.nombre,
            edad: item.edad,
          },
        })}
      >
        <Text style={styles.textoBotonDetalle}>Ver detalle</Text>
      </Pressable>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#2563EB" style={styles.loader} />
      ) : error ? (
        <View style={styles.estado}>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.botonActualizar} onPress={obtenerUsuarios}>
            <Text style={styles.textoBotonActualizar}>Reintentar</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTarjeta}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={styles.vacio}>No hay usuarios registrados.</Text>
          }
        />
      )}

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  loader: {
    marginTop: 30,
  },

  estado: {
    alignItems: 'center',
    marginTop: 30,
  },

  error: {
    color: '#B91C1C',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },

  vacio: {
    color: '#4B5563',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
  },

  botonActualizar: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  textoBotonActualizar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botonDetalle: {
    backgroundColor: '#2563EB',
    borderRadius: 10,
    marginTop: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },

  textoBotonDetalle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

});