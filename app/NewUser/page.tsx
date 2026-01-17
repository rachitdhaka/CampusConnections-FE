"use client";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp afterSignUpUrl="/CompleteInformation" />
    </div>
  );
}
