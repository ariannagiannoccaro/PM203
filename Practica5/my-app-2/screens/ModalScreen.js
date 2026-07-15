import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Animated,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function ModalScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [sheetVisible, setSheetVisible] = useState(false);
    const [selectedMode, setSelectedMode] = useState('Presencial');
    const [reservationConfirmed, setReservationConfirmed] = useState(false);

    function selectMode(mode) {
        setSelectedMode(mode);
        setReservationConfirmed(false);
        setSheetVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modal y Bottom Sheet</Text>
            <Text style={styles.subtitle}>Tema: Modal y Bottom Sheet</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Video clase</Text>
                <Text style={styles.cardText}>Duracion: 40 minutos </Text>
                <Text style={styles.cardText}>Modalidad: {selectedMode}</Text>
                <Text style={styles.cardText}> 
                    Estado: {reservationConfirmed ? 'Confirmada' : 'Pendiente'}
                </Text>
            </View>

            <Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
                <Text style={styles.secondaryButtonText}>Elegir una modalidad</Text>
            </Pressable>

            <Pressable style={styles.primaryButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.primaryButtonText}>Confirmar la reserva</Text>
            </Pressable>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent
                statusBarTranslucent
                onShow={() => console.log('Modal de confirmacion abierto')}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Confirmar reserva</Text>
                        <Text style={styles.modalText}>
                            Deseas reservar la clase en modalidad {selectedMode}?
                        </Text>

                        <View style={styles.actionsRow}>
                            <Pressable
                                style={[styles.actionButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.actionButton, styles.confirmButton]}
                                onPress={() => {
                                    setReservationConfirmed(true);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.confirmButtonText}>Confirmar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <BottomSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                title="Elige modalidad"
                height={330}
            >
                <Pressable style={styles.optionButton} onPress={() => selectMode('Presencial')}>
                    <Text style={styles.optionTitle}>Presencial</Text>
                    <Text style={styles.optionText}>Asiste al salon asignado.</Text>
                </Pressable>

                <Pressable style={styles.optionButton} onPress={() => selectMode('En linea')}>
                    <Text style={styles.optionTitle}>En linea</Text>
                    <Text style={styles.optionText}>Recibe el enlace de videollamada.</Text>
                </Pressable>

                <Pressable style={styles.optionButton} onPress={() => selectMode('Grabacion')}>
                    <Text style={styles.optionTitle}>Grabacion</Text>
                    <Text style={styles.optionText}>Consulta la clase mas tarde.</Text>
                </Pressable>
            </BottomSheet>

            <StatusBar style="auto" />
        </View>
    );
}

function BottomSheet({
    visible,
    onClose,
    title,
    height = 320,
    closeOnBackdropPress = true,
    children,
}) {
    const translateY = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: visible ? 0 : height,
            duration: visible ? 250 : 200,
            useNativeDriver: true,
        }).start();
    }, [height, translateY, visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.sheetOverlay}>
                <Pressable
                    style={styles.sheetBackdrop}
                    onPress={closeOnBackdropPress ? onClose : undefined}
                />

                <Animated.View
                    style={[
                        styles.sheetContainer,
                        { height, transform: [{ translateY }] },
                    ]}
                >
                    <View style={styles.sheetHandle} />
                    <Text style={styles.sheetTitle}>{title}</Text>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4eefb',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 24,
    },
    title: { fontSize: 28, fontWeight: '700', color: '#3b2555', marginBottom: 6 },
    subtitle: { fontSize: 15, color: '#8776a3', marginBottom: 20 },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#e2d4f5',
    },
    cardTitle: { fontSize: 20, fontWeight: '700', color: '#3b2555', marginBottom: 10 },
    cardText: { fontSize: 16, color: '#5f4a7a', marginBottom: 6 },
    primaryButton: {
        backgroundColor: '#8a4fd6',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
    secondaryButton: {
        backgroundColor: '#ffffff',
        borderColor: '#8a4fd6',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    secondaryButtonText: { color: '#8a4fd6', fontSize: 16, fontWeight: '700' },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(59, 20, 90, 0.45)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    modalCard: { width: '100%', backgroundColor: '#ffffff', borderRadius: 8, padding: 22 },
    modalTitle: { fontSize: 22, fontWeight: '700', color: '#3b2555', marginBottom: 10 },
    modalText: { fontSize: 16, color: '#5f4a7a', marginBottom: 20 },
    actionsRow: { flexDirection: 'row', gap: 10 },
    actionButton: { flex: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
    cancelButton: { backgroundColor: '#ede2fa' },
    confirmButton: { backgroundColor: '#8a4fd6' },
    cancelButtonText: { color: '#5f4a7a', fontWeight: '700' },
    confirmButtonText: { color: '#ffffff', fontWeight: '700' },
    sheetOverlay: { flex: 1, justifyContent: 'flex-end' },
    sheetBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(59, 20, 90, 0.35)' },
    sheetContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 24,
    },
    sheetHandle: {
        width: 44,
        height: 5,
        borderRadius: 999,
        backgroundColor: '#d3bdf0',
        alignSelf: 'center',
        marginBottom: 16,
    },
    sheetTitle: { fontSize: 20, fontWeight: '700', color: '#3b2555', marginBottom: 14 },
    optionButton: {
        borderWidth: 1,
        borderColor: '#e2d4f5',
        borderRadius: 8,
        padding: 14,
        marginBottom: 10,
        backgroundColor: '#faf6fe',
    },
    optionTitle: { fontSize: 16, fontWeight: '700', color: '#3b2555', marginBottom: 4 },
    optionText: { fontSize: 14, color: '#8776a3' },
});