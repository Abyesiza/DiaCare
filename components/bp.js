import React, { useContext, useLayoutEffect } from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { router , Link} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect , useRef} from "react";
import useBPStore from '../storeBP';
import { AntDesign, Fontisto } from '@expo/vector-icons';


export default function BP(props) {

  const {sysValue, BPDate, BPOutCome} = useBPStore()

const colorScheme = useColorScheme();
const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText


  return (
    <View>
        <Link href="/bpScreen" asChild>
    <Pressable >

            <View style={[styles.card, backGroundStyle]} >


                <View 
                style={{margin:1,
                flexDirection:"row",
                justifyContent:"space-between", 
                paddingVertical: 10,
                marginBottom:10,
                paddingHorizontal: 0,
                borderRadius: 10,
}} 

                >
                <Text style={[styles.textT,TextStyle]}
               
                >Blood pressure Level </Text>

                </View>
            <View style={{flexDirection:"row", justifyContent:"space-between"}} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">

              {BPOutCome ? (
                            <View style={{flexDirection:"row", justifyContent:"center", alignSelf:"center",
                              backgroundColor: "beige", padding:10, borderRadius:10, width:'60%'
                              }}>
                               <Text style={styles.textO}>{BPOutCome} at {BPDate} </Text>
                           </View>

              ) : (
                <View>
                  <AntDesign name='heart' size={30} color={"orange"}/>

    
                  
                </View>
              )} 




            <View style={[styles.pressable, backGroundStyle]} 

             >
              <Text style={[styles.textt, TextStyle]}>+</Text>
            <Text 
            style={[styles.textO, TextStyle]}
          
            >  {sysValue} mmHg</Text>
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
        marginHorizontal: 10,
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
        textT: {
          fontSize: 20,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
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
         image: {
          // flex: 1,
          borderTopLeftRadius: 40,
          justifyContent: 'center',
          margin:15
        },
        textO: {
          fontSize: 12,
          lineHeight: 12,

        }, 

            pressable: {
        alignItems:"center",
        justifyContent:"center",
        height:40,
        flexDirection:"row",

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