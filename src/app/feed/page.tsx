import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageSquare, Share2, Send } from "lucide-react";

const feedItems = [
  {
    id: 1,
    name: "Alice Green",
    avatar: "https://placehold.co/40x40",
    handle: "alicegreen",
    time: "2h ago",
    content: "Just finished planting a small herb garden on my balcony! It feels so good to grow my own food. 🌿 #UrbanGardening #Sustainability",
    image: "https://placehold.co/600x400",
    imageHint: "balcony garden",
    likes: 28,
    comments: 5,
  },
  {
    id: 2,
    name: "Bob Rivers",
    avatar: "https://placehold.co/40x40",
    handle: "bobrivers",
    time: "5h ago",
    content: "Participated in a local beach cleanup today. We collected over 50kg of trash! A small step, but it makes a huge difference. Let's protect our oceans. 🌊 #BeachCleanup #EcoWarrior",
    likes: 152,
    comments: 12,
  },
  {
    id: 3,
    name: "Charlie Bloom",
    avatar: "https://placehold.co/40x40",
    handle: "charliebloom",
    time: "1d ago",
    content: "Switched to using a reusable coffee cup and saved 5 disposable cups this week! It's the small changes that add up. What's one small eco-change you've made recently?",
    likes: 98,
    comments: 23,
  },
];

export default function FeedPage() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Community Feed</h1>
          <p className="text-muted-foreground">
            Share your eco-journey and get inspired by others.
          </p>
        </div>

        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="What's your eco-update?" className="resize-none" />
                    </div>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <Button>
                    <Send className="mr-2 h-4 w-4"/>
                    Post
                </Button>
            </CardFooter>
        </Card>

        <div className="space-y-6">
          {feedItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">@{item.handle}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{item.content}</p>
                {item.image && (
                  <div className="mt-4 rounded-lg overflow-hidden border">
                    <Image
                      src={item.image}
                      alt="Post image"
                      width={600}
                      height={400}
                      data-ai-hint={item.imageHint}
                      className="object-cover w-full aspect-[3/2]"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4" /> {item.likes} Likes
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> {item.comments} Comments
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
