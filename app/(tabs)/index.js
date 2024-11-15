import { StyleSheet , Animated, Pressable ,useColorScheme, View, Text, ScrollView, Alert} from 'react-native';
import React, { useState, useRef , useEffect} from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, usersRef,db } from '@/firebaseconfig';
import Bubble from '@/components/bubble'
import BP from '@/components/bp'
import Glucose from '@/components/glucose'
import SAppoint from '@/components/appoint'
import SMedicate from '@/components/medicate'
import {Entypo, Ionicons} from "@expo/vector-icons"
import LS from '@/components/ls'
import Food from "@/components/food"
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { router , Link, Redirect} from 'expo-router';

export default function TabOneScreen() {

   const [iUser,setIUser] = useState(null)

  const colorScheme = useColorScheme();

const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText

useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          setIUser(user)

      } else {
        console.log('User is signed out');
        // router.replace("/signin");
      }
    });
    return unsubscribe;
},[])

  const scrollY = useRef(new Animated.Value(0)).current; // To track the scroll position

  // Define minimum and maximum padding values
  const minPadding = 10;
  const maxPadding = 50;

  // Interpolate padding based on scroll position
  const paddingInterpolation = scrollY.interpolate({
    inputRange: [0, 200], // Define the scroll range
    outputRange: [maxPadding, minPadding] // Output range: from large padding to small padding
    // extrapolate: 'clamp', 
    // Prevent values from exceeding the range
  });

  return (
    <SafeAreaView style={styles.container}>


      <Animated.View style={[styles.header, backGroundStyle,

        { padding: paddingInterpolation }]} >
        {/* // {flex:paddingInterpolation }]} > */}

      <View style={styles.headerH}>
      <Text style={[styles.title, TextStyle]}> DiaCare </Text>
      </View>

      <Menu style={{  position:"absolute", top:10, right:20}}>
                    <MenuTrigger >
                    <Ionicons name='person-circle' size={35} color="green" style={{marginLeft:20}}/>
                    </MenuTrigger>

                    {iUser ? (
                         <MenuOptions>
                        <MenuOption onSelect={() => alert(`User name is ${iUser?.displayName}`)} text={iUser?.displayName} />
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


      </Animated.View>
      

      <ScrollView        
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Set to false because we're animating layout properties (padding)
        )}
        scrollEventThrottle={16} // Controls how often the scroll event is fired  
      >


      <Glucose/>
      <BP/>
      <SAppoint/>
      <SMedicate/>
      <LS/>
      <Food/>

      </ScrollView>

      <View  style={[styles.headerB, backGroundStyle]} >
        <Bubble/>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
   flex:1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  header: {
    // backgroundColor: 'white',
    flexDirection:"row",
    elevation: 1,
    borderRadius:28,
    marginHorizontal: 9,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',

  },
  headerH: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBG:{
    backgroundColor:"rgba(255,255,255,0.1)"
  },
  lightBG:{
    backgroundColor:"#FFFFFF"
  },
  darkText:{
    color:"purple"
  },
  lightText:{
    color:"orange"
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
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  scrollItem: {
    height: 80,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

});
