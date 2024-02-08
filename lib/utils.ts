import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

// created by chatgpt
function calculateFinalPrice(price : string, discount : string ) {
  // Parse the price and discount strings into numbers
  const priceValue = parseFloat(price);
  const discountValue = parseFloat(discount);

  // Check if the parsed values are valid numbers
  if (isNaN(priceValue) || isNaN(discountValue)) {
      throw new Error('Invalid price or discount value.');
  }

  // Check if the discount is valid (between 0 and 100)
  if (discountValue < 0 || discountValue > 100) {
      throw new Error('Discount percentage must be between 0 and 100.');
  }

  // Calculate the discount amount
  const discountAmount = (priceValue * discountValue) / 100;

  // Calculate the final price after applying the discount
  const finalPrice = priceValue - discountAmount;

  // Round the final price to two decimal places (optional)
  return Math.round(finalPrice * 100) / 100;
}


export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}