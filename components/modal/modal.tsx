import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import ModalContent from './modalContent'
import { Photo } from "../types";

interface ModalDisplayConditions {
    showContent: boolean,
    closeModal: () => void,
    photoInfo: Photo,

}

function Modal({ showContent, closeModal, photoInfo }: ModalDisplayConditions): React.ReactElement | null {
    const [isBrowser, setIsBrowser] = useState(false);
    console.log("Information about the photo", photoInfo)
    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (showContent) {
        let element = document.getElementById("modal-root");

        if (element !== null && photoInfo !== undefined) {

            return ReactDOM.createPortal(
                <ModalContent showContent={showContent} url={photoInfo.urls.regular} closeModal={closeModal} imagename={photoInfo.alt_description} authorName={`${photoInfo.user.first_name} ${photoInfo.user.last_name}`} />,
                element
            )

        } else {

            return null;
        }
    } else {

        return null;
    }

}

export default Modal