"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createNewReview,
  deleteProductReview,
  updateReview,
} from "@/lib/actions/review.actions";
import toast from "react-hot-toast";
import { formatCreatedAt } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ReviewFormProps, reviewType } from "@/types";
import { reviewFormSchema } from "@/lib/validator";

const ReviewForm = ({ productId, userId, reviews }: ReviewFormProps) => {
  const [type, setType] = useState<"Create" | "Update">("Create");
  const [editingReview, setEditingReview] = useState<{
    id: string;
    text: string;
  } | null>(null);

  const pathname = usePathname();
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      reviewText: "",
    },
  });

  const handleEditClick = (reviewId: string, reviewText: string) => {
    setType("Update");
    setEditingReview({ id: reviewId, text: reviewText });
    form.setValue("reviewText", reviewText); 
  };

  const onSubmit = async (values: z.infer<typeof reviewFormSchema>) => {
    try {
      if (type === "Create") {
        await createNewReview({
          text: values.reviewText,
          userId,
          productId,
          path: pathname,
        });
        form.reset();

        //@ts-ignore

        toast.promise(createNewReview, {
          loading: "Adding your review",
          success: "Your review has been added successfully",
          error: "Something went wrong. Please try again.",
        });
      } else if (type === "Update" && editingReview) {
        // Implement update logic here
     await updateReview({ reviewId :  editingReview.id, reviewText : values.reviewText , path : pathname});
       
     
     setType("Create");
     form.reset();

        setEditingReview(null);
       //@ts-ignore
        toast.promise(updateReview, {
          loading: "Updating your review",
          success: "Your review has been updated successfully",
          error: "Something went wrong. Please try again.",
        });
     
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await deleteProductReview({ reviewId, path: pathname, productId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="input-field my-4"
                    placeholder="Review"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full h-[50px] rounded-2xl p-bold-18 md:p-bold-24"
            type="submit"
          >
            {type === "Create" ? "Add Review" : "Update Review"}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col gap-3">
        {reviews?.map((review: reviewType) => (
          <div
            className="bg-light rounded-xl shadow-lg  flex flex-col gap-2 p-4"
            key={review._id}
          >
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={review.creator.photo} />
                <AvatarFallback>
                  {review.creator.firstName} {review.creator.lastName}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-primary p-bold-16 md:p-bold-20">
                  {review.creator.firstName} {review.creator.lastName}
                </p>
              </div>
              <div>
                <p className="p-regula-14 text-primary">
                  {" "}
                  | {formatCreatedAt(review.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex-between flex-wrap">
              <p className="p-medium-18 text-primary">{review.text}</p>
              {review.creator._id.toString() === userId && (
                <div className="flex flex-col gap-3 rounded-xl bg-light p-3 shadow-md transition-all">
                  <Image
                    src="/edit.svg"
                    onClick={() => handleEditClick(review._id, review.text)}
                    className="cursor-pointer object-contain"
                    alt="edit"
                    width={20}
                    height={20}
                  />
                  <Image
                    onClick={() => deleteReview(review._id)}
                    src="/delete.svg"
                    className="cursor-pointer object-contain"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewForm;
