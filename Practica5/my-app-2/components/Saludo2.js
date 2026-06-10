import { View, Button, Image, Text } from "react-native"

export const Saludo2 = () => {
    return (
        <View>
             <Image source={require('../assets/wave.png')}/>
             <Text>Soy un component compouesto </Text>
             <Button title="hola 203"> </Button>
        </View>
    )
}