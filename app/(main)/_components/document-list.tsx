"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentProjectId?: Id<"projects">;
  data?: Doc<"documents">[];
}

export default function DocumentList({ parentProjectId }: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function onExpand(documentId: string) {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentProject: parentProjectId,
  });

  function onRedirect(documentId: string) {
    router.push(`/projects/${parentProjectId}/${documentId}`);
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
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block"
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
            icon={FileIcon}
            active={params.documentId === document._id}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
        </div>
      ))}
    </>
  );
}
