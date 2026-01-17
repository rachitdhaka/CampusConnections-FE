"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { log } from "console";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters."),
  workingLocation: z
    .string()
    .min(2, "Working location must be at least 2 characters."),
  contact: z.string().min(10, "Contact number must be at least 10 characters."),
  course: z.string().min(2, "Course name must be at least 2 characters."),
  batch: z.string().min(1, "Batch is required."),
  
});
import { useUser } from '@clerk/nextjs'
import { userInfo } from "os";

export default function CompleteInformationPage() {
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      workingLocation: "",
      contact: "",
      course: "",
      batch: "",
      
    },

    
  });

   
   


  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const mainData = {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        company: data.company,
        workingLocation: data.workingLocation,
        contact: data.contact,
        batch: data.batch,
        course: data.course,
      };


    //   console.log(mainData);
      
      
      await axios.post("http://localhost:1000/user/userInformation", mainData);
      toast.success("Profile updated successfully");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {}
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Profile Information</CardTitle>
          <CardDescription>
            Help us improve by filling your profile information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="company"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Company</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter your company name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="workingLocation"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Working Location</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter your working location"
                      autoComplete="off"
                    />
                    {fieldState.invalid && fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="contact"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Contact</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter your contact number"
                      autoComplete="off"
                    />
                    {fieldState.invalid && fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="course"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Course</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter your course name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="batch"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Batch</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter your batch name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && fieldState.error && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field
            orientation="horizontal"
            className="w-full flex justify-end gap-2"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-rhf-demo">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
