import { Loader2 } from "lucide-react"


export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col gap-3 items-center justify-center">
      <Loader2 className="animate-spin"/>
      Loading...
    </div>
  )
}
