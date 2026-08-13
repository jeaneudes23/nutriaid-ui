import { SigninForm } from "@/components/features/auth/components/SigninForm";
import { ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="grid gap-8">
      <h2 className="font-heading text-3xl font-bold">Login</h2>
      <SigninForm />
      <div className="grid gap-4 border-t py-4">
        <p className="text-center text-sm text-gray-600">
          Need an account?{" "}
          <Link href={"/register"} className="text-primary font-bold">
            Register
          </Link>
        </p>
        <div className="border-primary bg-primary/5 flex items-start gap-2 border-l-4 p-4">
          <ShieldAlertIcon className="text-primary size-6 shrink-0" />
          <p className="text-sm">Your data is securely stored and handled according to our Privacy Policy. For informational purposes only.</p>
        </div>
      </div>
    </div>
  );
}
