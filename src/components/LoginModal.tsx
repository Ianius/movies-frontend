import { Link, Button, VStack, HStack, Heading, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, KeyboardEvent } from "react";

import TextArea from './TextArea';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {
    const navigate = useNavigate();
    const textAreaColor = useColorModeValue('bodyLight', 'rgba(255, 255, 255, 0.05)');

    const onSignUpClicked = () => navigate('/signup');

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            motionPreset='slideInBottom'
            isCentered
        >
            <ModalOverlay />
            <ModalContent
                bg={useColorModeValue('bodyLight', 'darkAccent')}
            >
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        w='100%'
                        gap='0.5em'
                        flex={1}
                        align='left'
                    >
                        <TextArea bg={textAreaColor} placeholder='Username'/>
                        <TextArea bg={textAreaColor} placeholder='Password' type='password'/>

                        <Button colorScheme='purple' mb='2em'>Log In</Button>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Box>
                        {"Don't have an account? "}
                        <Link color='blue.300' onClick={onSignUpClicked}>Sign Up</Link>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
