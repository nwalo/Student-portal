"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileDown } from "lucide-react";
import { handleBulkUpload } from "@/lib/utils";
import { studentBatchUpload } from "@/redux/slices/studentSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const resetFileInput = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input field
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await handleBulkUpload(file);

    if (data.length < 1)
      return toast.error(
        "Error: Unable to process the file. Please download and use the provided template for correct formatting."
      );

    const payload = data.map((e) => ({
      ...e,
      enrollmentDate: "10-10-2020",
      level: "100",
      status: "pending",
      gpa: (Math.random() * 5).toFixed(2),
      creditsCompleted: 90,
      id: uuidv4(),
    }));

    dispatch(studentBatchUpload(payload));
    return resetFileInput();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bulk Upload Students</h1>
      <div className="my-10">
        <a href="/data/students_data.xlsx" download>
          <Button type="submit" className="bg-blue-900">
            <FileDown /> Download Template
          </Button>
        </a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="file-upload">Upload CSV or Excel file</Label>
          <Input
            ref={fileInputRef}
            id="file-upload"
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            required
          />
        </div>
        <Button type="submit" disabled={!file}>
          Upload
        </Button>
      </form>
    </div>
  );
}
