import Image from 'next/image'

interface ModalContentProps {
    url: string
    imagename: string,
    authorName: string,
    showContent: boolean,
    closeModal: () => void
}
export default function ModalContent({ url, imagename, showContent, closeModal, authorName }: ModalContentProps) {

    return showContent ? <div className="modalWrapper">
        <div className="modalcontent">
            <div>
                <Image
                    alt={"Mountain"}
                    src={url}
                    placeholder="blur"
                    layout="fill"
                    quality="75"
                    objectFit="scale-down"

                />
            </div>
            <div style={{ textAlign: "center" }}>
                <p>imageDescription : {imagename} </p>
                <p>Picture Credits : {authorName} </p>
            </div>
            <button className="closeModal" onClick={closeModal}>X</button>

        </div>

    </div > : null
}