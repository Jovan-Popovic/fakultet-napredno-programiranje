import { forwardRef, type ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef<HTMLImageElement, Props>(
  ({ src, alt, className, ...props }, ref) => {
    return <img src={src} alt={alt} className={className} ref={ref} {...props} />;
  }
);

Image.displayName = "Image";
