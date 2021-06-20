import MemoizeSplashImage from "./image";
import { DisplayStyleContext } from "../context/displayContext";
import { useContext, useState } from "react";
import { Photo } from "../types";
import Modal from '../modal/modal';

type GalleryProps = {
  imageList: Array<Photo>;
};

const ImageGallery = ({ imageList }: GalleryProps) => {
  const displayStyle = useContext(DisplayStyleContext);
  const [displayModal, setDisplayModal] = useState(false);
  const [modalContent, updateModalContent] = useState<Photo>();


  return (
    <>
      <div className={`display-${displayStyle}`}>
        {
          imageList.map((photo) => (

            <MemoizeSplashImage key={photo.id} url={photo.urls.small} onClick={() => {

              setDisplayModal(true);
              updateModalContent(photo);

            }} />


          ))
        }
        <Modal showContent={displayModal} photoInfo={modalContent} closeModal={() => setDisplayModal(false)} />
      </div>

    </>
  );
};

export default ImageGallery;
