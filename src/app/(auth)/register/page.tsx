import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

export default function page() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <h2 className="font-heading text-3xl font-bold">Create an account</h2>
        <p className="text-gray-600">Enter your details to get started with PediatricCare.</p>
      </div>
      <form className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label>Full name</Label>
            <Input name="name" id="name" />
          </div>
          <div className="grid gap-1">
            <Label>Email address</Label>
            <Input name="email" type="email" id="email" />
          </div>
          <div className="grid gap-1">
            <Label>Password</Label>
            <Input type="password" name="password" id="password" />
          </div>
          <div className="grid gap-1">
            <Label>Confirm password</Label>
            <Input type="password" name="password_confirmation" id="password_confirmation" />
          </div>
        </div>
        <div className="grid">
          <Button>Create an account</Button>
        </div>
      </form>
      <div className="grid gap-4 border-t py-4">
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary font-bold">
            Login
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
