import { Modal, ModalProps, ModalOverlay } from "@chakra-ui/react";

interface Props extends ModalProps {
    children: React.ReactNode;
}

const ModalWindow = ({ children, ...other}: Props) => {
    return (
        <Modal
            motionPreset='slideInBottom'
            autoFocus
            isCentered
            {...other}
        >
            <ModalOverlay />

            {children}
        </Modal>
    );
};

export default ModalWindow;
