"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Item from "./item";
import ImageItem from "./image-item";

interface ImageListProps {
  projectId: Id<"projects">;
}

export default function ImageList({ projectId }: ImageListProps) {
  const images = useQuery(api.images.getByProjectId, {
    projectId: projectId,
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
          <ImageItem label={image.title} url={image.url} id={image._id} />
        </div>
      ))}
    </>
  );
}
