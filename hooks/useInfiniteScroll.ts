import React, { useReducer, useEffect } from 'react'
import { Photo } from '../components/types'
import { updateGallery, setError, updatePageNumber, LoadImagesAction, TransitionState, endOfPage } from './reducerActionType'

type GalleryState = {
    transitionState: TransitionState
    currentPage: number,
    galleryData: Array<Photo>,
    makeApiCall: number
}

type Action = ReturnType<
    typeof updateGallery | typeof setError | typeof updatePageNumber | typeof endOfPage
>

function reducer(state: GalleryState, action: Action): GalleryState {
    switch (action.type) {
        case "ADD_NEXT_PAGE":
            return { ...state, currentPage: state.currentPage + 1 }

        case "ERROR":
            return { ...state, transitionState: TransitionState.ERROR }

        case "ADD_IMAGES":
            return {
                ...state,
                galleryData: state.galleryData.concat(action.payload.photos),
                transitionState: TransitionState.DONE
            }

        case "END_OF_PAGE":

            if (state.transitionState === TransitionState.ERROR) {
                return {
                    ...state,
                    transitionState: TransitionState.LOADING,
                    makeApiCall: state.makeApiCall + 1
                }
            }
            else if (state.transitionState === TransitionState.DONE) {
                return {
                    ...state,
                    transitionState: TransitionState.LOADING,
                    makeApiCall: state.makeApiCall + 1,
                    currentPage: state.currentPage + 1
                }
            }
            else {
                state
            }

        default: return state
    }
}

let initialState: GalleryState = {
    transitionState: TransitionState.DONE,
    currentPage: 1,
    galleryData: [],
    makeApiCall: 1,
}

function init(initialPhotos: Array<Photo>) {
    return { ...initialState, galleryData: initialPhotos };
}

export default function UseInfiniteScroll(initialPhotos: Array<Photo>): [GalleryState, React.Dispatch<LoadImagesAction>] {

    let [state, dispatch] = useReducer(reducer, initialPhotos, init);

    useEffect(() => {

        async function requestNewPage() {
            console.log("YOOOO making an Api Call")
            if (state.currentPage !== 1) {
                try {
                    console.log("Trying to load page: ", state.currentPage)
                    const result = await fetch(
                        `https://api.unsplash.com/photos/?client_id=A_AsNdQXRGRpWUJw4ElDyye9jhoFvlLNC6N6vBFF0Vs&page=${state.currentPage}`
                    );
                    console.log("Result of loading next set of images", result)
                    const data: Array<Photo> = await result.json();
                    dispatch(updateGallery(data))

                } catch {
                    dispatch(setError())
                }
            }
        }
        requestNewPage();
    }, [state.makeApiCall]);



    return [state, dispatch]
}