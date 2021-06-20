import React from "react";
import Image from 'next/image'

interface ImageProps {
  url: string;
  onClick?: () => void;
}
const SplashImage = ({ url, onClick }: ImageProps) => {
  return (
    <div onClick={onClick} style={{ position: "inherit" }}>
      <Image src={url} alt="randomImage" width={"300px"} height={"300px"} objectFit='cover' />
    </div>
  );
};

const MemoizeSplashImage = React.memo(SplashImage);
export default MemoizeSplashImage;
