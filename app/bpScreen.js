import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View , useColorScheme } from 'react-native';
import { Dimensions, TextInput } from "react-native";
import { useState, useEffect} from "react";
import Bubble from '@/components/bubble'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {router, Link} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBPStore from '../storeBP';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

export default function BpScreen() {
  const {sysValue, setSysValue, BPDate, setBPDate, BPOutCome, setBPOutCome,BPRecomend, setBPRecomend} = useBPStore()
  const colorScheme = useColorScheme();

  const backGroundStyle = colorScheme === 'dark' ? styles.darkBG : styles.lightBG
  const TextStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText

    const [diaValue, setDiaValue] = useState(" ")
    const screenWidth = Dimensions.get("window").width;
    const [gdata, setGData] = useState([0])
    const [glabel, setGLabel] = useState([""])

    const [sValue, setSValue] = useState();
    const [outCome, setOutCome] = useState("Please enter your blood pressure level to receive personalized feedback on your blood pressure status status",)
    const [Recomend, setRecomend] = useState("")

    const [expoPushToken, setExpoPushToken] = useState('');

     useEffect(()=>{
      async function fetchData() {
        try {
          const value = await AsyncStorage.getItem('my-bp');
          const label = await AsyncStorage.getItem('my-blabels');    
          if (value !== null & label !== null) {
            // value previously stored
          setGData([...gdata,value])   
          setGLabel([...glabel,label])       
          }
        } catch (e) {
          // error reading value
          console.log(e)
        }
      }
      fetchData()
  //  console.log("registering for push token")
    registerForPushNotificationsAsync().then(token => {
      // console.log(token)
      setExpoPushToken(token)}).catch((error) => {console.log(error)});
  },[])


  const Add = async () => {
    const dDate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setSysValue(sValue)
    setBPDate(dDate)

    if (sValue<90 & diaValue<60) {
      await schedulePushNotificationL();
      setOutCome("Hypotension stage 1")
      setBPOutCome("Hypotension stage 1")
    }
    else if(sValue<121 & diaValue<81) {
      await schedulePushNotificationN();
      setOutCome("Normal Blood pressure")
      setBPOutCome("Normal Blood pressure")
      setRecomend("Maintain a healthy lifestyle, including a balanced diet and regular exercise.Limit alcohol intake and avoid smoking.Manage stress through relaxation techniques and adequate sleep.")
      setBPRecomend("Maintain a healthy lifestyle, including a balanced diet and regular exercise.Limit alcohol intake and avoid smoking.Manage stress through relaxation techniques and adequate sleep.")
    } else if(sValue<130 & diaValue<81) {
      await schedulePushNotificationNN();
      setOutCome("Elevated blood pressure")
      setBPOutCome("Elevated blood pressure")
      setRecomend("Adopt a healthier diet, focusing on fruits, vegetables, whole grains, and low-fat dairy.Increase physical activity, aiming for at least 150 minutes of moderate-intensity exercise per week.Reduce sodium intake to less than 2,300 mg per day, with an ideal limit of 1,500 mg per day for most adults. Maintain a healthy weight. Monitor blood pressure regularly.")
      setBPRecomend("Adopt a healthier diet, focusing on fruits, vegetables, whole grains, and low-fat dairy.Increase physical activity, aiming for at least 150 minutes of moderate-intensity exercise per week.Reduce sodium intake to less than 2,300 mg per day, with an ideal limit of 1,500 mg per day for most adults. Maintain a healthy weight. Monitor blood pressure regularly.")
    } else if(sValue<140 & diaValue<90) {
      await schedulePushNotificationNH();
      setOutCome("Hypertension stage 1")
      setBPOutCome("Hypertension stage 1")
      setRecomend("Lifestyle modifications as mentioned above (healthy diet, exercise, sodium reduction). Possibly start medication if there are other cardiovascular risk factors (discuss with a healthcare provider). Regular monitoring of blood pressure. Work with a healthcare provider to manage other conditions such as diabetes or high cholesterol.")
      setBPRecomend("Lifestyle modifications as mentioned above (healthy diet, exercise, sodium reduction). Possibly start medication if there are other cardiovascular risk factors (discuss with a healthcare provider). Regular monitoring of blood pressure. Work with a healthcare provider to manage other conditions such as diabetes or high cholesterol.")
    } else if(sValue<180 & diaValue<120) {
      await schedulePushNotificationNtwo();
      setOutCome("Hypertension stage 2")
      setBPOutCome("Hypertension stage 2")
      setRecomend("Stronger emphasis on lifestyle changes (diet, exercise, weight management). Likely need for medication to help lower blood pressure. Regular follow-ups with a healthcare provider to monitor and adjust treatment as necessary. Consider consultation with a specialist if blood pressure is difficult to control.")
      setBPRecomend("Stronger emphasis on lifestyle changes (diet, exercise, weight management). Likely need for medication to help lower blood pressure. Regular follow-ups with a healthcare provider to monitor and adjust treatment as necessary. Consider consultation with a specialist if blood pressure is difficult to control.")
    } else if(sValue>179 & diaValue>120) {
      await schedulePushNotificationNHigh();
      setOutCome("Hypertensive Crisis (Emergency care needed)")
      setBPOutCome("Hypertensive Crisis (Emergency care needed)")
      setRecomend(" Seek immediate medical attention. This is a medical emergency. Do not wait for symptoms to appear. If you experience severe headaches, chest pain, shortness of breath, or visual changes, call emergency services immediately.")
      setBPRecomend(" Seek immediate medical attention. This is a medical emergency. Do not wait for symptoms to appear. If you experience severe headaches, chest pain, shortness of breath, or visual changes, call emergency services immediately.")
    }

    else {
      await schedulePushNotificationL();
      setBPOutCome("Other")
    }
    setGData([...gdata,sValue])
    setGLabel([...glabel,dDate])

    await AsyncStorage.setItem('my-bp', sysValue);
    await AsyncStorage.setItem('my-blabels', dDate);

    setSValue("")
    setDiaValue("")

    // setDiaValue("")
    // setSysValue("")

  }
  const recentLabel = glabel.slice(-4);
  const recentData = gdata.slice(-4);
    const data = {
  labels: recentLabel,
  datasets: [
    {
      data: recentData,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Blood pressure"] // optional
};
const chartConfig = {
  backgroundGradientFrom: colorScheme === 'dark' ? '#333333' : '#FFFFFF',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: colorScheme === 'dark' ? '#222222' : '#FFFFFF',
  backgroundGradientToOpacity: 0.5,
  decimalPlaces: 0,
  color: (opacity = 1) =>
    colorScheme === 'dark'
      ? `rgba(255, 255, 255, ${opacity})`  // Light color for dark mode
      : `rgba(0, 128, 0, ${opacity})`,  
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

  return (

    <View style={[styles.container]}>






     <LineChart
  data={data}
  width={screenWidth}
  height={220}
  yAxisLabel="mmHg"
  chartConfig={chartConfig}
   bezier
/>  



      <View style={[{flexDirection:"row", paddingHorizontal:20, justifyContent:"space-evenly", marginHorizontal:10, marginVertical:9, borderRadius:25}, backGroundStyle]}>
<View style={{paddingVertical:10, marginVertical:12}}>
<Text style={[styles.text, TextStyle]}>SYS</Text>
</View>
       <TextInput
          style={{       
          height: 40,
          width:100,
          margin: 12,
          borderRadius:10,
          paddingVertical: 10,
          backgroundColor:"beige",
          // backgroundColor:"E8E4C9",
          elevation:2,
          paddingLeft:8,
          // backgroundColor:"#ADD8E6"         
          }}
          numberOfLines={2}
          maxLength={40}
          onChangeText={(text) => setSValue(text)} // Update this line
          placeholder='enter '
          blurOnSubmit={true}
          value={sValue} 


          keyboardType="numeric"
          
        />
<View style={{paddingVertical:10, marginVertical:12}}>
<Text style={[styles.text, TextStyle]}>DIA</Text>
</View>

       <TextInput
          style={{       
          height: 40,
          width:100,
          margin: 12,
          borderRadius:10,
          paddingVertical: 10,
          backgroundColor:"beige",
          paddingLeft:8,
          // backgroundColor:"E8E4C9",
          elevation:2
          // backgroundColor:"#ADD8E6"         
          }}
          numberOfLines={2}
          maxLength={40}
          onChangeText={(text) => setDiaValue(text)} // Update this line
          placeholder='enter '
          blurOnSubmit={true}
          value={diaValue} 


          keyboardType="numeric"
          
        />
        <Pressable style={{backgroundColor:"orange", justifyContent:"center", alignItems:"center", margin:12, width:60, borderRadius:10}}
        onPress={Add}>
        <Text style={[styles.text, TextStyle]}   
        >
        Add
        </Text>
        </Pressable>

      </View>
      <View style={[{
        padding:20,
        borderRadius:25,
        marginHorizontal: 9,
        marginBottom: 9,
            }, backGroundStyle]}>
      <Text style={[styles.text, TextStyle]}>
      {outCome}
      </Text>
      </View>

      <ScrollView style= {{flex:1}}> 
      <View style={[{

        padding:20,
        borderRadius:25,
        marginHorizontal: 9,
        marginBottom: 9,
            }, backGroundStyle]}>

      <Pressable onPress={()=> router.push("/lsScreen")}>
      <View style = {{       
              alignItems:"center",
              justifyContent:"flex-end",
              paddingVertical: 7,
              paddingHorizontal: 2,
              backgroundColor:"lightblue",
              borderRadius:25,
          }}>
      <Text style= {[{
                fontSize: 17,
                lineHeight: 19,
                fontWeight: 'bold',
                letterSpacing: 0.1,
              //   color:"black",
                fontFamily:"sans-serif-condensed",}, TextStyle]}
      >
              Recommendations
            </Text>
      </View>
      </Pressable>


      <Text style={[styles.text, TextStyle]}>
      {Recomend}
      </Text>
      </View>



      </ScrollView>

      <View 
      style={[styles.headerB, backGroundStyle]}
      // style={{position:"static", margin:10}}
      >
        <Bubble/>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>

  );
}
async function schedulePushNotificationNN() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Elevated blood pressure",
      body: "We advise you to eat or drink something with simple sugars like a snack",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
async function schedulePushNotificationNtwo() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hypertension stage 2",
      body: "We advise you to take insulin, drink water,and exercise",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
async function schedulePushNotificationNH() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hypertension stage 1",
      body: "We advise you to take insulin, drink water,and exercise",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
async function schedulePushNotificationN() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Normal blood sugar levels",
      body: "You have normal blood sugar levels",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
async function schedulePushNotificationL() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hypotension",
      body: "You have normal blood sugar levels",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}
async function schedulePushNotificationNHigh() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hypertensive Crisis",
      body: "Emergency care needed",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: 'cf65941b-84d7-4282-bab0-20cc4e1d02b7' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
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
  graphStyle: {
    marginTop:20
  },
            text: {
          fontSize: 18,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          marginVertical:5,
          paddingLeft:10,
        //   color:"black",
          fontFamily:"sans-serif-condensed",
        },
        headerB: {
          position:"absolute",
          bottom:20,
          right:20,
          alignItems:'center',
          elevation: 3,
          borderRadius:25,
          padding:10,
          borderWidth:1,
          borderColor:'lightgreen',
      
        },
});
