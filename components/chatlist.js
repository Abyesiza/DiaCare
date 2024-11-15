import React from 'react';
import { StyleSheet, View  , Text} from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
// import {} from './Themed';
import ChatItem from '@/components/chatitem'
import Colors from '@/constants/Colors';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChatList({users}) {
  const router = useRouter();
  return (
    <View>
        {/* <Text>ChatList </Text> */}
        <FlatList
        data={users}
        contentContainerStyle={{paddingVertical:25}}
        keyExtractor={item => Math.random()}
        showsVerticalScrollIndicator={false}
        renderItem={({item,index}) => 
        <ChatItem item={item} index = {index} router = {router}/>
        }
        />

    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
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
