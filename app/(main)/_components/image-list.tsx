"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Item from "./item";
import { cn } from "@/lib/utils";
import { FileImage } from "lucide-react";

interface ImageListProps {
  parentProjectId: Id<"projects">;
}

export default function ImageList({ parentProjectId }: ImageListProps) {
  const images = useQuery(api.projects.getImages, {
    projectId: parentProjectId,
  });

  if (images === undefined) {
    return (
      <>
        <Item.Skeleton />
      </>
    );
  }

  return (
    <>
      {images.map((image, index) => (
        <div key={index}>
          <Item label={image} icon={FileImage} level={1.5} />
        </div>
      ))}
    </>
  );
}
