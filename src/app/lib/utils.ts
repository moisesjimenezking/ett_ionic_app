import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export class UtilsLib {

    cn(...inputs: ClassValue[]): string {
        return twMerge(clsx(inputs))
    }
}