import { Button, HStack } from "@chakra-ui/react";

import ModalWindow from "./ModalWindow";
import ModalComponents from "./ModalComponents";

type DialogButtonProps = { text?: string; colorScheme?: string; onClick?: () => void; }

interface Props {
    isOpen: boolean; 
    onClose: () => void; 
    header: React.ReactNode; 
    message: string;
    confirm?: DialogButtonProps;
    cancel?: DialogButtonProps;
}

const ModalDialog = ({ isOpen, onClose, header, message, confirm, cancel }: Props) => {
    const defaultConfirm: Required<DialogButtonProps> = { text: "Confirm", colorScheme: "green", onClick: () => null };
    const defaultCancel: Required<DialogButtonProps> = { text: "Cancel", colorScheme: "gray", onClick: () => null };

    const confirmButtonProps = { ...defaultConfirm, ...confirm };
    const cancelButtonProps = { ...defaultCancel, ...cancel };

    const wrapFunctions = (...args: (() => any)[]) => () => args.forEach(f => f());

    return (
        <ModalWindow
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalComponents
                header={header}
                footer={
                    <HStack>
                        <Button 
                            onClick={confirmButtonProps.onClick}
                            colorScheme={confirmButtonProps.colorScheme}
                        >
                            {confirmButtonProps.text}
                        </Button>

                        <Button 
                            variant='ghost' 
                            onClick={wrapFunctions(onClose, cancelButtonProps.onClick)}
                            colorScheme={cancelButtonProps.colorScheme}
                        >
                            {cancelButtonProps.text}
                        </Button>
                    </HStack>
                }
            >
                {message}
            </ModalComponents>
        </ModalWindow>
    );
};


export default ModalDialog;
