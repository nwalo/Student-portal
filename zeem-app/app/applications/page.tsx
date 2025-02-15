import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const applications = [
  {
    id: 1,
    studentName: "John Doe",
    program: "Computer Science",
    status: "Pending",
  },
  {
    id: 2,
    studentName: "Jane Smith",
    program: "Business Administration",
    status: "Approved",
  },
  // Add more mock data as needed
];

export default function Applications() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Applications</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Program</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.studentName}</TableCell>
              <TableCell>{application.program}</TableCell>
              <TableCell>{application.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
