import { useMutation } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

// Extracted from shared types
type InsertWaitlist = z.infer<typeof api.waitlist.join.input>;
type InsertContact = z.infer<typeof api.contact.submit.input>;

export function useJoinWaitlist() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertWaitlist) => {
      const validated = api.waitlist.join.input.parse(data);
      const res = await fetch(api.waitlist.join.path, {
        method: api.waitlist.join.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.waitlist.join.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to join waitlist");
      }
      return api.waitlist.join.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when CarbonIQ is ready for early access.",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

export function useSubmitContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit message");
      }
      return api.contact.submit.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thanks for reaching out! We'll get back to you shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
