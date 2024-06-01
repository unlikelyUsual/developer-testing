import { Skeleton } from "@radix-ui/themes";
import {
  CSSProperties,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

/* eslint-disable @next/next/no-img-element */
export const Image = (
  props: Pick<
    ImgHTMLAttributes<unknown>,
    "src" | "alt" | "className" | "style"
  > &
    Pick<CSSProperties, "width" | "height" | "maxHeight">
) => {
  const ref = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imgRef = ref.current;
    imgRef?.addEventListener("load", () => {
      setIsLoaded(true);
    });

    return () => {
      imgRef?.removeEventListener("load", () => {});
    };
  }, []);

  const style: CSSProperties = {
    ...props.style,
    display: isLoaded ? "initial" : "none",
  };

  return (
    <>
      <img ref={ref} alt={props.alt ?? "Image"} {...props} />

      {!isLoaded && (
        <Skeleton
          width={props.width as string}
          height={props.height as string}
          maxHeight={props.maxHeight as string}
        />
      )}
    </>
  );
};
