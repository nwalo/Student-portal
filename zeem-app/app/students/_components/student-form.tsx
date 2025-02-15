"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Mock function to fetch student data
const fetchStudentData = async (id: string) => {
  // In a real application, this would be an API call
  return {
    id: Number.parseInt(id),
    name: "John Doe",
    email: "john@example.com",
    dateOfBirth: "1995-05-15",
    address: "123 Main St, Anytown, USA",
    phoneNumber: "+1 (555) 123-4567",
    major: "Computer Science",
  };
};

export default function StudentForm() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    address: "",
    phoneNumber: "",
    major: "",
  });

  useEffect(() => {
    fetchStudentData(id as string).then(setFormData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (update student data)
    console.log("Updated student data:", formData);
    // After successful update, redirect to student details page
    router.push(`/students/${id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="major">Major</Label>
          <Input
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Update Student</Button>
      </form>
    </div>
  );
}
