import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const App = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const downloadVideo = async () => {
        try {
            const response = await axios.post('http://localhost:3000/download', { url });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Something went wrong'));
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter YouTube URL"
                value={url}
                onChangeText={setUrl}
            />
            <Button title="Download" onPress={downloadVideo} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 5,
    },
    message: {
        marginTop: 20,
        textAlign: 'center',
    },
});

export default App;
