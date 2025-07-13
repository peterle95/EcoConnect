import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EcoMap } from "@/components/eco-map"

export default function MapPage() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Interactive Eco-Map</CardTitle>
          <CardDescription>
            Discover eco-friendly events, organizations, and businesses near you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[60vh] rounded-lg overflow-hidden border">
            <EcoMap />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
