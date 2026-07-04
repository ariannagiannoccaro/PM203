import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

SplashScreen.preventAutoHideAsync().catch(() => { });

export default function LibroScreen() {
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [libros, setLibros] = useState([]);

  const temporizadorGuardado = useRef(null);

  useEffect(() => {
    const temporizadorInicio = setTimeout(async () => {
      setCargandoInicial(false);
      await SplashScreen.hideAsync().catch(() => { });
    }, 10000);

    return () => {
      clearTimeout(temporizadorInicio);
      clearTimeout(temporizadorGuardado.current);
    };
  }, []);

  const mostrarAlerta = (encabezado, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${encabezado}\n\n${mensaje}`);
    } else {
      Alert.alert(encabezado, mensaje);
    }
  };

  const agregarLibro = () => {
    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      mostrarAlerta("Campos incompletos", "Todos los campos son obligatorios.");
      return;
    }

    setGuardando(true);

    temporizadorGuardado.current = setTimeout(() => {
      const nuevoLibro = {
        id: `${Date.now()}-${Math.random()}`,
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };

      setLibros((librosActuales) => [nuevoLibro, ...librosActuales]);

      setTitulo("");
      setAutor("");
      setGenero("");
      setGuardando(false);

      mostrarAlerta("Libro agregado", "Libro guardado correctamente.");
    }, 4000);
  };

  if (cargandoInicial) {
    return (
      <SafeAreaView style={styles.bienvenida}>
        <Text style={styles.icono}>🌎</Text>
        <Text style={styles.libroIcono}>📖</Text>
        <Text style={styles.bienvenidaTexto}>Registro de libros</Text>
        <ActivityIndicator
          size="large"
          color="#2563eb"
          style={styles.indicadorInicio}
        />
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/Beauty.png')}
      style={styles.fondo}
      resizeMode="cover"
    >
      <View style={styles.capaOscura}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            style={styles.contenedor}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <FlatList
              data={libros}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.lista}
              ListHeaderComponent={
                <>
                  <Text style={styles.tituloPrincipal}>
                    Catálogo de Libros
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Título del libro"
                    placeholderTextColor="#666"
                    value={titulo}
                    onChangeText={setTitulo}
                    editable={!guardando}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Autor"
                    placeholderTextColor="#666"
                    value={autor}
                    onChangeText={setAutor}
                    editable={!guardando}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Género"
                    placeholderTextColor="#666"
                    value={genero}
                    onChangeText={setGenero}
                    editable={!guardando}
                  />

                  <Pressable
                    style={({ pressed }) => [
                      styles.boton,
                      (pressed || guardando) && styles.botonDesactivado,
                    ]}
                    onPress={agregarLibro}
                    disabled={guardando}
                  >
                    {guardando ? (
                      <View style={styles.guardandoFila}>
                        <ActivityIndicator size="small" color="#ffffff" />
                        <Text style={styles.botonTexto}>Guardando...</Text>
                      </View>
                    ) : (
                      <Text style={styles.botonTexto}>Agregar Libro</Text>
                    )}
                  </Pressable>

                  {guardando && (
                    <View style={styles.indicadorGuardado}>
                      <ActivityIndicator size="large" color="#ffffff" />
                      <Text style={styles.guardandoTexto}>
                        Guardando libro...
                      </Text>
                    </View>
                  )}

                  <Text style={styles.total}>
                    Total de libros: {libros.length}
                  </Text>
                </>
              }
              ListEmptyComponent={
                <Text style={styles.listaVacia}>
                  Todavía no hay libros registrados.
                </Text>
              }
              renderItem={({ item }) => (
                <View style={styles.tarjetaLibro}>
                  <Text style={styles.tituloLibro}>{item.titulo}</Text>
                  <Text style={styles.detalleLibro}>Autor: {item.autor}</Text>
                  <Text style={styles.detalleLibro}>Género: {item.genero}</Text>
                </View>
              )}
            />
          </KeyboardAvoidingView>

          <StatusBar style="light" />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bienvenida: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  icono: {
    fontSize: 70,
  },
  libroIcono: {
    fontSize: 72,
    marginTop: -15,
  },
  bienvenidaTexto: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  indicadorInicio: {
    marginTop: 20,
  },
  fondo: {
    flex: 1,
  },
  capaOscura: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  safeArea: {
    flex: 1,
  },
  contenedor: {
    flex: 1,
  },
  lista: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  tituloPrincipal: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 22,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 12,
    fontSize: 16,
    color: "#111827",
  },
  boton: {
    backgroundColor: "#1677d2",
    borderRadius: 9,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  botonDesactivado: {
    backgroundColor: "#8b8b8b",
  },
  botonTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  guardandoFila: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  indicadorGuardado: {
    alignItems: "center",
    marginVertical: 22,
  },
  guardandoTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  total: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },
  listaVacia: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 16,
    borderRadius: 10,
  },
  tarjetaLibro: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  tituloLibro: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },
  detalleLibro: {
    fontSize: 15,
    color: "#374151",
    marginBottom: 2,
  },
});