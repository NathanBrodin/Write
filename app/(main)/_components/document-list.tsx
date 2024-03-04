"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import Item from "./item";
import { cn } from "@/lib/utils";
import { FileCode2 } from "lucide-react";

interface DocumentListProps {
  projectId: Id<"projects">;
  data?: Doc<"documents">[];
}

export default function DocumentList({ projectId }: DocumentListProps) {
  const params = useParams();
  const router = useRouter();

  const documents = useQuery(api.documents.getByProjectId, {
    projectId: projectId,
  });

  function onRedirect(documentId: string) {
    router.push(`/projects/${projectId}/${documentId}`);
  }

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton />
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: "24px",
        }}
        className={cn(
          "text-muted-foreground/80 hidden text-sm font-medium",
          documents.length === 0 ? "block" : "hidden",
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileCode2}
            active={params.documentId === document._id}
            level={1.5}
          />
        </div>
      ))}
    </>
  );
}
