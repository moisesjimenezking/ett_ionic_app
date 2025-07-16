import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { bgBiografyAsset, icPersonAsset } from "./constanst/assets";

export class UtilsLib {

    cn(...inputs: ClassValue[]): string {
        return twMerge(clsx(inputs))
    }

    async convertPDFBase64ToFile(b64: string, filename: string) {
        return await fetch(b64)
            .then(async (res) => {
                const blob = await res.blob();
                return new File([blob], filename, { type: 'application/pdf' });
            })
    }

    async convertBase64ToImage(b64: string, filename: string) {
        return await fetch(b64)
            .then(async (res) => {
                const blob = await res.blob();
                return new File([blob], filename, { type: 'image/jpeg' });
            })
    }

    isBase64(value: string): boolean {
        if (value.length == 0) return false;
        const base64Regex = /^(?:data:([a-zA-Z0-9]+\/[a-zA-Z0-9\-.+]+);base64,)?([A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
        return base64Regex.test(value);
    }

    isALink(value: string): boolean {
        const r = /\b((https?:\/\/)?(www\.)?[\w\-]+(\.[a-zA-Z]{2,})(\/\S*)?)\b/;
        return r.test(value);
    }


    stablishUrlPic(url: string | null, biografy = false) {

        if (url == null || url == 'null' || url?.length == 0) {
            return biografy ? bgBiografyAsset : icPersonAsset;
        }


        return `${localStorage.getItem('rute')}/img/${url}`;

    }
}