// textStore.js
import { create } from 'zustand';

const useBPStore = create((set) => ({
    //glucoseValue
    sysValue :"",
    setSysValue : (newNumber) => set({sysValue: newNumber}),

    // date
    BPDate: "",
    setBPDate: (newDate) => set({BPDate : newDate}),


  BPOutCome: "", // initial state for the string text
  setBPOutCome: (newText) => set({ BPOutCome: newText }), // action to update the text

  //Recomend

  BPRecomend: "",
  setBPRecomend: (newText) => set({BPRecomend: newText}),
}));

export default useBPStore;
