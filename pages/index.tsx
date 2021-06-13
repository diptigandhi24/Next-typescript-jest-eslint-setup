import type { AppProps } from "next/app";
import DisplayContext from "../components/context/displayContext";
import ImageGallery from "../components/ui/imageGallery";
import { Photo } from "../components/types";
import fetch from "node-fetch";
import { InferGetStaticPropsType } from "next";
import { useState, useEffect } from "react";
import Error from "./_error";

function Home({
  data,
  errorCode,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [imagesList, updateImageList] = useState(data);
  const [pageNumber, updatePageNumber] = useState(1);
  const [isLoading, updateLoadingState] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    console.log("Render only one time");
  }, []);

  useEffect(() => {
    console.log("Renders on page load and change in page number", pageNumber);
    async function requestNewPage() {
      if (pageNumber !== 1) {
        const result = await fetch(
          `https://api.unsplash.com/photos/?client_id=A_AsNdQXRGRpWUJw4ElDyye9jhoFvlLNC6N6vBFF0Vs&page=${pageNumber}`
        );
        const data: Array<Photo> = await result.json();
        updateImageList((prevState) => prevState.concat(data));
        updateLoadingState((prevstate) => !prevstate);
      }
    }
    requestNewPage();
  }, [pageNumber]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // you're at the bottom of the page
      setTimeout(() => {
        updatePageNumber((prevState) => (prevState = prevState + 1));
        updateLoadingState((prevstate) => !prevstate);
      }, 2000);
    }
  };

  if (errorCode) {
    return <Error statusCode={400} />;
  } else {
    return (
      <div className="homeWrapper">
        <DisplayContext>
          <ImageGallery imageList={imagesList} />
        </DisplayContext>
        {isLoading && <div>Loading ...</div>}
      </div>
    );
  }
}

export const getStaticProps = async () => {
  const result = await fetch(
    "https://api.unsplash.com/photos/?client_id=A_AsNdQXRGRpWUJw4ElDyye9jhoFvlLNC6N6vBFF0Vs&page=1"
  );

  let errorCode = !result.ok; //if true than errorcode id false else true

  const data: Array<Photo> = await result.json();
  console.log("Errorcode", errorCode);
  return {
    props: { data, errorCode },
  };
};
export default Home;
