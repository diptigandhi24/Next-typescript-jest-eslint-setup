import MemoizeSplashImage from "./image";
import { DisplayStyleContext } from "../context/displayContext";
import { useContext } from "react";
import { Photo } from "../types";

type GalleryProps = {
  imageList: Array<Photo>;
};

const ImageGallery = ({ imageList }: GalleryProps) => {
  const displayStyle = useContext(DisplayStyleContext);

  return (
    <div className={`display-${displayStyle}`}>
      {imageList.map((photo) => (
        <MemoizeSplashImage key={photo.id} url={photo.urls.regular} />
      ))}
    </div>
  );
};

export default ImageGallery;
