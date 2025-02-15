"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock function to fetch student data
const fetchStudentData = async (id: string) => {
  // In a real application, this would be an API call
  return {
    id: Number.parseInt(id),
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    dateOfBirth: "1995-05-15",
    address: "123 Main St, Anytown, USA",
    phoneNumber: "+1 (555) 123-4567",
    enrollmentDate: "2023-09-01",
    major: "Computer Science",
    gpa: 3.8,
    credits: 60,
    applications: [
      { id: 1, program: "Summer Internship", status: "Pending" },
      { id: 2, program: "Study Abroad", status: "Approved" },
    ],
  };
};

export default function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    fetchStudentData(id as string).then(setStudent);
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Details</h1>
        <Link href={`/students/edit/${student.id}`}>
          <Button>Edit Student</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{student.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{student.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <p>{student.status}</p>
            </div>
            <div>
              <h3 className="font-semibold">Date of Birth</h3>
              <p>{student.dateOfBirth}</p>
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
              <p>{student.credits}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6">
            {student.applications.map((app: any) => (
              <li key={app.id}>
                {app.program} - {app.status}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
