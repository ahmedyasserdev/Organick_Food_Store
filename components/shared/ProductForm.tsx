"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductFormProps } from "@/types";
import { prodcutFormSchema } from "@/lib/validator";
import { ProductDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";
import { createNewProduct, updateProduct } from "@/lib/actions/product.actions";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ProductForm({ type, product, userId , productId }: ProductFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");
  const initialsValues =
    type === "Update" && product ? product : ProductDefaultValues;
  const form = useForm<z.infer<typeof prodcutFormSchema>>({
    resolver: zodResolver(prodcutFormSchema),
    defaultValues: initialsValues,
  });


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof prodcutFormSchema>) {
    let uploadedImageUrl = values.image;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      try {
        const newProduct = await createNewProduct({
          product: { ...values, image: uploadedImageUrl },
          userId,
        });
        if (newProduct) {
          toast.success("Product Created Successfully")
          form.reset();
          router.push(`/product/${newProduct._id}`);

        }
      } catch (error) {
        toast.error("Something Went Wrong")

        console.log(error);
      }
    }

    if (type === "Update") {
      if (!product?._id) {
        router.back();
        return;
      }

      try {

        const updatedProduct = await updateProduct({
          userId,
          product: { ...values  , image: uploadedImageUrl },
          productId ,
          path : `/product/${productId}`
        });


        if (updatedProduct) {
          toast.success("Product Updated Successfully")

          form.reset();
          router.push(`/product/${updatedProduct._id}`);
        }
      } catch (error) {
        toast.error("Something Went Wrong")

        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Product title"
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    className="textarea"
                    placeholder="Product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    setFiles={setFiles}
                    imageUrl={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <label htmlFor="price" className="input-label">
                  Price
                </label>
                <FormControl className="h-72">
                  <Input
                    id="price"
                    type="number"
                    className="input-field"
                    placeholder="Price"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="w-full">
                <label htmlFor="discount" className="input-label">
                  Discount (%) optional{" "}
                </label>
                <FormControl>
                  <Input
                    id="discount"
                    type="text"
                    className="input-field"
                    placeholder="Discount"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="rounded-full   p-bold-24 tracking-[1px]  w-full h-[54px]"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? type === "Create"
              ? "Creating..."
              : "Updating..."
            : `${type} Product `}
        </Button>
      </form>
    </Form>
  );
}

export default ProductForm;
