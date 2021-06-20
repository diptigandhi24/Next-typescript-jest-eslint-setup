import type { AppProps } from "next/app";
import DisplayContext from "../components/context/displayContext";
import ImageGallery from "../components/ui/imageGallery";
import { Photo } from "../components/types";
import fetch from "node-fetch";
import { InferGetStaticPropsType } from "next";
import { useState, useEffect, useCallback } from "react";
import Error from "./_error";



function Home({
  data,
  errorCode,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  console.log("data or error recieved from the server", data, errorCode);
  const [imagesList, updateImageList] = useState(data);
  const [pageNumber, updatePageNumber] = useState(1);
  const [isLoading, updateLoadingState] = useState(false);
  const [isError, setIsError] = useState(false);

  //function that creates an observer
  //as these page is going to rerender we don't this function to create itself everytime
  //so we are going to use UseCallback
  const createObserver = useCallback(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.0
    };

    let observer = new IntersectionObserver((entries) => {
      console.log("Initiate the observer");
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          if (isLoading === false && isError === false) {
            updateLoadingState(true)
            updatePageNumber((prev) => prev = prev + 1)
          }
          else {
            observer.disconnect()
          }
          console.log("you have reached the bottom of the page")
        }
      });

    }, options);

    let element = document.getElementById("loadMore")
    console.log("created the obsever process begins", observer, element)

    if (element !== null) {
      observer.observe(element)
      console.log("observer created");
    }
  }, [])
  //create an observer when the page is loaded
  useEffect(() => {
    createObserver();
  }, [])

  useEffect(() => {
    // console.log("Renders on page load and change in page number", pageNumber);
    async function requestNewPage() {
      if (pageNumber !== 1) {
        try {
          const result = await fetch(
            `https://api.unsplash.com/photos/?client_id=A_AsNdQXRGRpWUJw4ElDyye9jhoFvlLNC6N6vBFF0Vs&page=${pageNumber}`
          );
          const data: Array<Photo> = await result.json();
          updateImageList((prevState) => prevState.concat(data));

        } catch {
          setIsError(true)
        }
        updateLoadingState(false);
      }
    }
    requestNewPage();
  }, [pageNumber]);

  if (errorCode) {
    return <Error statusCode={400} />;
  } else {
    return (
      <div className="homeWrapper">
        <DisplayContext>
          <ImageGallery imageList={imagesList} />
        </DisplayContext>
        {isLoading && <div style={{ width: "100%", height: "100px", textAlign: "center", paddingTop: "20%" }}> Loading more images</div>}
        {isError && <div> Error in loading more images</div>}
      </div>
    );
  }
}

export const getStaticProps = async () => {
  console.log("Trying to get info")
  let data = {}
  let errorCode = ""

  await fetch(
    "https://api.unsplash.com/photos/?client_id=A_AsNdQXRGRpWUJw4ElDyye9jhoFvlLNC6N6vBFF0Vs&page=1"
  ).then(res => res.json())
    .then(resData => { data = resData })
    .catch((error) => { errorCode = `${error}` })

  console.log("Reached here", data, errorCode)
  // let errorCode = !result.ok; //if true than errorcode id false else true

  // const data: Array<Photo> = await result.json();
  console.log("Errorcode", errorCode);
  return {
    props: { data, errorCode },
  };

};
export default Home;
