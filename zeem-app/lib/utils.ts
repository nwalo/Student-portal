import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Papa, { ParseResult } from "papaparse";
import * as XLSX from "xlsx";
import { toast } from "sonner";
import DOMPurify from "dompurify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sanitize = (dirty: string): string => {
  return DOMPurify.sanitize(dirty);
};

function checkDateFormat(dateStr: string) {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  return pattern.test(dateStr);
}

export interface StudentProp {
  name: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
  major: string;
  level: string;
}

const handleCSVFile = (file: any): Promise<StudentProp[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target) {
        const fileContents = event.target.result as string;
        Papa.parse<StudentProp>(fileContents, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<StudentProp>) => {
            resolve(results.data);
          },
          error: (error: any) => {
            reject(error);
          },
        });
      }
    };
    reader.readAsText(file);
  });
};

const handleExcelFile = (file: any): Promise<StudentProp[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const formatCheck: boolean = XLSX.utils
        .sheet_to_json<any[]>(sheet, { header: 1 })
        .slice(0, 1)
        .some((e, i) => {
          return (
            e[0] === "name" && e[1].includes("email") && e[2] === "dateOfBirth"
          );
        });

      if (!formatCheck) return resolve([]);

      const jsonData: StudentProp[] = XLSX.utils
        .sheet_to_json<any[]>(sheet, { header: 1 })
        .slice(1) // Skip header row
        .map((row) => ({
          name: row[0],
          email: row[1],
          dateOfBirth: row[2],
          address: row[3],
          phoneNumber: row[4],
          major: row[5],
          level: row[6],
        }));

      resolve(jsonData);
    };
    reader.readAsArrayBuffer(file);
  });
};

export const handleBulkUpload = async (file: any) => {
  if (!file) {
    toast.error("File not found");
    return [];
  }
  let output: any[] = [];

  const fileExtension = file?.name.split(".").pop()?.toLowerCase();

  if (fileExtension === "csv") {
    output = await handleCSVFile(file);
  } else if (fileExtension === "xlsx" || fileExtension === "xls") {
    output = await handleExcelFile(file);
  } else {
    toast.error("Unsupported file format");
  }

  const extractedData: StudentProp[] = output.filter(
    (e) =>
      e["name"] &&
      e["email"] &&
      checkDateFormat(e["dateOfBirth"]) && {
        name: sanitize(e["name"]),
        email: sanitize(e["email"]),
        dateOfBirth: sanitize(e["dateOfBirth"]),
      }
  );

  return extractedData;
};

export const handleGeneratePDF = async (printRef: any, name: string) => {
  if (printRef.current) {
    const pdf = new jsPDF("portrait", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth(); // A4 width in mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // A4 height in mm
    const element = printRef.current;

    // High-resolution canvas for better readability
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Calculate scale to fit the A4 width
    const scale = (pdfWidth * 3.78) / canvasWidth; // 1mm ~ 3.78px
    const imgHeight = canvasHeight * scale;

    let currentHeight = 0;

    while (currentHeight < canvasHeight) {
      const croppedCanvas = document.createElement("canvas");
      const croppedHeight = Math.min(
        canvasHeight - currentHeight,
        pdfHeight * (canvasWidth / pdfWidth)
      );

      croppedCanvas.width = canvasWidth;
      croppedCanvas.height = croppedHeight;

      const context = croppedCanvas.getContext("2d");
      if (context) {
        context.drawImage(
          canvas,
          0,
          currentHeight,
          canvasWidth,
          croppedHeight,
          0,
          0,
          canvasWidth,
          croppedHeight
        );
      }

      const croppedImgData = croppedCanvas.toDataURL("image/png");
      pdf.addImage(
        croppedImgData,
        "PNG",
        0,
        0,
        pdfWidth,
        (croppedHeight / canvasWidth) * pdfWidth
      );

      currentHeight += croppedHeight;

      if (currentHeight < canvasHeight) {
        pdf.addPage();
      }
    }

    pdf.save((name ? name : "student-report") + ".pdf");
  }
};
