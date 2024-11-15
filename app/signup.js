import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from './form';
import {router, Link} from 'expo-router';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth, db } from '../firebaseconfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log('User ID:', uid);
        // You could also navigate to a different screen here if needed
        // router.replace("(tabs)")
      } else {
        console.log('User is signed out');
      }
    });

    return unsubscribe;
  }, []);

  const submit = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's profile with the username
      await updateProfile(user, { displayName: username });

      await setDoc(doc(db,"users",userCredential?.user?.uid), {
        username,
        userId:userCredential?.user?.uid,
      });

      console.log('Signed up user:', user);
      Alert.alert('Success', 'Account created successfully');
      router.replace("(tabs)")
      return {success: true, data:userCredential?.user}

    } catch (error) {
      console.error('Error during sign-up:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={{ alignItems: 'center' }}>
          <Text>Sign up to HealthApp </Text>
        </View>

        <FormField
          title="User name"
          value={username}
          handleChangeText = {(e) =>
          setUserName(e)
        } 
          keyboardType="default"
        />
        
        <FormField
          title="Email"
          value={email}
          handleChangeText = {(e) =>
          setEmail(e)
          } 
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={password}
          handleChangeText = {(e) =>
          setPassword(e)}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={submit}
          disabled={loading}
        >
          <Text>SIGN UP </Text>
        </TouchableOpacity>
        
        {loading && <ActivityIndicator style={styles.loading} color="#333" />}
        
        <View style={styles.loginTextContainer}>
          <Text>Already have an account?  </Text>
          <Link href="/signin" style={styles.loginLink}>Log In </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    elevation: 3,
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 20,
    height: '50%',
    justifyContent: 'space-evenly',
  },
  signupButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 120,
  },
  loading: {
    marginVertical: 10,
  },
  loginTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginLink: {
    color: 'orange',
    paddingLeft: 10,
  },
});

// import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
// import React, { useState ,useLayoutEffect} from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import FormField from './form'
// import {router, Link} from 'expo-router';
// import {  createUserWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
// import { auth } from '../firebaseconfig';
// // import { Text, View } from './Themed';


// const SignUp = () => {


//     const [email, setEmail] = useState()
//     const [password, setPassword] = useState()
//     const [loading, setLoading] = useState(false);
//     const [username, setUserName] = useState()

//     useLayoutEffect(() => {
//       // Listen to authentication state changes
//       const unsubscribe = onAuthStateChanged(auth, (user) => {
//         if (user) {
//           // User is signed in
//           const uid = user.uid;
//           console.log('User ID:', uid);
//           // router.replace("(tabs)")
//           // You could also navigate to a different screen here if needed
//         } else {
//           // User is signed out
//           console.log('User is signed out');
//         }
//       });
  
//       // Clean up the listener when the component unmounts
//       return unsubscribe;
//     }, []);

    
//     const submit = async () => {
//    await createUserWithEmailAndPassword(auth, email, password,username)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     console.log(user)
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

//     }

//     return(
//         // <SafeAreaView>
//             <View style={styles.container}>

                
//             <View style={styles.card} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">


//                 <View style={{ alignItems:"center"}} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
//                  <Text > Sign up to HealthApp  </Text>
//                 </View>
//                 <FormField title="User name" value = {username} 
//                     handleChangeText = {(e) =>
//                     setUserName(e)
//                   } 
//                     keyboardType="email-adress"
//                     />
//                     <FormField title="Email" value = {email} 
//                     handleChangeText = {(e) =>
//                     setEmail(e)
//                   } 
//                     keyboardType="email-adress"
//                     />

//                     <FormField 
//                     title="Password" 
//                     value = {password} 
//                     handleChangeText = {(e) =>
//                      setPassword(e)} 
//                     />   

//                     <TouchableOpacity 
//                     style={{ alignItems:"center", 
//                         backgroundColor:"green",
//                     padding:10, borderRadius:10, marginHorizontal:120}}
//                     onPress={submit}
                    
//                     >
//                      <Text > SIGN UP </Text>
//                     </TouchableOpacity>
//                     {loading && <ActivityIndicator style={styles.loading} color="#333" />}
//                     <View style={{justifyContent:"center", flexDirection:"row"}}>
//                         <Text>Already have an account?        </Text>
//                         <Link href="/signin" style={{color:"orange", paddingLeft:10}}>Log in </Link>
//                     </View>

//                     </View>                 

//             </View>
//         // </SafeAreaView>
//     )
// }

// export default SignUp

// const styles = StyleSheet.create({
//     container: {
//         // backgroundColor:'#F8F8F8',

//         flex:1,
//         justifyContent:"center"
//     },

//          card:{
//             // elevation: 3,
//             padding:20, 
//             borderRadius:25,
//             // backgroundColor: 'white',
//             // shadowColor: 'white', // Shadow color
//             // shadowOpacity: 3, // Shadow opacity
//             // shadowRadius: 3, // Shadow radius   
//             // alignItems:"center",
//             marginHorizontal:20 ,
//             height:"40%"  ,
//             // justifyContent:"space-evenly" 
//           },

//   });