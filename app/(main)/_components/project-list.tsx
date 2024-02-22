"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ProjectItem from "./project-item";
import { cn } from "@/lib/utils";
import { Doc, Id } from "@/convex/_generated/dataModel";
import DocumentList from "./document-list";
import { Plus } from "lucide-react";
import Item from "./item";

interface DocumentListProps {
  parentProjectId?: Id<"projects">;
  data?: Doc<"projects">[];
}

export default function ProjectList({ parentProjectId }: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function onExpand(projectId: string) {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [projectId]: !prevExpanded[projectId],
    }));
  }

  const projects = useQuery(api.projects.getSidebar);

  function onRedirect(projectId: string) {
    router.push(`/projects/${projectId}`);
  }

  if (projects === undefined) {
    return (
      <>
        <Item.Skeleton />
      </>
    );
  }

  function handleCreate() {
    // const promise = create({ title: "Untitled" }).then((documentId) => {
    //   router.push(`/documents/${documentId}`);
    // });

    // toast.promise(promise, {
    //   loading: "Creating a new note...",
    //   success: "New note created!",
    //   error: "Failed to create a new note",
    // });
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block"
        )}
      >
        No pages inside
      </p>
      {projects.map((project) => (
        <div key={project._id}>
          <ProjectItem
            id={project._id}
            onClick={() => onRedirect(project._id)}
            label={project.title}
            active={params.projectId === project._id}
            onExpand={() => onExpand(project._id)}
            expanded={expanded[project._id]}
          />
          {expanded[project._id] && <DocumentList />}
          {expanded[project._id] && (
            <Item onClick={handleCreate} icon={Plus} label="Add a page" />
          )}
        </div>
      ))}
    </>
  );
}
