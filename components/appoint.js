import React from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import useAppointStore from '../storeappoint';
import { router , Link} from 'expo-router';

export default function SAppoint() {
  const {hospitalA,setHospitalA,doctorNameA,setDoctorNameA,notesA,setNotesA,startDateA,setStartDateA, startTimeA,setStartTimeA} = useAppointStore()
  const colorScheme = useColorScheme();

const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText
  return (
    <View>
        <Link href="/appointScreen" asChild>
    <Pressable >

            <View style={[styles.card,backGroundStyle]}
                // darkColor="black"
                // darkColor="#353935"
                // lightColor="white"            
            >


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
                <Text style={[styles.textT, TextStyle]}
               
                >Appointment Reminders </Text>

                </View>

            <View style={{flexDirection:"row", justifyContent:"space-between"}}

            > 
                  {hospitalA ? (
              <View style={{width:'60%', backgroundColor:"beige", borderRadius:10, padding:3}}>
              <View>
                <Text >Don't forget your Appointment</Text>
              </View>
              <Text >
               With {doctorNameA} for {notesA} at {hospitalA} on {startDateA} at {startTimeA}
              </Text>
               </View>
             ) : (
                <View  >
                 <FontAwesome
                    name="bell"
                    size={30}
                    color={"green"}
                    // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
      </View>
      )}


        <View style={[styles.pressable, backGroundStyle]} >
            <Text 
            style={[styles.text, TextStyle]}
           
            >Schedule</Text>
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
        button:{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 9,
          paddingHorizontal: 32,
          borderRadius: 10,
          elevation: 1,

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
          text: {
          fontSize: 17,
          lineHeight: 19,
          fontWeight: 'bold',
          letterSpacing: 0.1,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        },         textT: {
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

        justifyContent:"center",
        height:40,
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
