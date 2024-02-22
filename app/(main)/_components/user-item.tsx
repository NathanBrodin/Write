"user client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function UserItem() {
  const { user } = useUser();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}&apos;s Notion
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-96 space-y-2">
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-sm font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Notion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
        <Separator />
        <Button className="w-full cursor-pointer text-muted-foreground" asChild variant="outline">
          <SignOutButton>Sign out</SignOutButton>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
