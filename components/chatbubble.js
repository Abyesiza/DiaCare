import React from "react";
import {  TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '@/components/Themed';

const ChatBubble = ({role, text, onSpeech}) => {
    return (
        <View style={[styles.chatItem, 
        role === "User"? styles.userChatItem : styles.modelChatItem,
        ]} >
            <Text style={styles.chatText}>{text}</Text>
            {role === "Model" && (
                <TouchableOpacity onPress={onSpeech} style={styles.speakerIcon}>
                    <Ionicons name="volume-high-outline" size={24} color="orange" />

                </TouchableOpacity>
            )}

        </View>
    )
};

const styles = StyleSheet.create({
    chatItem:{
        marginBottom: 10,
        padding:10,
        maxWidth:"70%",
        position:"relative",

    },userChatItem: {
        alignSelf:'flex-end',
        backgroundColor:"#007AFF",

        borderRadius:15

    }, modelChatItem:{
        alignSelf:"flex-start",
        backgroundColor:"rgba(255,255,255,0.1)",

        borderRadius:15

    }, chatText:{
        fontSize:16,
        // color:"#fff",
    },speakerIcon:{
        position:"absolute",
        bottom:5,
        right:5,
    },
})
export default ChatBubble