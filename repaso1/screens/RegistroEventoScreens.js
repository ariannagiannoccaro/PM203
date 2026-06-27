import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';

const Question = ({ label, value, onChange }) => (
    <View style={styles.preguntaRow}>
        <Text>{label}</Text>
        <Switch
            onValueChange={onChange}
            value={value}
        />
    </View>
);

export default function RegistroEventoScreens() {
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');
    const [semestre, setSemestre] = useState('');
    const [taller, setTaller] = useState(false);
    const [constancia, setConstancia] = useState(false);
    const [deportes, setDeportes] = useState(false);

    const enviarRegistro = () => {
        const nombreLimpio = nombre.trim();
        const carreraLimpia = carrera.trim();
        const semestreLimpio = semestre.trim();

        if (!nombreLimpio || !carreraLimpia || !semestreLimpio) {
            Alert.alert('Los Campos están incompletos', 'Debes llenar todos los campos.');
            return;
        }

        if (!/^\d+$/.test(semestreLimpio)) {
            Alert.alert('Error', 'El campo de semestre debe ser un número.');
            return;
        }

        Alert.alert(
            'Registro enviado',
            [
                `Nombre: ${nombreLimpio}`,
                `Carrera: ${carreraLimpia}`,
                `Semestre: ${semestreLimpio}`,
                '',
                `Taller: ${taller ? 'Sí' : 'No'}`,
                `Constancia: ${constancia ? 'Sí' : 'No'}`,
                `Deportes: ${deportes ? 'Sí' : 'No'}`,
            ].join('\n'),
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.screen}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.card}>
                    <Text style={styles.title}>Registro de Evento Universitario</Text>

                    <TextInput
                        autoCapitalize="words"
                        onChangeText={setNombre}
                        placeholder="Nombre completo"
                        placeholderTextColor="#6E8E79"
                        returnKeyType="next"
                        style={styles.input}
                        value={nombre}
                    />

                    <TextInput
                        autoCapitalize="words"
                        onChangeText={setCarrera}
                        placeholder="Carrera"
                        placeholderTextColor="#6E8E79"
                        returnKeyType="next"
                        style={styles.input}
                        value={carrera}
                    />

                    <TextInput
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={setSemestre}
                        placeholder="Semestre"
                        placeholderTextColor="#6E8E79"
                        returnKeyType="done"
                        style={styles.input}
                        value={semestre}
                    />

                    <Text style={styles.sectionTitle}>Opciones</Text>

                    <Question
                        label="¿Asistirás al taller?"
                        onChange={setTaller}
                        value={taller}
                    />
                    <Question
                        label="¿Requieres constancia?"
                        onChange={setConstancia}
                        value={constancia}
                    />
                    <Question
                        label="¿Participarás en deportes?"
                        onChange={setDeportes}
                        value={deportes}
                    />

                    <Text style={styles.author}>Arianna Giannoccaro</Text>

                    <Pressable
                        accessibilityRole="button"
                        onPress={enviarRegistro}
                        style={({ pressed }) => [
                            styles.submitButton,
                            pressed && styles.submitButtonPressed,
                        ]}
                    >
                        <Text style={styles.submitButtonText}>Enviar Registro</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    card: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    author: {
        marginTop: 20,
        fontSize: 12,
        color: '#666',
    },
    submitButton: {
        backgroundColor: '#ddd',
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonPressed: {
        backgroundColor: '#bbb',
    },
    submitButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});
