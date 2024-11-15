// textStore.js
import { create } from 'zustand';

const useAppointStore = create((set) => ({
    //glucoseValue
    hospitalA :"",
    setHospitalA : (newNumber) => set({hospitalA: newNumber}),

    // date
    doctorNameA: "",
    setDoctorNameA: (newText) => set({doctorNameA : newText}),


  notesA: "", // initial state for the string text
  setNotesA: (newText) => set({ notesA: newText }), // action to update the text

  //Recomend

  startDateA: "",
  setStartDateA: (newText) => set({startDateA: newText}),

  startTimeA: "",
  setStartTimeA: (newText) => set({startTimeA: newText}),
}));

export default useAppointStore;
