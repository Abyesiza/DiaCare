import React from 'react';
import { StyleSheet, View  , Text, TouchableOpacity,useColorScheme} from 'react-native';

export default function ChatItem({item,router}) {
    const colorScheme = useColorScheme();

    const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
    const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText

    const openChatRoom = () => {
        router.push({pathname:'/chatRoom',params: item});
    }
    return(

        <TouchableOpacity onPress={openChatRoom} style={[{  marginHorizontal:15,padding:10,borderColor:"green", borderWidth:1, marginVertical:5,borderRadius:10}, backGroundStyle]}>
 

        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <Text style={[TextStyle]}>{item?.username} </Text>
        <Text style={[TextStyle]}>{item?.userId}  </Text>
        </View>
        <Text style={[TextStyle]}>Last message</Text>
        </TouchableOpacity>

    )
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