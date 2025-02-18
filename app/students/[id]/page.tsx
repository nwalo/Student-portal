"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateStudentStatus } from "@/redux/slices/studentSlice";
import { Badge, BadgeVariantsProps } from "@/components/ui/badge";
import { format } from "date-fns";
import { FileDown } from "lucide-react";
import { handleGeneratePDF } from "@/lib/utils";

export default function StudentDetails() {
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleProcess = (status: string) => {
    dispatch(updateStudentStatus({ id: String(id), status }));
  };

  const studentsState = useSelector(
    (state: RootState) => state?.persisted.students
  );

  const student = studentsState.data.find((student) => student?.id === id);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap flex-col gap-4 items-start lg:flex-row lg:justify-between lg:items-center">
        <h1 className="text-3xl font-bold">Student Details</h1>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => handleGeneratePDF(printRef, student?.name)}>
            <FileDown /> Download Report
          </Button>
          {student?.status !== "active" && student?.status !== "graduated" && (
            <Button
              className="bg-green-900"
              onClick={() => handleProcess("active")}
            >
              Approve Student
            </Button>
          )}
          {student?.status !== "disabled" &&
            student?.status !== "graduated" && (
              <Button
                variant="destructive"
                onClick={() => handleProcess("disabled")}
              >
                Disable Student
              </Button>
            )}
        </div>
      </div>
      <div style={{ width: "100%", padding: "0px" }}>
        <div
          ref={printRef}
          className="print-area w-full space-y-6"
          style={{
            width: "100%",
            // padding: "20px",
            lineHeight: "1.6",
            fontSize: "14px",
            color: "#000",
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{student.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>{student.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Status</h3>
                  <div>
                    <Badge variant={student.status as BadgeVariantsProps}>
                      {student.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Date of Birth</h3>
                  <p>{format(student?.dateOfBirth, "PPP")}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Phone Number</h3>
                  <p>{student.phoneNumber}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="font-semibold">Address</h3>
                  <p>{student.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Enrollment Date</h3>
                  <p>{student.enrollmentDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Major</h3>
                  <p>{student.major}</p>
                </div>
                <div>
                  <h3 className="font-semibold">GPA</h3>
                  <p>{student.gpa}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Credits Completed</h3>
                  <p>{student.creditsCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {student?.applications && (
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6">
                  {student?.applications.map((app: any) => (
                    <li key={app.id}>
                      {app.program} - {app.status}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
