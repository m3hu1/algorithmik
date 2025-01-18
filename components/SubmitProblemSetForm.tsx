"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  leetcodeLink: z.string().url("Please enter a valid URL"),
  alternateFormat: z.string().optional(),
});

export default function SubmitProblemSetForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      leetcodeLink: "",
      alternateFormat: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      console.log("Form submitted successfully");
      toast({
        title: "Success!",
        description: "Your problem set has been submitted successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit problem set. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This will be displayed as &quot;{field.value}&apos;s Problem
                  Set&quot;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your problem set..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Explain the focus and difficulty level of your problem set or
                  any other relevant information
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leetcodeLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LeetCode Problem List URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://leetcode.com/list/..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Must be a public LeetCode problem list
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alternateFormat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alternative Format (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Google Docs, Codeforces, etc."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  If not using LeetCode, provide an alternative link
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Problem Set"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
