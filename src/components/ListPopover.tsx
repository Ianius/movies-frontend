import { Text, Icon, Box, Button, Spinner, Checkbox, HStack, VStack, Flex, useToast, UseToastOptions, ToastId, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { useCreateList, useDeleteList, useItemStatus, useModifyList, useMovie, useUserLists } from "../hooks/movie";
import { useUser } from "../hooks/auth";
import { MdDelete } from "react-icons/md";
import { DefaultResponse } from '../interfaces/movies';

import InputField from "./InputField";
import ModalDialog from "./ModalDialog";
import PopoverWindow from "./PopoverWindow";
import PopoverComponents from "./PopoverComponents";

const showStatusMessageToast = (toast: (options?: UseToastOptions) => ToastId, error: boolean, message: string) => {
    toast({
        title: error ? "Error" : "Success!",
        description: message,
        status: error ? "error" : "success",
        duration: 2000,
        isClosable: true,
    });
};

interface ListItemCheckboxProps {
    name: string; 
    listId: number; 
    movieId: number;
    onDelete: (id: number, name: string) => void; 
}

const ListItemCheckbox = ({ name, listId, movieId, onDelete }: ListItemCheckboxProps) => {
    const toast                         = useToast();
    const { data: movie }               = useMovie(movieId);
    const { data: itemStatus, refetch } = useItemStatus(listId, movie ? movie.id : -1);

    const modifyList = useModifyList({ 
        onSuccess: ({ error, status_message }) => {
            if (!error) refetch();
            showStatusMessageToast(toast, error, status_message);
        }
    });

    return (
        <Flex>
            <Checkbox 
                flex={1}
                isChecked={itemStatus ? itemStatus.item_status : false}
                onChange={({ target: { checked } }) => {
                    if (movie) {
                        if (checked) {
                            modifyList.add.mutate({ listId, movieId: movie.id });
                        } else {
                            modifyList.delete.mutate({ listId, movieId: movie.id });
                        }
                    }
                }}
            >
                {name}
            </Checkbox>

            <IconButton 
                size='sm' 
                colorScheme='red' 
                variant='ghost' 
                aria-label="Delete list" 
                icon={<Icon as={MdDelete}/>}
                // onClick={() => onListDeleted(id)}
                onClick={() => onDelete(listId, name)}
            />
        </Flex>
    );
};

interface ManageListsWindowProps {
    movieId: number;
}

const ManageListsWindow = ({ movieId }: ManageListsWindowProps) => {
    const toast                                             = useToast();
    const { data: lists, isLoading: listsLoading, refetch } = useUserLists();
    const [newListName, setNewListName]                     = useState("");
    const [confirmDelete, setConfirmDelete]                 = useState({ isOpen: false, list: { id: -1, name: "" }});

    const onListMutationSuccess = ({ error, status_message }: DefaultResponse) => {
        if (!error) {
            refetch();
        }

        showStatusMessageToast(toast, error, status_message);
    };

    const createList = useCreateList({ onSuccess: onListMutationSuccess });
    const deleteList = useDeleteList({ onSuccess: onListMutationSuccess });

    const onListAdded = () => {
        createList.mutate({ name: newListName });
        setNewListName(""); 
    };

    const onListDeleteConfirmed = () => {
        deleteList.mutate({ id: confirmDelete.list.id });
        setConfirmDelete(state => ({ ...state, isOpen: false }));
    };

    const onListDeleteRequest = (id: number, name: string) => {
        setConfirmDelete({ isOpen: true, list: { id, name }});
    };

    return (
        <PopoverComponents
            header={<Text fontWeight='bold'>Add to...</Text>}
            footer={
                <Flex
                    py='0.25em'
                    gap='0.5em'
                    align='stretch'
                    direction='column'
                >
                    <HStack>
                        <InputField text={newListName} setText={setNewListName} placeholder='Name of the new list' onTextSubmitted={onListAdded} contrastBg/>
                        <Button colorScheme='purple' onClick={onListAdded}>Create</Button>
                    </HStack>
                </Flex>
            }
        >
            { listsLoading &&
                <Spinner/>
            }

            { lists &&
                <VStack
                    align='stretch'
                >
                    {lists.results.map(({ id, name }) => 
                        <ListItemCheckbox 
                            key={id} 
                            name={name}
                            listId={id} 
                            movieId={movieId}
                            onDelete={onListDeleteRequest}
                        />
                    )}
                </VStack>
            }

            { (lists && lists.results.length === 0) &&
                <Box>You haven't created any lists yet!</Box>
            }

            <ModalDialog
                isOpen={confirmDelete.isOpen}
                onClose={() => setConfirmDelete(state => ({ ...state, isOpen: false }))}
                header={`Delete`}
                message={`Are you sure you want to delete list ${confirmDelete.list.name}?`}
                confirm={{ text: "Delete", colorScheme: "red", onClick: onListDeleteConfirmed }}
            />
        </PopoverComponents>
    );
};

const LoginMessageWindow = () => {
    return (
        <PopoverComponents
            header='You are not logged in!'
        >
            Log in to start creating your own lists
        </PopoverComponents>
    );
};

interface Props {
    trigger: React.ReactElement;
    movieId: number;
}

const ListPopover = ({ trigger, movieId }: Props) => {
    const user = useUser();

    return (
        <PopoverWindow
            triggerElement={trigger}
        >
            {
                user 
                    ? <ManageListsWindow movieId={movieId}/>
                    : <LoginMessageWindow/>
            }
        </PopoverWindow>
    );
};

export default ListPopover;
