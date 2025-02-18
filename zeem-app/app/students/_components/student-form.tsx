"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { addStudentSchema } from "@/constants/schemas";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addStudent, editStudent } from "@/redux/slices/studentSlice";
import { v4 as uuidv4 } from "uuid";

export default function StudentForm() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const studentsState = useSelector(
    (state: RootState) => state?.persisted.students
  );

  const student = studentsState.data.find((student) => student?.id === id);

  const form = useForm<z.infer<typeof addStudentSchema>>({
    resolver: zodResolver(addStudentSchema),
    defaultValues: {
      name: student?.name ?? "",
      email: student?.email ?? "",
      dateOfBirth: student?.dateOfBirth
        ? new Date(student?.dateOfBirth)
        : undefined,
      address: student?.address ?? "",
      phoneNumber: student?.phoneNumber ?? "",
      major: student?.major ?? "",
    },
  });

  const onSubmit = (data: z.infer<typeof addStudentSchema>) => {
    const uid = uuidv4();
    const payload = {
      name: data?.name,
      email: data?.email,
      dateOfBirth: data?.dateOfBirth
        ? format(data?.dateOfBirth, "dd-MM-yyy")
        : "",
      address: data?.address,
      phoneNumber: data?.phoneNumber,
      major: data?.major,
      enrollmentDate: "10-10-2020",
      level: "100",
      status: "pending",
      gpa: (Math.random() * 5).toFixed(2),
      creditsCompleted: 90,
      id: uid,
    };

    if (id) {
      dispatch(editStudent(payload));
    } else {
      dispatch(addStudent(payload));
      form.reset();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{id ? "Edit" : "Add"} Student</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Name</Label>
                <FormControl>
                  <Input {...field} id="name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="email">Email</Label>
                <FormControl>
                  <Input {...field} id="email" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${
                            !field.value && "text-muted-foreground"
                          }`}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date?.toISOString() || "")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="address">Address</Label>
                <FormControl>
                  <Input {...field} id="address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <FormControl>
                  <Input {...field} id="phoneNumber" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="major">Major</Label>
                <FormControl>
                  <Input {...field} id="major" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{id ? "Update" : "Create"} Student</Button>
        </form>
      </Form>
    </div>
  );
}
