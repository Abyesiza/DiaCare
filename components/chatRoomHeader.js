import {StyleSheet,View,Text, TouchableOpacity, useColorScheme, Alert} from 'react-native'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, usersRef } from '@/firebaseconfig';
import React from 'react'
import { Stack } from 'expo-router'
import {Entypo, Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
  

export default function ChatRoomHeader({user,router}) {
    const colorScheme = useColorScheme();
    const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
    const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText

    return(
        <Stack.Screen
        options={{
            title:"",
            headerShadowVisible:false,
            headerLeft: () => (
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    {/* <TouchableOpacity onPress={()=> router.back()} >
                        <Entypo name="chevron-left" size={30} color="#737373"/>
                    </TouchableOpacity> */}
                    
                    <View style={{flexDirection:"row", alignItems:"center",marginLeft:20}}>
                        {/* <Text style={{fontSize:20}}>{user?.displayName}    </Text> */}
                        <Text style={[{fontSize:25}, TextStyle]}>Forum    </Text>

                    </View>

                </View>
            ),
            headerRight: ()=> (
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginRight:20}}>
                <Menu >
                    <MenuTrigger >
                    <Ionicons name='person-circle' size={35} color="green" style={{marginLeft:20}}/>
                    </MenuTrigger>
                    {user ? (
                         <MenuOptions >
                        <MenuOption onSelect={() => alert(`User name is ${user?.displayName}`)} text={user?.displayName} />
                        <MenuOption onSelect={
                              async () => {
                                try {
                                  await signOut(auth);
                                  Alert.alert('Signed out', 'You have been signed out successfully.');
                                  // router.replace("/signin");
                                } catch (error) {
                                  console.error('Error signing out:', error);
                                  Alert.alert('Error', 'Failed to sign out. Please try again.');
                                }
                              }

                        } >
                        <Text style={{color: 'red'}}>LogOut</Text>
                        </MenuOption>
                        </MenuOptions>
                    ) : (
                      <MenuOptions> 
                        <MenuOption onSelect={() => router.push("/signin")}>
                          <Text>Log In</Text>        
                        </MenuOption>

                      </MenuOptions>
 
                    )}
                </Menu>
                    {/* <Ionicons name='call' size={30} color="green" style={{marginLeft:20}}/>
                    <Ionicons name='videocam' size={30} color="green" style={{marginLeft:20}}/> */}
                          <StatusBar style="auto" />
                </View>
            )
        }}
        />

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
  
  