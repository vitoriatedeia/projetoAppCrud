import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Perfil() {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("@token");

            if (!token) {
                alert("Erro, você não está logado!")
                setLoading(false);
                return;
            }

            const res = await axios.get("http://localhost:3001/auth/profile", {
                headers: { Authorization: `Bearer ${token}` }
            })

            setUser(res.data.user)

        } catch (error) {
            console.log("ERRO:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem("@token");
        setUser("");
        alert("Logout realizado!");
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu Perfil</Text>

            <Text>Nome: {user.nome}</Text>
            <Text>Email: {user.email}</Text>

            <TouchableOpacity style={styles.btn} onPress={handleLogout} >
                <Text>Logout</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: "#fff"
    },
    btn: {
        width: "100%",
        padding: 10,
        backgroundColor: "#00ff00",
        alignItems: "center"
    }
});
