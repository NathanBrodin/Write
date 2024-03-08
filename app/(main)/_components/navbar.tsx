"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { FileCode2, FileText, MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import Publish from "./share";
import { Mode } from "@/lib/types";
import { useLocalStorage } from "usehooks-ts";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export default function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const [mode, setMode] = useLocalStorage<Mode[]>("mode", ["code"]);

  if (document === undefined) {
    return (
      <nav className="bg-background flex w-full items-center justify-between px-3 py-2 dark:bg-[#1F1F1F]">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background flex w-full items-center gap-x-4 px-3 py-2 dark:bg-[#1F1F1F] print:hidden">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="text-muted-foreground h-6 w-6"
          />
        )}
        <div className="flex w-full items-center justify-between">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <ToggleGroup
              type="multiple"
              variant="outline"
              size={"sm"}
              value={mode}
              onValueChange={(values) => {
                if (values.length === 0) {
                  // Prevent all items from being toggled off
                  return;
                }
                setMode(values as Mode[]);
              }}
            >
              <ToggleGroupItem value="code">
                <FileCode2 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="preview">
                <FileText className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
}
