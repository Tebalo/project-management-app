import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import InputError from "@/Components/InputError";
import { useToast } from "@/hooks/use-toast";
import { DateTimePicker } from "@/Components/ui/time-picker/date-time-picker";
import { getStatusOptions } from "@/utils/constants";

type Props = {};

export default function Create({}: Props) {
  const { data, setData, post, errors, reset } = useForm({
    image: null as File | null,
    name: "",
    description: "",
    status: "",
    due_date: "",
  });

  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route("project.store"), {
      preserveState: true,
      onSuccess: () => reset(),
      onError: (error) => {
        const errorMessage = Object.values(error).join(" ");
        toast({
          title: "Failed to create project",
          variant: "destructive",
          description: errorMessage,
          duration: 5000,
        });
      },
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Create New Project
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="space-y-6 bg-white p-4 shadow dark:bg-card sm:rounded-lg sm:p-8"
            >
              {/* Project Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">
                  Project Image{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="image"
                  type="file"
                  className="cursor-pointer"
                  accept=".jpg,.jpeg,.png,.webp,.svg"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setData("image", e.target.files[0]);
                    }
                  }}
                />
                <InputError message={errors.image} />
              </div>

              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="project_name">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="project_name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  required
                  autoFocus
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label htmlFor="project_description">
                  Project Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="project_description"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  required
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Project Deadline with DateTime Picker */}
              <div className="space-y-2">
                <Label htmlFor="project_due_date">
                  Project Deadline{" "}
                  <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <DateTimePicker
                  className="w-full"
                  value={data.due_date ? new Date(data.due_date) : undefined}
                  onChange={(date) =>
                    setData("due_date", date ? date.toISOString() : "")
                  }
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Project Status */}
              <div className="space-y-2">
                <Label htmlFor="project_status">
                  Project Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  onValueChange={(value) => setData("status", value)}
                  defaultValue={data.status}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {getStatusOptions().map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <Button variant="secondary" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
