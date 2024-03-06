import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { templates, Template } from "@/templates/templates";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  onChange: (value: string) => void;
}

export default function TemplateSelector({ onChange }: TemplateSelectorProps) {
  const [selected, setSelected] = useState<Template>(templates[0]);
  function handleSelect(index: number) {
    setSelected(templates[index]);
    onChange(templates[index].content);
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {templates.map((template, index) => (
          <CarouselItem key={index} className="basis-1/2" role="button">
            <div className="p-1">
              <Card
                className={cn(
                  "flex aspect-square flex-col justify-between",
                  selected === template
                    ? "bg-accent text-accent-foreground"
                    : "",
                )}
                onClick={() => handleSelect(index)}
              >
                <CardHeader>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="m-2 flex-1 overflow-y-scroll whitespace-pre-line rounded-md border p-2">
                  {template.content}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
