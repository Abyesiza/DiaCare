import { StyleSheet, ActivityIndicator, FlatList, TextInput, TouchableOpacity , useColorScheme} from 'react-native';
import React, { useState } from 'react'
import axios from 'axios';
import { Text, View } from '@/components/Themed';
import { speak, isSpeakingAsync, stop } from 'expo-speech';
import ChatBubble from '../components/chatbubble';
import {apikey} from '../utilitis/common';
import { Feather } from '@expo/vector-icons';

export default function ChatBot() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false)

  const colorScheme = useColorScheme();
  const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
  const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText



  const handleUserInput = async () => {
    let updatedChat = [
      ...chat, {
        role: "User",
        parts: [{text : userInput}],
      },
    ];
    setLoading(true);
    console.log(updatedChat)
    try {
      const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`,
        {
          contents: updatedChat,
        }
      );
      console.log("Gemini response: ", response.data)

      const modelResp = 
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        const modelResponse = modelResp.replace(/\*/g,"")

      if (modelResponse) {
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role:"Model",
            parts: [{text : modelResponse}]
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Gemini error while processing response: ", error);
      console.error("Error response:" , error.response);
      setError("An error occured. Please try again.")
    } finally {
      setLoading(false);
    }

  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false)
    } else {
      if (!(await isSpeakingAsync() )) {
        speak(text);
        setIsSpeaking(true);
      }
    }
    
  }

  const renderChatItem = ({item}) => (
    <ChatBubble
    role= {item.role}
    text = {item.parts[0].text}
    onSpeech = {() => handleSpeech(item.parts[0].text)} />
  );

  return (
    <View style={styles.container}>
          {/* <Text style={styles.title}>Health Advisor</Text> */}
          <FlatList data= {chat}
          renderItem={
            renderChatItem
          } 
          keyExtractor={(item, index) => index.toString() }
          contentContainerStyle = {styles.chatContainer}/>

          <View style = {[styles.inputContainer,backGroundStyle]}>
            <TextInput 
            style = {[styles.input, TextStyle]}
            placeholder='Type your message...'
            placeholderTextColor="#aaa"
            value={userInput}
            onChangeText={setUserInput}
            />
            <TouchableOpacity style={styles.button} onPress={handleUserInput}>
            <Feather name='send' size={25} color={'green'}/>
              {/* <Text style={styles.buttonText}>Send </Text> */}

            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator style={styles.loading} color="#333" />}
          {error && <Text  style={styles.error}>{error}</Text> }
    </View>

    
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    // backgroundColor:'#F8F8F8',
  },
  darkBG:{
    backgroundColor:"rgba(255,255,255,0.1)"
  },
  lightBG:{
    backgroundColor:"#FFFFFF"
  },
  darkText:{
    color:"#FFFFFF"
  },
  lightText:{
    color:"#333333"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#333",
    marginBottom:20,
    marginTop: 40,
    textAlign: "center",
  },
  chatContainer:{
    flexGrow:1,
    justifyContent:"flex-end"
  },
  inputContainer:{
    flexDirection:"row", 
    justifyContent:"space-between",
     padding:2,
     borderWidth:1,
     borderColor:"lightgrey",
     borderRadius:20,
     paddingLeft:5, 
     marginHorizontal:3
  },
  input: {
    flex:1,marginRight:2,fontSize:15


  },
  button:{
    marginRight:2,
    padding:6, 
    backgroundColor:"lightgrey", 
    borderRadius:15
  },
  buttonText :{
    textAlign:"center",

  },
  loading:{
    marginTop:10,
  },
  error:{
    color:"red",
    marginTop:10,
  },

});
