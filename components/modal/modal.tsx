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

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    if (showContent) {
        let element = document.getElementById("modal-root");

        if (element !== null && photoInfo !== undefined) {

            return ReactDOM.createPortal(
                <ModalContent showContent={showContent} url={photoInfo.urls.regular} closeModal={closeModal} />,
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