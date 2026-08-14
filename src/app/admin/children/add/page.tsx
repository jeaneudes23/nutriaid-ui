import { ChildrenCreateForm } from "@/features/children/components/ChildrenCreateForm";

export default function page() {
  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-heading text-xl font-bold lg:text-2xl">Add new child</h2>
      </div>
      <hr className="my-6" />
      <ChildrenCreateForm />
    </div>
  );
}
