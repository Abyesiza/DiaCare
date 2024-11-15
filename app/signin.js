import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from './form'
import {router, Link} from 'expo-router';
import {  signInWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseconfig';



const SignIn = () => {


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
      // Listen to authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const uid = user.displayName;
          console.log('User ID:', uid);
          // router.replace("(tabs)")
          // You could also navigate to a different screen here if needed
        } else {
          // User is signed out
          console.log('User is signed out');
        }
      });
  
      // Clean up the listener when the component unmounts
      return unsubscribe;
    }, []);
    
    const submit = async () => {
      setLoading(true)
      if( !email || !password) {

          Alert.alert('Error' , ' please fill in all the fields')

      }

      try {
      await signInWithEmailAndPassword(auth, email, password);

      // set result to global state

      router.replace("(tabs)")
      } catch (error) {
          Alert.alert('Error', error.message)
      } finally {
          setLoading(false)
      }

  }
    // const submit = async () => {
    //   setLoading(true)
    //   console.log(email)
    //   await signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {

    //     // Signed in 
    //     const user = userCredential.user;
    //     console.log(user)
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //   }).finally(
    //     setLoading(false)
    //   );

    // }

    return(
        // <SafeAreaView>
            <View style={styles.container}>

                
            <View style={styles.card}>


                <View style={{ alignItems:"center"}}>
                 <Text > Log in to HealthApp </Text>
                </View>

                    <FormField title="Email" value = {email} 
                    handleChangeText = {(e) =>
                    setEmail(e)
                  } 
                    keyboardType="email-adress"
                    />

                    <FormField 
                    title="Password" 
                    value = {password} 
                    handleChangeText = {(e) =>
                     setPassword(e)} 
                    />   

                    <TouchableOpacity 
                    style={{ alignItems:"center", 
                        backgroundColor:"green",
                    padding:10, borderRadius:10, marginHorizontal:120}}
                    onPress={submit}
                    
                    >
                     <Text > LOGIN </Text>
                    </TouchableOpacity>
                    {loading && <ActivityIndicator style={styles.loading} color="#333" />}
                    <View style={{justifyContent:"center", flexDirection:"row"}}>
                        <Text>Don't have an account? </Text>
                        <Link href="/signup" style={{color:"orange", paddingLeft:10}}>Sign Up </Link>
                    </View>

                    </View>                 

            </View>
        // </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#F8F8F8',

        flex:1,
        justifyContent:"center"
    },

         card:{
            elevation: 3,
            padding:20,
            borderRadius:25,
            backgroundColor: 'white',
            shadowColor: 'white', // Shadow color
            shadowOpacity: 3, // Shadow opacity
            shadowRadius: 3, // Shadow radius   
            // alignItems:"center",
            marginHorizontal:20 ,
            height:"40%"  ,
            justifyContent:"space-evenly" 
          },

  });