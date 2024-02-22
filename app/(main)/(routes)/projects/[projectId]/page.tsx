"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectIdPageProps {
  params: {
    projectId: Id<"projects">;
  };
}

export default function ProjectIdPage({ params }: ProjectIdPageProps) {
  const project = useQuery(api.projects.getById, {
    projectId: params.projectId,
  });

  if (project === undefined) {
    return (
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    );
  }

  if (project === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="pb-40">
      <pre>{JSON.stringify(project, null, 2)}</pre>
    </div>
  );
}
