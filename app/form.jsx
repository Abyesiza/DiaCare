import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FormField = ({title, value,placeholder,keyboardType, handleChangeText, ...props }) => {
const [showPassword, setShowPassword] = useState(false)
    return(

            <View>
                <Text>{title}</Text>
                <View style={styles.FV}>
                    <TextInput 

                    value={value}
                    placeholder={placeholder}  
                    placeholderTextColor="black"
                    onChangeText={handleChangeText} 
                    secureTextEntry = {title === "Password" && !showPassword} 
                    keyboardType={keyboardType}
                    />
                    {
                     title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <FontAwesome
                        name={!showPassword ?  'eye-slash' : 'eye' }
                        size={20}
                        color={"grey"}
                        // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                        />  
                    </TouchableOpacity>
                     )
                     }
                </View>
            </View>


    )
}

export default FormField

const styles = StyleSheet.create({

    FV :{
        backgroundColor:"beige",
        flexDirection:"row",
        justifyContent:"space-between",
        padding:5,
        borderRadius:10,


    }


  });