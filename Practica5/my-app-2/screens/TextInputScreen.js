import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Alert,
  Button,
  StyleSheet,
  Platform,
} from "react-native";

if (Platform.OS === "web") {
  Alert.alert = (titular, mensaje, boton) => {
    const list = Array.isArray(mensaje) ? mensaje : boton;
    if (list) {
      if (window.confirm(titular)) list.find((b) => b.onPress)?.onPress();
    } else {
      window.alert(titular + (mensaje ? "\n" + mensaje : ""));
    }
  };
}

export default function App() {
  // registro rápido de usuario
  // nombre, correo, contraseña

  const [nombre, setNombre] = useState();
  const [correo, setCorreo] = useState();
  const [contraseña, setContraseña] = useState();

  const registro = () => {
    // es una alerta simple
    if (!nombre || !correo || !contraseña) {
      Alert.alert("Faltan datos", "Completa tos slos campos");
      return;
    }

    if (!correo.includes("@") || !correo.includes(".com")) {
      Alert.alert("Correo inválido", "El correo debe contener @ y .com");
      return;
    }

    // validacion de contraseña
    if (contraseña.length < 6) {
      Alert.alert("Contraseña invalida", "Minimo 6 caracteres");
      return;
    }
    // confirmacion de envio
    Alert.alert(`Registrar ${nombre}`, [
      {
        text: "No",
        style: "calcel",
      },
      {
        text: "Si",
        onPress: () => {
          Alert.alert("Exito", `Usuario registrado con exito`);
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.input}>
        <Text style={styles.Titulo}>Formulario de registro de usuario</Text>
        {/* nombre del usuario */}
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#999"
          value={nombre}
          onChangeText={(texto) => setNombre(texto)}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese tu correo electronico"
          placeholderTextColor="#999"
          value={correo}
          onChangeText={(texto) => setCorreo(texto)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese tu contraseña minimo 6 caracteres"
          placeholderTextColor="#999"
          value={contraseña}
          onChangeText={(texto) => setContraseña(texto)}
          secureTextEntry={true}
        />
        <Button title="Registrar" onPress={registro} />

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 24,
    gap: 12,
  },
  Titulo: {
    padding: 30,
    fontSize: 20,
    alignContent: "stretch",
  },
  input: {
    borderWidth: 3,
    borderColor: "#e6e6e6",
    borderRadius: 3,
    padding: 3,
    fontSize: 15,
    backgroundColor: "#ffffff",
  },
});