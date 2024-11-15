import React from 'react';
import { Pressable, StyleSheet, Text, View , useColorScheme} from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
// import { Text, View } from './Themed';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { router , Link} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect , useRef} from "react";
import useGOutComeStore from "../storeGOutcome"
import { Fontisto } from '@expo/vector-icons';


export default function Glucose() {
const { glucoseValue,  gDate, gOutCome } = useGOutComeStore();

const colorScheme = useColorScheme();

const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText


  return (
    <View>
        <Link href="/glucoseScreen" asChild>
    <Pressable >

            <View style={[styles.card, backGroundStyle]} >
            {/* <ImageBackground source={require("../assets/images/glu.jpg")}   style={styles.image}> */}
            {/* <View style={{flexDirection:"row", borderRadius: 10, marginBottom:10}}> */}

                <View 
                style={{margin:1, 
                paddingVertical: 10,
                marginBottom:10,
                paddingHorizontal: 0,
                borderRadius: 10,}}
             
                >
  
                <Text style={[styles.textT,TextStyle]}>Glucose Level</Text>
                </View>
            {/* </View>  */}
            <View style={{flexDirection:"row", justifyContent:"space-between"
               }} > 
               {gOutCome ? (
              <View style={{flexDirection:"row", justifyContent:"center",
                backgroundColor: "beige", padding:10, borderRadius:10, width:'60%'
                }}>
                 <Text style={styles.textO}>{gOutCome} at {gDate}</Text>
               </View>
               ) : (
                <Fontisto name='blood-test' size={35} color="red"/>
               )}





              <View style={[styles.pressable, backGroundStyle]}  >
                <Text style = {[styles.textt, TextStyle]}>+</Text>
                <Text 
                style={[styles.textO, TextStyle]}> {glucoseValue} mg/dl </Text>
              </View>

            </View>
            </View>
        
    </Pressable>

      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
         card:{

        elevation: 3,
        padding:20,
        borderRadius:25,
        marginHorizontal: 9,
        marginBottom: 9,
        },
        darkBG:{
          backgroundColor:"rgba(255,255,255,0.1)"
        },
        lightBG:{
          backgroundColor:"#FFFFFF"
        },
        darkText:{
          // Color:"#FFFFFF",
          color:"#FFFFFF"
        },
        lightText:{
          color:"#333333"
        },
        button:{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 9,
          paddingHorizontal: 32,
          borderRadius: 10,
          elevation: 1,
          // backgroundColor:""
          
          // backgroundColor: 'ne',
        },
          text: {
          fontSize: 17,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        }, 
        textt: {
          fontSize: 24,
          lineHeight: 20,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        }, 
        textO: {
          fontSize: 12,
          lineHeight: 12,
          // letterSpacing: 0.1,
          // fontFamily:"sans-serif-condensed",
        }, 
        textT: {
          fontSize: 20,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        }, 
         image: {
          // flex: 1,
          borderTopLeftRadius: 40,
          justifyContent: 'center',
          margin:15
        },

            pressable: {
        alignItems:"center",
        justifyContent:"center",
        height:40,
        flexDirection:"row",
        // justifyContent:"flex-end",
        // backgroundColor:"#FAF9F6",
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 10,

        elevation: 1,
    
    },
              pressableI: {
        alignItems:"center",
        justifyContent:"flex-end",
        paddingVertical: 7,
        paddingHorizontal: 2,
    
    },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
