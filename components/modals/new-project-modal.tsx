import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNewProject } from "@/hooks/use-new-project";

export function NewProjectModal() {
  const newProject = useNewProject();
  const [title, setTitle] = useState("");
  const create = useMutation(api.projects.create);
  const router = useRouter();

  function onCreate() {
    const promise = create({ title }).then((projectId) => {
      router.push(`/projects/${projectId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new project...",
      success: "New project created!",
      error: "Failed to create a new project.",
    });
  }

  return (
    <Dialog open={newProject.isOpen} onOpenChange={newProject.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">New Project</h2>
        </DialogHeader>
        <Input
          className="w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
        />
        {/* TODO: Add a template selector, with blank as default */}
        <Button onClick={onCreate} className="mt-4">
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
