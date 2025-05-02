import { useEffect, useState, useRef } from "react";
import { Blurhash } from "react-blurhash";

const ImageLoader = (
  { imageUrl, blurhash, width, height, alt }
    : { imageUrl: string, blurhash: string, width: number | string, height: number | string, alt?: string }
) => {
  const [loading, setLoading] = useState(true);
  const ref: any = useRef();

  useEffect(() => {
    const image = new Image();

    image.onload = () => {
      setLoading(false);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  return (
    <div ref={ref}>
      {
        loading ?
          (
            <Blurhash
              hash={blurhash}
              width={1000}
              height={1000}
              resolutionX={5}
              resolutionY={5}
              punch={1}
            />
          ) : (
            <img
              src={imageUrl}
              width={width}
              height={height}
              alt={alt}
            />
          )
      }
    </div>
  );
}

export default ImageLoader;