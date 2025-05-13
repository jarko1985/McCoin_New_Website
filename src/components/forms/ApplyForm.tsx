"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams } from "next/navigation";

const applySchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number"),
  visaStatus: z.string().min(1, "Visa status is required"),
  salaryExpectations: z.string().min(1, "Salary expectations are required"),
  availability: z.string().min(1, "Availability is required"),
  resume: z
    .any()
    .refine((file) => file?.[0], "Resume is required")
    .refine((file) => file?.[0]?.type === "application/pdf", "Only PDF allowed")
    .refine((file) => file?.[0]?.size <= 5 * 1024 * 1024, "Max 5MB allowed"),
});

type FormValues = z.infer<typeof applySchema>;

const ApplyForm = () => {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      visaStatus: "",
      salaryExpectations: "",
      availability: "",
      resume: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "resume" && value instanceof FileList) {
        formData.append("resume", value[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await fetch(`/${locale}/api/apply`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Application submitted successfully!");
        form.reset();
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (err) {
      toast.error("Submission error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 bg-[#07153b] p-8 rounded-xl shadow-md text-white"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter full name"
                    {...field}
                    className="placeholder:text-[#DAE6EA]"
                  />
                </FormControl>
                <FormMessage className="text-[#EC3B3B]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    {...field}
                    className="placeholder:text-[#DAE6EA]"
                  />
                </FormControl>
                <FormMessage className="text-[#EC3B3B]" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
                    {...field}
                    className="placeholder:text-[#DAE6EA]"
                  />
                </FormControl>
                <FormMessage className="text-[#EC3B3B]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visaStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Status</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Visit, Employment"
                    {...field}
                    className="placeholder:text-[#DAE6EA]"
                  />
                </FormControl>
                <FormMessage className="text-[#EC3B3B]" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="salaryExpectations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Expectations</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 10,000 AED"
                    {...field}
                    className="placeholder:text-[#DAE6EA]"
                  />
                </FormControl>
                <FormMessage className="text-[#EC3B3B]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="date"
                      {...field}
                      className="text-[#DAE6EA] [&::-webkit-calendar-picker-indicator]:invert"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[#EC3B3B]" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="resume"
          render={({ field: { onChange, ref } }) => (
            <FormItem>
              <FormLabel>Attach Resume (PDF, max 5MB)</FormLabel>
              <FormControl>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => onChange(e.target.files)}
                  ref={ref}
                  className="bg-white text-black p-2 rounded-md file:text-[#EC3B3B] file:border-none"
                />
              </FormControl>
              <FormMessage className="text-[#EC3B3B]" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ApplyForm;
