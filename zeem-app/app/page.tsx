"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/custom/pagination";

// Mock data for demonstration
const students = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: 'Jane Smith", email: jane@example.com', status: "Active" },
  // Add more mock data as needed
];

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Management</h1>
      <div className="flex justify-between items-center">
        <Input
          type="search"
          placeholder="Search students..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button>Download Report</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Link
                  href={`/students/${student.id}`}
                  className="hover:underline"
                >
                  {student.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/students/${student.id}`}
                  className="hover:underline"
                >
                  {student.email}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/students/${student.id}`}
                  className="hover:underline"
                >
                  {student.status}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/students/edit/${student.id}`}>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <Button variant="destructive" size="sm">
                  Deactivate
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination />
    </div>
  );
}
