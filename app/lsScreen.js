import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet,  Text, View, useColorScheme , TouchableOpacity, ScrollView,  TextInput, ActivityIndicator } from 'react-native';
import Bubble from '@/components/bubble'
import {router, Link} from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {apikey} from '../utilitis/common';

import useGOutComeStore from "../storeGOutcome"



export default function LsScreen() {
  const {  gRecomend,setgRecomend, glucoseValue, gDate } = useGOutComeStore();

  const [Arecomend, setArecomend] = useState("It will be okay")
  const [text, setText] = useState("")
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();

  const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
  const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText


  const GetHelp = async () => {
   let prompt = `I am a diabetes patient or am prone to get diabtes and this is how i feel,  ${text}, give me recommendations of what i should do. I already know why you can't provide medical recommendations.`

  //  console.log(prompt)

   let updatedChat = [
    ...chat, {
      role: "User",
      parts: [{text : prompt}],
    },
  ];
  setLoading(true);
  try {
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apikey}`,
      {
        contents: updatedChat,
      }
    );
    console.log("Gemini response: ", response.data)

    const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const ModifiedR = modelResponse.replace(/\*/g,"")
    setArecomend(ModifiedR)
    if (modelResponse) {
      const updatedChatWithModel = [
        ...updatedChat,
        {
          role:"Model",
          parts: [{text : ModifiedR}]
        },
      ];
      setChat(updatedChatWithModel);
      setText("");
    }
  } catch (error) {
    console.error("Gemini error while processing response: ", error);
    console.error("Error response:" , error.response);
    setError("An error occured. Please try again.")
  } 
  finally {
    setLoading(false);
  }


}

  return (
    <View style={styles.container}>
      <View  style={[{ marginHorizontal:9, borderRadius:15, marginTop: 9, padding: 20},backGroundStyle]}>
      <TextInput 
      placeholder='Tell us more about how you feel' 
      placeholderTextColor='green'
      value={text}
      onChangeText={setText}
      style={[{height:100},TextStyle]} 
      multiline={true} 
      numberOfLines={4}/>

      <TouchableOpacity  style={{padding:12, backgroundColor:'cyan', alignItems:"center", borderRadius:20}} onPress={GetHelp}>
        <Text style={[TextStyle]}>Get Recommendations from AI  </Text>
      </TouchableOpacity>
    
      </View>


      <View style={[{flexDirection:"row",justifyContent:"space-between", marginHorizontal:9, borderRadius:15, marginTop: 9, paddingLeft: 20},backGroundStyle]}>
        <Text style={[{padding:15, fontSize:18},TextStyle]} >Glucose Tracker </Text>
        <TouchableOpacity onPress={()=> router.push("glucoseScreen")} style={{padding:15, backgroundColor:'cyan', alignItems:"center", borderRadius:20}}>
          <Text style={[TextStyle]}> Add   </Text>
        </TouchableOpacity>
      </View>

      <View style={[{flexDirection:"row",justifyContent:"space-between",marginHorizontal:9, borderRadius:15, marginTop: 9, paddingLeft: 20},backGroundStyle]}>
        <Text style={[{padding:15, fontSize:18},TextStyle]} >Blood pressure tracker  </Text>
        <TouchableOpacity onPress={()=> router.push("bpScreen")} style={{padding:15, backgroundColor:'cyan', alignItems:"center", borderRadius:20}}>
          <Text style={[TextStyle]}> Add </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={[{ marginTop:10, marginHorizontal:9, borderRadius:15}, backGroundStyle]} showsVerticalScrollIndicator={false}>

        <Text style={[{fontSize:20, alignSelf:"center"},TextStyle]}>Recommendations</Text>
        <View style={{ alignItems:"center", justifyContent:"center", marginTop:9, paddingHorizontal:20}}>
          <Text style={[TextStyle]}>{Arecomend}   </Text> 
          {loading && <ActivityIndicator  color="#333" size={70}/>}
        </View>
       
      </ScrollView>




      <View style={[styles.headerB, backGroundStyle]}>
        <Bubble/>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerB: {
    position:"absolute",
    bottom:20,
    right:20,
    alignItems:'center',
    elevation: 3,
    borderRadius:25,
    padding:10,
    borderWidth:1,
    borderColor:'lightgreen',

  },

});
