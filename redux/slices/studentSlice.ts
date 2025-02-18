import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudent, IStudents } from "@/interfaces/students";
import { toast } from "sonner";
import { getStudents } from "@/data/students";

const students = getStudents();

const initialState: IStudents = {
  data: [...students],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<IStudent>) => {
      const foundItem = state.data.find((e) => e.name === action.payload.name);

      if (!foundItem) {
        state.data.push(action.payload);
        toast.success(`Student has been added`);
      } else {
        toast.warning(`${action.payload.name} already exist.`);
      }
    },
    editStudent: (state, action: PayloadAction<IStudent>) => {
      const student = state.data.find((e) => e.name === action.payload.name);

      if (student) {
        Object.assign(student, action.payload); // Updates the found student
        toast.success(`Student has been updated`);
      } else {
        toast.warning(`Cannot find this user.`);
      }
    },
    updateStudentStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: string;
      }>
    ) => {
      const student = state.data.find((e) => e.id === action.payload.id);

      if (student) {
        student.status = action.payload.status; // Update the student's status
        toast.success(`Student status updated to ${action.payload.status}`);
      } else {
        toast.warning(`Cannot find this user.`);
      }
    },
    studentBatchUpload: (state, action: PayloadAction<IStudent[]>) => {
      // Add all the students from the payload to the current state

      state.data.push(...action.payload);
      toast.success(`Students have been uploaded`);
    },
  },
});

export const {
  addStudent,
  editStudent,
  updateStudentStatus,
  studentBatchUpload,
} = studentSlice.actions;
export default studentSlice.reducer;
