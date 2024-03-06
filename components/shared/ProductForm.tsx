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
import { CustomField } from "./CustomField";

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-5 w-full">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Product title"
          render={({ field }) => (
            <Input placeholder="Product title" {...field} className="input-field " />
          )}
        />
        <CustomField
          control={form.control}
          name="categoryId"
          formLabel="Category"
          render={({ field }) => (
            <Dropdown onChangeHandler={field.onChange} value={field.value} className="w-full" />
          )}
        />
      </div>
  
      <div className="flex flex-col gap-5">
        <CustomField
          control={form.control}
          name="description"
          formLabel="Product description"
          render={({ field }) => (
            <Textarea placeholder="Product description" {...field} className="textarea " />
          )}
        />
        <CustomField
          control={form.control}
          name="image"
          formLabel="Image"
          render={({ field }) => (
            <FileUploader onFieldChange={field.onChange} setFiles={setFiles} imageUrl={field.value} className="w-full" />
          )}
        />
      </div>
  
      <div className="flex flex-col gap-5">
        <CustomField
          control={form.control}
          name="price"
          formLabel="Price"
          render={({ field }) => (
            <Input
              id="price"
              type="number"
              className="input-field w-full"
              placeholder="Price"
              {...field}
            />
          )}
        />
        <CustomField
          control={form.control}
          name="discount"
          formLabel="Discount (%) optional"
          render={({ field }) => (
            <Input
              id="discount"
              type="text"
              className="input-field w-full"
              placeholder="Discount"
              inputMode="numeric"
              pattern="[0-9]*"
              {...field}
            />
          )}
        />
      </div>
  
      <Button
        type="submit"
        className="rounded-full p-bold-24 tracking-[1px] w-full h-[54px]"
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
