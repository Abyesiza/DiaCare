// textStore.js
import { create } from 'zustand';

const useGOutComeStore = create((set) => ({
    //glucoseValue
    glucoseValue :"",
    setGlucoseValue : (newNumber) => set({glucoseValue: newNumber}),

    // date
    gDate: "",
    setGDate: (newDate) => set({gDate : newDate}),


  gOutCome: "", // initial state for the string text
  setgOutCome: (newText) => set({ gOutCome: newText }), // action to update the text

  //Recomend

  gRecomend: "",
  setgRecomend: (newText) => set({gRecomend: newText}),
}));

export default useGOutComeStore;
