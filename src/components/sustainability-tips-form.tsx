'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateSustainabilityTipsAction } from '@/app/actions';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import type { SustainabilityTipsOutput } from '@/ai/flows/generate-sustainability-tips';
import { Lightbulb } from 'lucide-react';

const formSchema = z.object({
  habits: z.string().min(20, {
    message: "Please describe your habits in at least 20 characters.",
  }).max(500, {
    message: "Please keep your description under 500 characters."
  }),
});

export function SustainabilityTipsForm() {
  const [result, setResult] = useState<SustainabilityTipsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habits: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);

    const res = await generateSustainabilityTipsAction(values);

    if (res.failure) {
      toast({
        variant: "destructive",
        title: "Error Generating Tips",
        description: typeof res.failure === 'string' ? res.failure : "An unexpected error occurred.",
      });
    } else if (res.success) {
      setResult(res.success);
    }
    
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Lightbulb />
            AI Sustainability Tips
        </CardTitle>
        <CardDescription>
          Tell us about your daily habits, and we&apos;ll give you personalized tips to reduce your impact.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="habits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Habits</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., I drive to work alone, often forget to turn off lights, and use disposable coffee cups..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Generating...' : 'Get My Tips'}
            </Button>
          </form>
        </Form>
      </CardContent>
      {(isLoading || result) && (
        <CardFooter>
            {isLoading && (
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {result && (
              <div className="prose prose-sm text-sm text-foreground">
                <p>{result.tips}</p>
              </div>
            )}
        </CardFooter>
      )}
    </Card>
  );
}
