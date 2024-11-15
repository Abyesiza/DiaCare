import React from 'react';
import { Pressable, StyleSheet, Text, View , useColorScheme} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';


import Colors from '@/constants/Colors';
import { router , Link} from 'expo-router';

export default function Bubble() {
    return (

            <Link href="/chatbot" asChild>
            <Pressable>
                <View><Text style={{color:"orange"}}>ChatBot </Text></View>
            </Pressable>           
            </Link>

    )
}