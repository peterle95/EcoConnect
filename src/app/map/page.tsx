import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
            <Image
                src="https://placehold.co/1200x800"
                alt="Map of eco-friendly locations"
                layout="fill"
                objectFit="cover"
                data-ai-hint="city map"
            />
            <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                <p className="text-2xl font-bold text-background-foreground bg-background/80 p-4 rounded-lg">Map Coming Soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
