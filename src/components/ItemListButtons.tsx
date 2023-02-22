import { HStack } from "@chakra-ui/react";
import { MdBookmark, MdFavorite, MdList } from "react-icons/md";
import { useItemStatusAny, useLists, useMovie } from "../hooks/movie";
import { MovieDetails } from "../interfaces/movies";

import AddToListButton from "./AddToListButton";
import ListPopover from "./ListPopover";
import SelectableButton from "./SelectableButton";

interface Props {
    movieId: number;
}

const MovieListButtons = ({ movieId }: Props) => {
    const { data: movie }     = useMovie(movieId);
    const { data: lists }     = useLists();
    const { data: statusAny } = useItemStatusAny(movieId);

    return (
        <HStack>
            <ListPopover
                trigger={<SelectableButton icon={MdList} isSelected={statusAny?.item_status} tooltipText="Add to list"/>}
                movieId={movieId}
            />
            <AddToListButton icon={MdFavorite} listId={lists ? lists.favorites_id : -1} movieId={movieId} listName="Favorites"/>
            <AddToListButton icon={MdBookmark} listId={lists ? lists.watchlist_id : -1} movieId={movieId} listName="Watchlist"/>
        </HStack>
    );
};

export default MovieListButtons;
