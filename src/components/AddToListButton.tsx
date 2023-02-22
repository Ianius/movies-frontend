import { IconType } from "react-icons/lib/cjs";
import { useToast } from "@chakra-ui/react";
import { useAddToList, useDeleteFromList, useListDetails } from "../hooks/movie";
import SelectableButton from "./SelectableButton";
import { useUser } from "../hooks/auth";

interface Props {
    icon: IconType;
    listId: number;
    movieId: number;
    listName: string;
}

const AddToListButton = ({ icon, listId, movieId, listName }: Props) => {
    const { data: list, refetch } = useListDetails(listId);
    const toast = useToast();
    const user = useUser();
    const addToList = useAddToList({ onSuccess: () => refetch() });

    const deleteFromList = useDeleteFromList({
        onSuccess: () => refetch()
    });

    const isInList = list ? list.results.some(movie => movie.movie_id === movieId) : false;
    const tooltipText = `${isInList ? "Remove from" : "Add to"} ${listName.toLowerCase()}`;

    const onSelected = () => {
        if (!user) {
            return toast({
                title: 'An error occurred',
                description: `Log in to add movies to ${listName.toLowerCase()}`,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }

        if (!isInList) {
            addToList.mutate({ listId: list ? list.id : -1, movieId });
        } else {
            deleteFromList.mutate({ listId: list ? list.id : -1, movieId });
        }
    };

    return (
        <SelectableButton 
            icon={icon} 
            tooltipText={tooltipText} 
            isSelected={isInList} 
            onSelected={onSelected}
        />
    );
};

export default AddToListButton;
