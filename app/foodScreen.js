import React from 'react';
import { View, Image, StyleSheet, ScrollView , Text, useColorScheme} from 'react-native';

export default function FoodScreen() {

const colorScheme = useColorScheme();
const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText

  return (
    <View style={styles.container}>
      <View style={[styles.card,backGroundStyle]}>
        <Text style={[{fontSize:20},TextStyle]}>Recommended Foods depending on your condition</Text>
      </View>
      <ScrollView>
        <View style={[styles.card,backGroundStyle]}>
        <Image
        source={require('../assets/images/beans.jpg')} // Path to your local image
        style={styles.image}
      />
      <View style={{justifyContent:"center", marginLeft:40}}>
      <Text style={[{fontSize:20},TextStyle]}>Beans </Text>
      </View>

        </View>
        <View style={[styles.card,backGroundStyle]}>
            <Image
        source={require('../assets/images/nuts.jpg')} // Path to your local image
        style={styles.image}
      />
            <View style={{justifyContent:"center", marginLeft:40}}>
      <Text style={[{fontSize:20},TextStyle]}>Nuts </Text>
      </View>

        </View>

        <View style={[styles.card,backGroundStyle]}>
            <Image
        source={require('../assets/images/fruits.jpg')} // Path to your local image
        style={styles.image}
      />
            <View style={{justifyContent:"center", marginLeft:40}}>
      <Text style={[{fontSize:20},TextStyle]}>Fruits </Text>
      </View>

        </View>
        <View style={[styles.card,backGroundStyle]}>
            <Image
        source={require('../assets/images/greens.jpg')} // Path to your local image
        style={styles.image}
      />
            <View style={{justifyContent:"center", marginLeft:40}}>
      <Text style={[{fontSize:20},TextStyle]}>Greens </Text>
      </View>

        </View>
        <View style={[styles.card,backGroundStyle]}>
                  <Image
        source={require('../assets/images/oats.jpg')} // Path to your local image
        style={styles.image}
      />
            <View style={{justifyContent:"center", marginLeft:40}}>
      <Text style={[{fontSize:20},TextStyle]}>Oats </Text>
      </View>

        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  image: {
    width: 150,
    height: 150,
    borderRadius:30
  },
  card:{
    elevation: 3,
    padding:20,
    borderRadius:25,
    marginHorizontal: 10,
    marginBottom: 9,
    flexDirection:"row"
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
});
