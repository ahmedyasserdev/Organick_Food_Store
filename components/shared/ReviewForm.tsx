"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { reviewFormSchema } from "@/lib/validator";
import { ReviewFormProps } from "@/types";
import { createNewReview } from "@/lib/actions/review.actions";
import toast from "react-hot-toast";

const ReviewForm = ({ productId, userId }: ReviewFormProps) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      reviewText: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof reviewFormSchema>) {
    try {
      await createNewReview({ text: values.reviewText, userId, productId });
      form.reset()
     //@ts-ignore
      toast.promise(createNewReview,{
        loading : 'adding your review',
        success : "Your Review has been added successfully",
        error : "something went wrong try again"
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="input-field"
                    placeholder="Review"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className = "w-full h-[50px] rounded-2xl "   type="submit">Add Review</Button>
        </form>
      </Form>
    </>
  );
};

export default ReviewForm;
