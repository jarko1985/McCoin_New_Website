"use client";
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
import { useTranslations } from 'next-intl';
import { applyFormSchema, type ApplyFormData } from '@/lib/schemas';

type FormValues = ApplyFormData;

const ApplyForm = () => {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const t = useTranslations('Careers.ApplyForm');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(applyFormSchema),
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
        toast.success(t('messages.success'));
        form.reset();
      } else {
        toast.error(t('messages.failed'));
      }
    } catch (err) {
      toast.error(t('messages.error'));
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
                <FormLabel>{t('fields.fullName')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('placeholders.fullName')}
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
                <FormLabel>{t('fields.email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('placeholders.email')}
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
                <FormLabel>{t('fields.phone')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('placeholders.phone')}
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
                <FormLabel>{t('fields.visaStatus')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('placeholders.visaStatus')}
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
                <FormLabel>{t('fields.salaryExpectations')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('placeholders.salaryExpectations')}
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
                <FormLabel>{t('fields.availability')}</FormLabel>
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
              <FormLabel>{t('fields.resume')}</FormLabel>
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
              {t('buttons.submitting')}
            </>
          ) : (
            t('buttons.submit')
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ApplyForm;
