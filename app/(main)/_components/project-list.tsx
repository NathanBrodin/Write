"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ProjectItem from "./project-item";
import DocumentList from "./document-list";
import Item from "./item";
import ImageList from "./image-list";

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

  const projects = useQuery(api.projects.getAll);

  function onRedirect(projectId: string) {
    router.push(`/projects/${projectId}`);
  }

  if (projects === undefined) {
    // Show between 2 and 5 skeletons to make it look more dynamic
    const skeletonCount = Math.floor(Math.random() * 4) + 2;
    return (
      <>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Item.Skeleton key={index} />
        ))}
      </>
    );
  }

  return (
    <>
      {projects.map((project) => (
        <div key={project._id}>
          <ProjectItem
            projectId={project._id}
            projectTitle={project.title}
            label={project.title}
            onClick={() => onRedirect(project._id)}
            active={params.projectId === project._id}
            onExpand={() => onExpand(project._id)}
            expanded={expanded[project._id]}
          />
          {expanded[project._id] && <ImageList projectId={project._id} />}
          {expanded[project._id] && <DocumentList projectId={project._id} />}
        </div>
      ))}
    </>
  );
}
