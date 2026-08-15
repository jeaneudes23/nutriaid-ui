import { ChildrenCreateForm } from "@/features/children/components/ChildrenCreateForm";

export default function page() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold lg:text-2xl">Add new child</h2>
      <hr className="my-6" />
      <ChildrenCreateForm />
    </div>
  );
}
