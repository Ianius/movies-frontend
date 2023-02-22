import { Text, Tabs, Tab, TabList, TabPanels, TabPanel, Heading, Skeleton, HStack, VStack, Flex, Spacer, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import CoverImage from "../components/CoverImage";
import MovieListButtons from "../components/ItemListButtons";
import { useListDetails, useLists, useUserLists, useMovie, usePosterImage } from "../hooks/movie";

interface ListItemProps {
    itemId: number;
}

const ListItem = ({ itemId }: ListItemProps) => {
    const navigate = useNavigate();

    const { data: lists, isLoading: listsLoading }               = useLists();
    const { data: movieDetails, isLoading: movieDetailsLoading } = useMovie(itemId);
    const { url, isLoading: posterLoading }                      = usePosterImage('w342', movieDetails);

    const isLoading = listsLoading || movieDetailsLoading || posterLoading;

    const navigateToItem = () => navigate(`/movie/${itemId}`);

    return (
        <Skeleton
            w='100%'
            h={isLoading ? '200px' : undefined}
            isLoaded={!isLoading}
        >
            {(movieDetails && lists && url) && 
                <HStack
                    align='start'
                    spacing='1em'
                >
                    <CoverImage
                        w='100%'
                        flex={1}
                        src={url}
                        onClick={navigateToItem}
                        ratio={500 / 750}
                    />

                    <Flex
                        gap='0.5em'
                        flex={6}
                        align='start'
                        direction='column'
                        alignSelf='stretch'
                    >
                        <Heading 
                            size='md'
                            cursor='pointer'
                            onClick={navigateToItem}
                            _hover={{ color: 'purple.500' }}
                            transition='200ms'
                        >
                            {movieDetails.title}
                        </Heading>

                        <Text color='gray.400'>{movieDetails.overview}</Text>

                        <Spacer/>

                        <MovieListButtons movieId={itemId}/>
                    </Flex>
                </HStack>
            }
        </Skeleton>
    );
};

const ItemList = ({ listId }: { listId: number }) => {
    const { data } = useListDetails(listId);

    return (
        <VStack
            w='100%'
            align='stretch'
            spacing='2em'
        >
            { data && 
                data.results.map((item, i) => <ListItem key={i} itemId={item.movie_id} />)
            }
        </VStack>
    );
};

const AccordionItemList = ({ id, name }: { id: number, name: string }) => {
    return (
        <AccordionItem
            border={0}
        >
            <h2>
                <AccordionButton
                    w='100%'
                >
                    <AccordionIcon/>

                    <Heading size='md'>
                        {name}
                    </Heading>
                </AccordionButton>
            </h2>

            <AccordionPanel>
                <ItemList listId={id}/>
            </AccordionPanel>
        </AccordionItem>
    );
};

const MyListsTabPanel = () => {
    const { data } = useUserLists();

    let lists = (data && !data.error) ? data.results : [];

    return (
        <TabPanel>
            <VStack
                align='stretch'
            >
                <Accordion
                    allowMultiple
                >
                    {lists.map(({ id, name }) => <AccordionItemList key={id} id={id} name={name}/>)}
                </Accordion>

                <Button colorScheme='purple'>Manage Lists</Button>
            </VStack>
        </TabPanel>
    );
};

const Lists = () => {
    const { state } = useLocation();
    const { selected } = state ?? {};
    const { data } = useLists();

    const index = selected 
        ? (selected === "Watchlist" ? 2 : 1)
        : 0;

    return (
        <Tabs 
            variant='soft-rounded'
            colorScheme='purple'
            defaultIndex={index}
        >
            <TabList>
                <Tab>My Lists</Tab>
                <Tab>Favorites</Tab>
                <Tab>Watchlist</Tab>
            </TabList>

            <TabPanels>
                <MyListsTabPanel/>

                { data &&
                    <TabPanel>
                        <ItemList listId={data.favorites_id}/>
                    </TabPanel>
                }

                { data &&
                    <TabPanel>
                        <ItemList listId={data.watchlist_id}/>
                    </TabPanel>
                }
            </TabPanels>
        </Tabs>
    );
};

export default Lists;
