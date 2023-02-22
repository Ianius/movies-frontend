import { Box, Button, HStack, Link, VStack, useToast, useBoolean } from "@chakra-ui/react";
import { useRef, useState, forwardRef } from "react";
import { useLogin, useRegister } from "../hooks/auth";

import InputField from "./InputField";
import ModalWindow from "./ModalWindow";
import ModalComponents from "./ModalComponents";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

interface ModalBodyProps {
    switchModal: () => void;
    onClose: () => void;
}

const Login = forwardRef<HTMLInputElement, ModalBodyProps>(({ switchModal, onClose }, ref) => {
    const toast = useToast();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = useLogin({
        onError(error) {
            toast({
                title: 'An error occurred.',
                description: error,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        },

        onSuccess() {
            onClose();

            toast({
                title: 'Log In',
                description: "Successfully logged in!",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
    });

    const onLogin = () => login.mutate({ username, password });

    return (
        <ModalComponents
            header="Log In"
            footer={
                <Box>
                    {"Don't have an account? "}
                    <Link color='blue.300' onClick={switchModal}>Sign Up</Link>
                </Box>
            }
        >
            <VStack
                w='100%'
                gap='0.5em'
                flex={1}
                align='left'
            >
                <InputField
                    ref={ref}
                    text={username}
                    setText={setUsername}
                    contrastBg
                    placeholder='Username'
                    onTextSubmitted={onLogin}
                />

                <InputField
                    type='password'
                    text={password}
                    setText={setPassword}
                    contrastBg
                    placeholder='Password'
                    onTextSubmitted={onLogin}
                />

                <HStack
                    justify='end'
                >
                    <Button variant='ghost' colorScheme='purple' onClick={onClose}>Cancel</Button>
                    <Button colorScheme='purple' onClick={onLogin}>Log In</Button>
                </HStack>
            </VStack>
        </ModalComponents>
    );
});

const Register = forwardRef<HTMLInputElement, ModalBodyProps>(({ switchModal, onClose }, ref) => {
    const toast = useToast();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = useRegister({
        onError(error) {
            toast({
                title: 'An error occurred',
                description: error,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        },

        onSuccess() {
            onClose();

            toast({
                title: 'Success',
                description: "Registration completed",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
    });

    const onRegister = () => register.mutate({ username, password });

    return (
        <ModalComponents
            header="Register"
            footer={
                <Box>
                    {"Already registered? "}
                    <Link color='blue.300' onClick={switchModal}>Log In</Link>
                </Box>
            }
        >
            <VStack
                w='100%'
                gap='0.5em'
                flex={1}
                align='left'
            >
                <InputField
                    ref={ref}
                    text={username}
                    setText={setUsername}
                    contrastBg
                    placeholder='Username'
                    onTextSubmitted={onRegister}
                />

                <InputField
                    type='password'
                    text={password}
                    setText={setPassword}
                    contrastBg
                    placeholder='Password'
                    onTextSubmitted={onRegister}
                />

                <HStack
                    justify='end'
                >
                    <Button variant='ghost' colorScheme='purple' onClick={onClose}>Cancel</Button>
                    <Button colorScheme='purple' onClick={onRegister}>Register</Button>
                </HStack>
            </VStack>
        </ModalComponents>
    );
});

const AuthModal = ({ isOpen, onClose }: Props) => {
    const initialFocusRef = useRef<HTMLInputElement>(null);
    const [isLogin, setIsLogin] = useBoolean(true);

    const modalProps = {
        onClose,
        switchModal: setIsLogin.toggle
    };

    return (
        <ModalWindow
            isOpen={isOpen}
            onClose={onClose}
            initialFocusRef={initialFocusRef}
        >
            { isLogin ? <Login {...modalProps}/> : <Register {...modalProps}/>}
        </ModalWindow>
    );
};

export default AuthModal;
