"use client";

import { CustomTable } from "@/components/custom/table";
import { Badge, BadgeVariantsProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateStudentStatus } from "@/redux/slices/studentSlice";
import { RootState } from "@/redux/store";
import { RefreshCw } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Applications() {
  const dispatch = useDispatch();
  const tableHead = ["Student Name", "Program", "Email", "Status", "Action"];

  const studentsState = useSelector(
    (state: RootState) => state?.persisted.students
  );

  const students = studentsState.data.filter((e) => e?.status === "deleted");

  const handleProcess = (id: string, status: string) => {
    dispatch(updateStudentStatus({ id: String(id), status }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Blacklisted Students</h1>
      <CustomTable
        tableHead={tableHead}
        tableBody={students.map((student) => ({
          id: student?.id,
          "Student Name": student?.name,
          Email: student?.email,
          Program: student?.major,
          Status: (
            <Badge variant={student?.status as BadgeVariantsProps}>
              {student?.status}
            </Badge>
          ),
          Action: (
            <Button
              variant={"active"}
              onClick={() => handleProcess(student?.id, "active")}
              size="sm"
            >
              <RefreshCw /> Restore
            </Button>
          ),
        }))}
      />
    </div>
  );
}
