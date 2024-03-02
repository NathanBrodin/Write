import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  Strikethrough,
  Table,
  Link,
  LucideIcon,
  ImageIcon,
} from "lucide-react";
import { Button } from "./ui/button";

export default function FormattingToolbar({
  insertText,
}: {
  insertText: (text: string) => void;
}) {
  type Option = {
    name: string;
    icon: LucideIcon;
    syntax: string;
  };

  const options: Option[] = [
    { name: "Bold", icon: Bold, syntax: "**Bold**" },
    { name: "Italic", icon: Italic, syntax: "*Italic*" },
    { name: "Strikethrough", icon: Strikethrough, syntax: "~Strikethrough~" },
    { name: "Heading1", icon: Heading1, syntax: "# " },
    { name: "Heading2", icon: Heading2, syntax: "## " },
    { name: "Heading3", icon: Heading3, syntax: "### " },
    { name: "List", icon: List, syntax: "- " },
    { name: "Ordered List", icon: ListOrdered, syntax: "1. " },
    { name: "Checked List", icon: ListChecks, syntax: "- [ ] " },
    { name: "Link", icon: Link, syntax: "[text](url)" },
    { name: "Image", icon: ImageIcon, syntax: "![alt](url)" },
    { name: "Code", icon: Code2, syntax: "```language\n\n```" },
    {
      name: "Table",
      icon: Table,
      syntax:
        "| Header | Title |\n| ----------- | ----------- |\n| Paragraph | Text |",
    },
  ];

  return (
    <ul className="flex gap-x-1">
      {options.map((option, index) => (
        <li key={index}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => insertText(option.syntax)}
          >
            <option.icon className="h-4 w-4" />
          </Button>
        </li>
      ))}
    </ul>
  );
}
