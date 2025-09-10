import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Atualizar() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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

            setUsername(res.data.user.nome)
            setEmail(res.data.user.email)

        } catch (error) {
            console.log("ERRO:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem("@token");

            if (!token) {
                alert("Erro, você não está logado!")
                setLoading(false);
                return;
            }

            const res = await axios.put("http://localhost:3001/auth/update", {
                nome: username, email
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert(res.data.message)

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar meu perfil</Text>

            <TextInput style={styles.input}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
            />
            <TouchableOpacity style={styles.btn} onPress={handleUpdate} >
                <Text>Atualizar</Text>
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
