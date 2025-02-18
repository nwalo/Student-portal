"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomTable } from "@/components/custom/table";
import { Badge, BadgeVariantsProps } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateStudentStatus } from "@/redux/slices/studentSlice";
import { IStudent } from "@/interfaces/students";

export default function Home() {
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<IStudent[]>([]);

  const tableHead = ["Name", "Email", "Major", "Status", "Action"];

  const studentsState = useSelector(
    (state: RootState) => state?.persisted.students
  );

  useEffect(() => {
    const students = studentsState.data.filter((e) => e?.status !== "deleted");
    setStudents(students);
  }, [studentsState]);

  const dispatch = useDispatch();

  const handleProcess = (id: string, status: string) => {
    dispatch(updateStudentStatus({ id: String(id), status }));
  };

  const handleSearch = (value: string) => {
    setSearch(value);

    const filtererdStudents = studentsState.data.filter(
      (e) =>
        e?.name?.toLowerCase().includes(value.toLowerCase()) ||
        e?.email?.toLowerCase().includes(value.toLowerCase())
    );

    setStudents(filtererdStudents); // Ensure this line executes
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Management</h1>
      <div className="flex justify-between items-center gap-5">
        <Input
          type="search"
          placeholder="Search students..."
          className="max-w-sm"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Link href={`/add-student`}>
          <Button>Add Student</Button>
        </Link>
      </div>

      <CustomTable
        tableHead={tableHead}
        reset={search === "" ? false : true}
        tableBody={students.map((student) => ({
          id: 1,
          Name: student?.name,
          Email: student?.email,
          Major: student?.major,
          Status: (
            <Badge variant={student?.status as BadgeVariantsProps}>
              {student?.status}
            </Badge>
          ),
          Action: (
            <div className="flex">
              <Link href={`/students/edit/${student?.id}`}>
                <Button variant="outline" size="sm" className="mr-2">
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={() => handleProcess(student?.id, "deleted")}
                size="sm"
              >
                <Trash className="w-5 h-5" /> Delete
              </Button>
            </div>
          ),
          link: `/students/${student?.id}`,
        }))}
      />
    </div>
  );
}
