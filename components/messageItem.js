import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageItem({ message, user, rand }) {
  // Determine if the message is from the current user by checking userId
  const isCurrentUser = user?.uid === message?.userId || rand === message?.userId;

  return (
    <View
      style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
        ]}
      >
        <Text style={styles.messageText}>{message?.text || '...'}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 10, color: 'grey', marginTop: 5 }}>
            {message?.senderName}
          </Text>
          <Text style={styles.timestamp}>
            {message?.createdAt?.toDate().toLocaleTimeString() || ''}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Define styles for message layout and appearance
const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 3,
    marginHorizontal: 5,
  },
  currentUserContainer: {
    justifyContent: 'flex-end', // Align to right for current user
  },
  otherUserContainer: {
    justifyContent: 'flex-start', // Align to left for others
  },
  messageBubble: {
    borderRadius: 15,
    padding: 10,
    maxWidth: '80%',
  },
  currentUserBubble: {
    backgroundColor: '#DCF8C6', // Light green background for user's message
  },
  otherUserBubble: {
    backgroundColor: '#ECECEC', // Light grey background for other users' messages
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: 'grey',
    textAlign: 'right',
    marginTop: 5,
    marginLeft: 10,
  },
});
