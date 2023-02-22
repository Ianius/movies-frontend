import { Avatar, Box, Heading, HStack, VStack } from "@chakra-ui/react";

interface Props {
    review: string;
    username: string;
}

const Review = ({ review, username }: Props) => {
    return (
        <HStack
            align='top'
            spacing='1em'
        >
            <Avatar size='sm' name={username} />

            <VStack
                align='left'
            >
                <Heading size='md'>{username}</Heading>
                <Box>{review}</Box>
            </VStack>
        </HStack>
    );
}

export default Review;
