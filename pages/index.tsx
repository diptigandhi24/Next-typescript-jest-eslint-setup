import type { AppProps } from "next/app";
import DisplayContext from "../components/context/displayContext";
import ImageGallery from "../components/ui/imageGallery";
import { Photo } from "../components/types";
import fetch from "node-fetch";
import { InferGetStaticPropsType } from "next";
import { useEffect, useCallback } from "react";
import Error from "./_error";
import UseInfiniteScroll from '../hooks/useInfiniteScroll'
import { TransitionState, endOfPage } from '../hooks/reducerActionType'

function Home({
  data,
  errorCode,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  let initialPhotos: Array<Photo> = data

  let [state, dispatch] = UseInfiniteScroll(initialPhotos)

  // Set up the intersection observer
  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.0
    };

    let observer = new IntersectionObserver((entries) => {
      console.log("Initialize the observer");
      entries.forEach(en => {
        if (en.intersectionRatio > 0) {
          dispatch(endOfPage())
        }
      });

    }, options);

    let loadMoreElement = document.getElementById("endOfScroll")
    console.log("created the obsever process begins", observer, loadMoreElement)

    if (loadMoreElement !== null) {
      observer.observe(loadMoreElement)
      console.log("observer created");
    }
  }, [])

  if (errorCode) {
    return <Error statusCode={400} />;
  } else {
    return (
      <div className="homeWrapper">
        <DisplayContext>
          <ImageGallery imageList={state.galleryData} />
        </DisplayContext>
        <div id="endOfScroll" style={{ border: "1px solid red" }} />
        {state.transitionState === TransitionState.LOADING && <div style={{ width: "100%", height: "100px", textAlign: "center", paddingTop: "20px" }}> Loading more images...</div>}
        {state.transitionState === TransitionState.ERROR && <div> Error in loading more images</div>}
      </div>
    );
  }
}

export const getStaticProps = async () => {
  console.log("Trying to get info")
  let data: Array<Photo> = []
  let errorCode = ""

  await fetch(
    "https://api.unsplash.com/photos/?client_id=A_AsNdQXRGRpWUJw4ElDyye9jhoFvlLNC6N6vBFF0Vs&page=1"
  ).then(res => res.json())
    .then(resData => { data = resData })
    .catch((error) => { errorCode = `${error}` })

  return {
    props: { data, errorCode },
  };

};
export default Home;
