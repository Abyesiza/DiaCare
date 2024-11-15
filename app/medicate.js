import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  Platform,
  Text,
  View,
  useColorScheme,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Calendar from "expo-calendar";
import useMedicateStore from "../storemedicate";

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MedicateScreen() {
  const {drugNameM, setDrugNameM, nTabsM, setNTabsM, nTimesM, setNTimesM, startDateM, setStartDateM} = useMedicateStore()
  const [drugName, setDrugName] = useState("");
  const [nTabs, setNTabs] = useState("");
  const [nTimes, setNTimes] = useState("");
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(new Date());
  const [showMT, setShowMT] = useState(false);
  const [mode, setMode] = useState("time");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [calendarId, setCalendarId] = useState(null);

  const backGroundStyle = colorScheme === "dark" ? styles.darkBG : styles.lightBG;
  const TextStyle = colorScheme === "dark" ? styles.darkText : styles.lightText;

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
    // Get or create the default calendar
    (async () => {
      const id = await ensureDefaultCalendar();
      setCalendarId(id);
    })();
  }, []);

  const showModeMT = (modeToShow) => {
    setShowMT(true);
    setMode(modeToShow);
  };

  const saveMedicationEvent = async () => {
    if (!drugName || !nTabs || !nTimes || !dateValue) {
      Alert.alert("Error", "Please fill all fields before saving!");
      return;
    }
    console.log(dateValue)


    const startDate = new Date(dateValue);
    const intervalMs = (24 / nTimes) * 60 * 60 * 1000; // Time between doses in milliseconds

    // Validate inputs
    if (isNaN(nTabs) || isNaN(nTimes) || nTabs <= 0 || nTimes <= 0) {
      Alert.alert("Error", "Prescription values must be valid positive numbers!");
      return;
    }

    try {
      // Add event to the calendar
      for (let i = 0; i < nTimes; i++) {
        const notificationTime = new Date(startDate.getTime() + i * intervalMs);

        if (calendarId) {
          await Calendar.createEventAsync(calendarId, {
            title: `Take ${nTabs} ${drugName}`,
            startDate: notificationTime,
            endDate: new Date(notificationTime.getTime() + 30 * 60 * 1000), // 30 minutes duration
            notes: `Reminder to take ${nTabs} of ${drugName}`,
            timeZone: "UTC",
          });
        }

        // Schedule notifications
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Medication Reminder",
            body: `It's time to take ${nTabs} ${drugName}.`,
          },
          trigger: { date: notificationTime },
        });
      }

      Alert.alert("Success", "Medication reminders added!");
    } catch (error) {
      console.error("Error saving medication event:", error);
      Alert.alert("Error", "Failed to add event to calendar or schedule notifications.");
    }
    setDrugNameM(drugName)
    setNTabsM(nTabs)
    setNTimesM(nTimes)
    setStartDateM(startDate.toLocaleString())

    setDrugName("")
    setNTabs("")
    setNTimes("")
    setDateValue("")
  };

  return (
    <View style={styles.container}>
      {startDateM ?  (
      <View style={[styles.card,backGroundStyle]}>
      <View>
        <Text style={[styles.text, TextStyle]} >Don't forget to take your drugs</Text>
      </View>
      <Text style={[styles.text, TextStyle]}> {nTabsM} tab(s) of {drugNameM} {nTimesM} times a day started on {startDateM} </Text>

     </View>
      ) : (
        <View> </View>

      )}


      <ScrollView>
        <View style={[styles.card, backGroundStyle]}>
          <Text style={[styles.text, TextStyle]}>Drug name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDrugName}
            value={drugName}
            placeholder="Enter drug name"
          />
        </View>

        <View style={[styles.card, backGroundStyle]}>
          <Text style={[styles.text, TextStyle]}>Enter prescription</Text>
          <View style={styles.cardP}>
            <TextInput
              style={styles.inputP}
              keyboardType="numeric"
              onChangeText={setNTabs}
              value={nTabs}
              placeholder="Tabs"
            />
            <Text style={styles.textP}>X</Text>
            <TextInput
              style={styles.inputP}
              keyboardType="numeric"
              onChangeText={setNTimes}
              value={nTimes}
              placeholder="Times"
            />
          </View>
        </View>

        <View style={[styles.card, backGroundStyle]}>
          <Text style={[styles.text, TextStyle]}>Choose Start Option</Text>

          <Pressable
            style={styles.pressable}
            onPress={() => {
              const now = new Date();
              setDate(now);
              setDateValue(now.toISOString());
            }}
          >
            <Text style={[styles.textHeader]}>Start Now</Text>
          </Pressable>

          <Text style={[styles.text, TextStyle]}>Or Specify Start Time</Text>
          <TextInput
            placeholder="Tap to select time"
            style={styles.input}
            onPressIn={() => showModeMT("time")}
            value={dateValue ? new Intl.DateTimeFormat("default", { timeStyle: "short" }).format(new Date(dateValue)) : ""}
          />
          {showMT && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={(e, selectedDate) => {
                setShowMT(false);
                if (selectedDate) {
                  setDate(selectedDate);
                  setDateValue(selectedDate.toISOString());
                }
              }}
            />
          )}
        </View>
      </ScrollView>

      <Pressable style={styles.pressableS} onPress={saveMedicationEvent}>
        <Text style={styles.textHeader}>SAVE</Text>
      </Pressable>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

// Helper Functions for Calendar and Notifications
async function ensureDefaultCalendar() {
  try {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find((cal) => cal.source.name === "Default");
    if (defaultCalendar) return defaultCalendar.id;

    // Create a default calendar if it doesn't exist
    const newCalendar = await Calendar.createCalendarAsync({
      title: "Medications",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      source: { isLocalAccount: true, name: "Default" },
      name: "Medication Reminders",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount: Device.deviceName, // Specify owner account for calendar creation
    });
    return newCalendar.id;
  } catch (error) {
    console.error("Error ensuring default calendar:", error);
    throw new Error("Could not access or create calendar.");
  }
}


async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus === "granted") {
      return (await Notifications.getExpoPushTokenAsync()).data;
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkBG: { backgroundColor: "rgba(255,255,255,0.1)" },
  lightBG: { backgroundColor: "#FFFFFF" },
  darkText: { color: "#FFFFFF" },
  lightText: { color: "#333333" },
  card: { padding: 20, borderRadius: 20, marginHorizontal: 10, marginBottom: 15 },
  cardP: { flexDirection: "row" },
  input: { height: 40, margin: 12, borderRadius: 10, paddingVertical: 10, backgroundColor: "#ADD8E6" },
  inputP: { height: 40, margin: 12, width: 40, borderRadius: 10, paddingVertical: 10, backgroundColor: "#ADD8E6" },
  textP: { fontSize: 30, marginHorizontal: 12, marginTop: 17, color: "#36454F" },
  textHeader: { fontSize: 16, fontWeight: "bold", color:"white" },
  text: { fontSize: 16, fontWeight: "bold" },
  pressable: { alignItems: "center", justifyContent: "center", padding: 12, backgroundColor: "#353839", borderRadius: 15 },
  pressableS: { alignItems: "center", justifyContent: "center", backgroundColor: "green", padding: 12, borderRadius: 15, position: "absolute", bottom: 20, alignSelf: "center", width: 200 },
});
