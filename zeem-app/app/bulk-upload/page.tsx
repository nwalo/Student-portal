"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload
    console.log("File to upload:", file);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bulk Upload Students</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="file-upload">Upload CSV or Excel file</Label>
          <Input
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
