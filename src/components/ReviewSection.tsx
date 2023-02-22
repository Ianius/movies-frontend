import { Box, Button, Heading, Spinner, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useUser } from "../hooks/auth";
import { usePostReview, useReviews } from "../hooks/movie";
import PageSelector from "./PageSelector";
import Review from "./Review";

interface Props {
    movieId: number;
}

const ReviewSection = ({ movieId }: Props) => {
    const [page, setPage] = useState(1);
    const { data, isLoading, refetch } = useReviews(movieId, page);
    const [review, setReview] = useState('');
    const toast = useToast();
    const user = useUser();
    const postReview = usePostReview();

    const onReviewPost = () => 
        user && 
            postReview.mutate({ movieId, review, token: user.token}, {
                onSuccess: _ => {
                    toast({
                        title: 'Review Posted',
                        description: "Review posted successfully!",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });

                    refetch();
                }
            });

    return (
        <VStack
            align='left'
            spacing='1em'
        >
            <Heading size='lg'>Reviews</Heading>

            { isLoading &&
                <Spinner />
            }

            { (data && data.reviews.length > 0) &&
                data.reviews.map((review, i) => <Review key={i} {...review} />) ||
                <Box color='gray.500'>Be the first to write a review!</Box>
            }

            { data &&
                <PageSelector 
                    page={page}
                    totalPages={data.page_count}
                    selectPage={setPage}
                />
            }

            { !user &&
                <Box color='gray.500'>Log in to write a review!</Box>
            }

            { user &&
                <VStack
                    align='start'
                >
                    <Text color='gray.500'>What did you think?</Text>

                    <Textarea
                        value={review}
                        variant='filled'
                        onChange={e => setReview(e.target.value)}
                        placeholder='Write a review'
                        colorScheme='red'
                    />

                    <Button
                        onClick={onReviewPost}
                        colorScheme='purple'
                    >
                        Post
                    </Button>
                </VStack>
            }
        </VStack>
    );
};

export default ReviewSection;
