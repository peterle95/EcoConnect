import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const organizations = [
  {
    name: "Green Earth Initiative",
    description: "Dedicated to reforestation and protecting biodiversity worldwide.",
    image: "https://placehold.co/600x400",
    hint: "forest trees",
    tags: ["Reforestation", "Conservation"],
  },
  {
    name: "Ocean Cleanup Crew",
    description: "Organizing beach cleanups and developing tech to clean ocean plastics.",
    image: "https://placehold.co/600x400",
    hint: "ocean beach",
    tags: ["Oceans", "Plastic-Free"],
  },
  {
    name: "Urban Gardeners",
    description: "Transforming urban spaces into community gardens.",
    image: "https://placehold.co/600x400",
    hint: "city garden",
    tags: ["Community", "Gardening"],
  },
  {
    name: "Recycle Right",
    description: "Educating communities on proper recycling techniques.",
    image: "https://placehold.co/600x400",
    hint: "recycling bins",
    tags: ["Recycling", "Education"],
  },
  {
    name: "Sustainable Futures",
    description: "Advocating for renewable energy and sustainable policies.",
    image: "https://placehold.co/600x400",
    hint: "wind turbines",
    tags: ["Advocacy", "Renewable Energy"],
  },
  {
    name: "Water Watchers",
    description: "Protecting local watersheds and promoting water conservation.",
    image: "https://placehold.co/600x400",
    hint: "river stream",
    tags: ["Water", "Conservation"],
  },
];

export default function DirectoryPage() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Eco-Organization Directory</h1>
        <p className="text-muted-foreground">
          Find and connect with organizations making a difference.
        </p>
      </div>
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search organizations..."
          className="w-full pl-8 sm:w-[300px]"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <Card key={org.name} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={org.image}
                alt={org.name}
                width={600}
                height={400}
                data-ai-hint={org.hint}
                className="rounded-t-lg object-cover aspect-[3/2]"
              />
            </CardHeader>
            <div className="flex flex-col flex-1 p-6">
                <CardTitle className="font-headline text-xl">{org.name}</CardTitle>
                <CardDescription className="mt-2 flex-1">{org.description}</CardDescription>
                <CardFooter className="p-0 pt-4">
                <div className="flex gap-2">
                    {org.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                    ))}
                </div>
                </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
