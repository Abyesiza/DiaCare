import {View,Text, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {useLocalSearchParams, useRouter} from 'expo-router'
import ChatRoomHeader from '../components/chatRoomHeader';
import MessageList from '../components/messageList';
import { Feather } from '@expo/vector-icons';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, usersRef,db } from '@/firebaseconfig';
import { getRoomId } from '../utilitis/common';
import {  getDocs, query, where,setDoc, doc, Timestamp, collection, addDoc, orderBy, onSnapshot } from 'firebase/firestore';


export default function ChatRoom() {
    const item = useLocalSearchParams();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const textRef = useRef('')
    const inputRef = useRef(null)
    const [iUser,setIUser] = useState(null)


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIUser(user)
                const createRoomIfNotExists = async () => {
                    let roomId = getRoomId(user?.uid,item?.userId)

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
              router.replace("/signin");
            }
          });
          return unsubscribe;
    },[])

 const handleSendMessage = async () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            let message = textRef.current.trim();
            if(!message) return;
            try {
                let roomId = getRoomId(user?.uid,item?.userId)
                const docRef = doc(db,'rooms',roomId)
                const messagesRef = collection(docRef,"messages");
                textRef.current = ""
                if(inputRef) inputRef?.current?.clear();

                const newDoc = async () => {
                    const oDoc = await addDoc(messagesRef,{
                        userId: user?.uid,
                        text:message,
                        senderName: user?.displayName,
                        createdAt: Timestamp.fromDate(new Date())
                    });
                    console.log(oDoc.id)

                } 
                newDoc()

            } catch (error) {
                
                Alert.alert("Message",error.message)
            } 
        } else {
          console.log('User is signed out');
          router.replace("/signin");
        }
      });
      return unsubscribe;
 }

    return(
        <View style={{flex:1}}>
            <StatusBar style="dark"/>
            <ChatRoomHeader user = {item} router={router}/>
            <View style={{borderBottomColor:"orange" , borderBottomWidth:0.5}}/>
            <View style={{flex:1,justifyContent:"space-between"}}>
                <View style={{flex:1}}>
                    <MessageList messages = {messages} user= {iUser}/>

                </View>
                <View style={{paddingTop:2,marginBottom:10}}>

                        <View style={{flexDirection:"row", justifyContent:"space-between", padding:2,borderWidth:1,backgroundColor:"white",borderColor:"lightgrey",borderRadius:20,paddingLeft:5, marginHorizontal:3}}>
                            <TextInput
                            ref={inputRef}
                            onChangeText={value => textRef.current = value}
                            placeholder='Type message...'
                            style={{flex:1,marginRight:2,fontSize:15}}
                            />
                            <TouchableOpacity onPress={handleSendMessage} style={{marginRight:2,padding:6, backgroundColor:"lightgrey", borderRadius:15}}>
                                <Feather name='send' size={25} color={'green'}/>

                            </TouchableOpacity>

                    </View>

                </View>

            </View>
        </View>
    )
}