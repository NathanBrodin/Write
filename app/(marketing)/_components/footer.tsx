import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-background z-50 flex w-full items-center p-6 dark:bg-[#1F1F1F]">
      <div className="text-muted-foreground flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <Button variant="ghost" size="sm" asChild>
          <Link href="https://github.com/NathanBrodin/Write">
            Source code (Github)
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
        </Button>
      </div>
    </div>
  );
}
