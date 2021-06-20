import Image from 'next/image'

interface ModalContentProps {
    url: string
    imagename?: string,
    showContent: boolean,
    closeModal: () => void
}
export default function ModalContent({ url, imagename, showContent, closeModal }: ModalContentProps) {

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
            <div>
                <p>imageDescription : {url} </p>
            </div>
            <button className="closeModal" onClick={closeModal}>X</button>

        </div>

    </div > : null
}