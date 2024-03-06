import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNewProject } from "@/hooks/use-new-project";
import TemplateSelector from "../template-selector";

export function NewProjectModal() {
  const newProject = useNewProject();
  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState("");
  const createProject = useMutation(api.projects.create);
  const createDocument = useMutation(api.documents.create);
  const router = useRouter();

  async function onCreate(event: React.FormEvent) {
    event.preventDefault();

    const toastId = toast.loading("Creating a new project...");

    try {
      const projectId = await createProject({ title });
      const documentId = await createDocument({
        title: "main",
        projectId: projectId,
        content: template,
      });

      toast.dismiss(toastId);
      toast.success("New project created!");

      newProject.onClose();
      router.push(`/projects/${projectId}/${documentId}`);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to create a new project.");
      console.error(error);
    }
  }

  return (
    <Dialog open={newProject.isOpen} onOpenChange={newProject.onClose}>
      <DialogContent className="max-w-3xl">
        <form onSubmit={onCreate}>
          <DialogHeader>
            <h2 className="text-center text-lg font-semibold">New Project</h2>
          </DialogHeader>
          <div className="mt-2 flex flex-col items-center gap-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled"
            />
            <TemplateSelector onChange={setTemplate} />
            <Button type="submit" className="mt-4">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
