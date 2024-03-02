"user client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useLocalStorage } from "usehooks-ts";
import { PencilRuler } from "lucide-react";

export function UserItem() {
  const { user } = useUser();
  const [hidden, setHidden] = useLocalStorage<boolean>("toolbar", false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="button"
          className="hover:bg-primary/5 flex w-full items-center p-3 text-sm"
        >
          <div className="flex max-w-[150px] items-center gap-x-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="line-clamp-1 text-start font-medium">
              {user?.fullName}&apos;s Notion
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-96 space-y-2">
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-muted-foreground text-sm font-medium leading-none">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="bg-secondary rounded-md p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">
                {user?.fullName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <Label>Appearance</Label>
            <span className="text-muted-foreground text-[0.8rem]">
              Customize how Notion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <Label>Formatting Toolbar</Label>
            <span className="text-muted-foreground text-[0.8rem]">
              Hide or show the formatting toolbar
            </span>
          </div>
          <Toggle
            variant="outline"
            pressed={!hidden}
            onPressedChange={(value) => setHidden(!value)}
          >
            <PencilRuler className="h-4 w-4" />
          </Toggle>
        </div>
        <Separator />
        <Button
          className="text-muted-foreground w-full cursor-pointer"
          asChild
          variant="outline"
        >
          <SignOutButton>Sign out</SignOutButton>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
