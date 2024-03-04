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
      <div className="mx-auto mt-10 md:max-w-3xl lg:max-w-4xl">
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
    <div className="flex h-full items-center justify-center pb-40">
      <div className="mx-auto mt-10 flex flex-col items-center md:max-w-3xl lg:max-w-4xl">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground mt-4">
          Navigate to your file by clicking on the file name.
        </p>
      </div>
    </div>
  );
}
