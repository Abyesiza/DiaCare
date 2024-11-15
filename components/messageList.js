import {View,Text, ScrollView} from 'react-native'
import React from 'react'
import MessageItem from './messageItem'



export default function MessageList({messages, user, rand}) {

    return(
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:10}}>
    {
        messages.map((message,index)=>{
            return(<MessageItem message={message} key={index} user ={user} rand= {rand}/>)
        })
    }

</ScrollView>


    )
}