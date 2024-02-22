"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./project-item";
import { cn } from "@/lib/utils";

export default function ProjectList() {
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
        <Item.Skeleton/>
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
        )}
      >
        No pages inside
      </p>
      {projects.map((project) => (
        <div key={project._id}>
          <Item
            id={project._id}
            onClick={() => onRedirect(project._id)}
            label={project.title}
            active={params.projectId === project._id}
            onExpand={() => onExpand(project._id)}
            expanded={expanded[project._id]}
          />
        </div>
      ))}
    </>
  );
}
