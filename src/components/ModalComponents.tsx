import { ModalBody, ModalCloseButton, ModalContent, ModalContentProps, ModalFooter, ModalHeader, useColorModeValue } from "@chakra-ui/react";

interface Props extends ModalContentProps {
    header: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}

const ModalComponents = ({ header, footer, children, ...other }: Props) => {
    return (
        <ModalContent
            bg={useColorModeValue('bodyLight', 'darkAccent')}
            {...other}
        >
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                {children}
            </ModalBody>

            <ModalFooter>
                {footer}
            </ModalFooter>
        </ModalContent>
    );
};

export default ModalComponents;
