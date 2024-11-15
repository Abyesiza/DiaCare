import {StyleSheet,View,Text, StatusBar, TextInput, TouchableOpacity, Alert, useColorScheme} from 'react-native'
import Bubble from '@/components/bubble';
import React, { useEffect, useRef, useState } from 'react'
import {useLocalSearchParams, useRouter,router} from 'expo-router'
import ChatRoomHeader from '@/components/chatRoomHeader';
import MessageList from '@/components/messageList';
import { Feather } from '@expo/vector-icons';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, usersRef,db } from '@/firebaseconfig';

import {  getDocs, query, where,setDoc, doc, Timestamp, collection, addDoc, orderBy, onSnapshot } from 'firebase/firestore';


export default function Forum() {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('')
    const inputRef = useRef(null)
    const [iUser,setIUser] = useState(null)
    const [rand, setRand] = useState()

    const colorScheme = useColorScheme();
    const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
    const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIUser(user)
                const createRoomIfNotExists = async () => {
                    // let roomId = getRoomId(user?.uid,item?.userId)
                    let roomId = "foruminitial12id"

                    await setDoc(doc(db,"rooms",roomId), {
                        roomId,
                        createdAt:Timestamp.fromDate(new Date())
                    })
                    const docRef = doc(db,"rooms",roomId)
                    const messagesRef = collection(docRef,"messages");   
                    const q = query(messagesRef,orderBy('createdAt', 'asc'));
                    let unsub = onSnapshot(q, (snapShot)=> {
        
                        let allMessages = snapShot.docs.map(doc => {
                            return doc.data();
                        });
                        setMessages([...allMessages]);
                    })  
            

                    // console.log(roomId)

                  } 
              createRoomIfNotExists()



            } else {


              console.log('User is signed out');
              const createRoomIfNotExistsE = async () => {
                // let roomId = getRoomId(user?.uid,item?.userId)
                let roomId = "foruminitial12id"

                await setDoc(doc(db,"rooms",roomId), {
                    roomId,
                    createdAt:Timestamp.fromDate(new Date())
                })
                const docRef = doc(db,"rooms",roomId)
                const messagesRef = collection(docRef,"messages");   
                const q = query(messagesRef,orderBy('createdAt', 'asc'));
                let unsub = onSnapshot(q, (snapShot)=> {
    
                    let allMessages = snapShot.docs.map(doc => {
                        return doc.data();
                    });
                    setMessages([...allMessages]);
                })  
        

                // console.log(roomId)

              } 
          createRoomIfNotExistsE()

            }
          });
          return unsubscribe;
    },[])
    const handleSendMessage = async () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        let message = textRef.current.trim();
        if (!message) return;
    
        // Default room ID
        let roomId = "foruminitial12id";
        
        // Prepare message data
        const messageData = {
          text: message,
          createdAt: Timestamp.fromDate(new Date()),
        };
    
        if (user) {
          // Signed-in user message
          messageData.userId = user.uid;
          messageData.senderName = user.displayName;
        } else {
          let useruid = 1000002000;
          setRand(useruid)
          // Fallback patient message
          messageData.userId = rand;
          messageData.senderName = 'Patient';
        }
    
        try {
          const docRef = doc(db, 'rooms', roomId);
          const messagesRef = collection(docRef, "messages");
          textRef.current = ""; // Clear input field
          if (inputRef) inputRef.current?.clear(); // Clear input field in UI
    
          // Add message to Firestore
          const newDoc = async () => {
            const oDoc = await addDoc(messagesRef, messageData);
            console.log("Message sent with ID:", oDoc.id);
          };
    
          newDoc();
        } catch (error) {
          console.error("Error sending message:", error.message);
          Alert.alert("Message", "Error sending message. Please try again.");
        }
      });
      return unsubscribe;
    };
    

//  const handleSendMessage = async () => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//             let message = textRef.current.trim();
//             if(!message) return;
//             try {

//                 let roomId = "foruminitial12id"
//                 const docRef = doc(db,'rooms',roomId)
//                 const messagesRef = collection(docRef,"messages");
//                 textRef.current = ""
//                 if(inputRef) inputRef?.current?.clear();

//                 const newDoc = async () => {
//                     const oDoc = await addDoc(messagesRef,{
//                         userId: user?.uid,
//                         text:message,
//                         senderName: user?.displayName,
//                         createdAt: Timestamp.fromDate(new Date())
//                     });
//                     console.log(oDoc.id)

//                 } 
//                 newDoc()



//             } catch (error) {
                
//                 Alert.alert("Message",error.message)
//             } 
//         } else {

//           console.log('User is signed out');
//           let message = textRef.current.trim();
//           if(!message) return;
//           try {

//             let roomId = "foruminitial12id"
//             const docRef = doc(db,'rooms',roomId)
//             const messagesRef = collection(docRef,"messages");
//             textRef.current = ""
//             if(inputRef) inputRef?.current?.clear();

//             const newDocE = async () => {
//                 const oDoc = await addDoc(messagesRef,{
//                     userId: rand,
//                     text:message,
//                     senderName: patient,
//                     createdAt: Timestamp.fromDate(new Date())
//                 });
//                 console.log(oDoc.id)

//             } 
//             newDocE()
          

//           } catch (error) {
              
//               Alert.alert("Message",error.message)
//           } 

//         }
//       });
//       return unsubscribe;
//  }

    return(
        <View style={{flex:1}}>

            <StatusBar style="dark"/>
            <ChatRoomHeader user = {iUser} router={router}/>

            <View style={{borderBottomColor:"orange" , borderBottomWidth:0.5}}/>
            <View style={{flex:1,justifyContent:"space-between"}}>
                <View style={{flex:1}}>
                    <MessageList messages = {messages} user= {iUser} ran = {rand}/>

                </View>
                <View style={{paddingTop:2,marginBottom:10}}>

                        <View style={[{flexDirection:"row", justifyContent:"space-between", padding:2,borderWidth:1,borderColor:"lightgrey",borderRadius:20,paddingLeft:5, marginHorizontal:3}, backGroundStyle]}>
                            <TextInput
                            ref={inputRef}
                            onChangeText={value => textRef.current = value}
                            placeholder='Type message...'
                            style={[{flex:1,marginRight:2,fontSize:15}, TextStyle]}
                            />
                            <TouchableOpacity onPress={handleSendMessage} style={{marginRight:2,padding:6, backgroundColor:"lightgrey", borderRadius:15}}>
                                <Feather name='send' size={25} color={'green'}/>

                            </TouchableOpacity>

                    </View>

                </View>

            </View>
            <View style={[styles.headerB, backGroundStyle]}>
                <Bubble />
            </View>
            <StatusBar style="auto" />
        </View>
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
    logoutButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 15,
    },
    headerB: {
      position:"absolute",
      top:20,
      right:20,
      alignItems:'center',
      elevation: 3,
      borderRadius:25,
      padding:10,
      borderWidth:1,
      borderColor:'lightgreen',
  
    },
  });
  
  