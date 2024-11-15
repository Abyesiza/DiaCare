import { Dimensions, Text, View ,Image, ImageBackground, StyleSheet,ScrollView,useColorScheme} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useState, useEffect } from "react";
import axios from 'axios';


export default function TabTwoScreen() {

  const width = Dimensions.get('window').width;
  const colorScheme = useColorScheme();

  const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
  const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText
  



  return (
    <SafeAreaProvider>
    <View style={styles.container}>


    <ScrollView>

    <View style={styles.pressableH}>

    <Text style={styles.textP}>
    Diabetes
    </Text>

    </View>

    <View style={[styles.card, backGroundStyle]}>

    <Text style={[styles.text, TextStyle]}>

    Diabetes is a chronic metabolic disease characterized by persistent high blood glucose levels (sugars) 
    which over time lead to complication in the heart, kidneys, eyes, blood vessels and nerves.

    The most common types are: type 1 and type 2, 
    however there’s also gestational diabetes that develops in pregnant women.

        Type 1 diabetes previously known as juvenile or insulin dependent diabetes happens when there’s 
    little or no insulin produced by the pancreas.

        Type 2 diabetes previously termed as adult on-set or non-insulin dependent diabetes commonly 
    occurring in adults and account for over 90% of the diabetes cases.
    </Text> 
    </View>


   <View style={styles.pressableH}>
  <Text style={styles.textP}>
Symptoms



  </Text>
 </View>

 <View style={[styles.card, backGroundStyle]}>

  <Text style={[styles.text, TextStyle]}>
Symptoms of diabetes may occur suddenly. In T2D, symptoms can be mild and may take many years to be noticed.
These include the following:

  </Text>
  <View>
  <Text style={[styles.text, TextStyle]}>

. Feeling very thirsty.
. Needing to urinate more frequently that usual.
. Feeling tired.
. Blurred vision.
. Loosing weight unintentionally.

  </Text>  
  </View>
  <View>
  <Text style={[styles.text, TextStyle]}>

Over time diabetes can damage eyes, kidneys and nerves.
People with diabetes are at a higher risk of health problems including heart attacks, strokes and kidney failure.
Many people with diabetes develop problems with their feet due to nerve damage and poor blood flow leading to foot ulcers and amputation. 
  One of the most important ways to treat diabetes is to keep a health lifestyle (lifestyle modifications).
Type 1 patients need daily insulin injections for survival.
Some people with type 2 diabetes will need some medicines to help manage and control their blood glucose levels.
These medicines can include insulin or the following:

  </Text>  
  </View>
  <View>
  <Text style={[styles.text, TextStyle]}>
  . Biguanides
  . Sulphonyureas
  . Sodium-glucose co-transporters type 2 (SGLT-2) inhibitors. 
  </Text>  
  </View>

 </View>



 <View style={styles.pressableH}>
  <Text style={styles.textP}>
    Prevention
  </Text>
 </View>

 <View style={[styles.card, backGroundStyle]}>

  <Text style={[styles.text, TextStyle]}>
  Lifestyle changes are the best way to prevent or delay the onset of T2D.
  To prevent type 2, people should do the following:

  </Text>
  <View>
  <Text style={[styles.text, TextStyle]}>
  . Keep a healthy body weight.
  . Stay physically active by at least 30minutes of moderate intensity exercise daily.
  . Eat a healthy diet and avoid sugar and saturated fat.
  . Stop/avoid smoking.
  . Avoid excessive consumption of alcohol.
  </Text>
  
  </View>

 </View>
 </ScrollView>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

      // backgroundColor:'#505050'

  },
        input: {
        height: 40,
        margin: 12,

        borderRadius:10,
        paddingVertical: 10,
        backgroundColor:"#ADD8E6"
        },
        inputP: {
        height: 40,
        margin: 12,
        width: 40,
        borderRadius:10,
        paddingVertical: 10,
        backgroundColor:"#ADD8E6"
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

       card:{

            // backgroundColor:'#e0e0e0',
        padding:20,
        borderRadius:20,
        marginHorizontal: 15,
        marginBottom: 15,
        
        },
       cardP:{
        flexDirection:"row"     
        },
        button:{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 10,
          elevation: 1,

        },
          textP: {
          fontSize: 20,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,
          paddingVertical: 3,
          color:"white",
          fontFamily:"sans-serif-condensed"
        }, 
          text: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          marginHorizontal: 12,
          letterSpacing: 0.25,

          fontFamily:"sans-serif-condensed"
        },  image: {

          borderTopLeftRadius: 40,
          justifyContent: 'center',
          margin:15
        },
            pressable: {
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:"#353839",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginHorizontal:19,
        borderRadius: 15,
        elevation: 1,
    
    },
            pressableS: {
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:"green",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginHorizontal:19,
        marginBottom: 10,
        borderRadius: 15,
        elevation: 1,
    
    },
            pressableH: {
        alignItems:"center",
        justifyContent:"flex-end",
        backgroundColor:"#353839",
        paddingVertical: 12,
        paddingHorizontal: 2,
        marginHorizontal:19,
        marginVertical:10,
        borderRadius: 15,
        elevation: 1,
    
    },
});
