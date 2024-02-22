import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
        MDX is loading...
        <Skeleton />
    </div>
  )
}
