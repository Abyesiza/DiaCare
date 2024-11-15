// textStore.js
import { create } from 'zustand';

const useMedicateStore = create((set) => ({
    //glucoseValue
    drugNameM :"",
    setDrugNameM : (newNumber) => set({drugNameM: newNumber}),

    // date
    nTabsM: "",
    setNTabsM: (newText) => set({nTabsM : newText}),


  nTimesM: "", // initial state for the string text
  setNTimesM: (newText) => set({ nTimesM: newText }), // action to update the text

  //Recomend

  startDateM: "",
  setStartDateM: (newText) => set({startDateM: newText}),

}));

export default useMedicateStore;
