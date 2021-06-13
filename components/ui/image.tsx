import React from "react";

interface ImageProps {
  url: string;
  onClick?: () => void;
}
const SplashImage = ({ url, onClick }: ImageProps) => {
  return (
    <div onClick={onClick}>
      <img src={url} alt="randomImage" className="img-Wrapper" />
    </div>
  );
};

const MemoizeSplashImage = React.memo(SplashImage);
export default MemoizeSplashImage;
