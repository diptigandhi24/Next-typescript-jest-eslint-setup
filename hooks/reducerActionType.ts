import { Photo } from '../components/types'

export type LoadImagesAction =
    {
        type: 'ADD_NEXT_PAGE',
        payload: {
            page: number
        }
    }
    | { type: 'ERROR' }
    | {
        type: 'ADD_IMAGES',
        payload: {
            photos: Array<Photo>
        }
    }
    | {
        type: "END_OF_PAGE"
    }

export enum TransitionState {
    LOADING,
    ERROR,
    DONE
}


export function updateGallery(receivedPhotos: Array<Photo>) {
    return <const>{
        type: 'ADD_IMAGES',
        payload: {
            photos: receivedPhotos
        }
    }
}

export function setError() {
    return <const>{
        type: 'ERROR',
    }
}

export function updatePageNumber() {
    return <const>{
        type: 'ADD_NEXT_PAGE'
    }
}

export function endOfPage() {
    return <const>{
        type: "END_OF_PAGE"
    }
}