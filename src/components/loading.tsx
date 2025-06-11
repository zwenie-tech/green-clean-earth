import { Loader2 } from "lucide-react"


export default function Loading() {
  return (
    <div className="w-full py-8 flex flex-col gap-3 items-center justify-center">
      <Loader2 className="animate-spin"/>
      Loading...
    </div>
  )
}
