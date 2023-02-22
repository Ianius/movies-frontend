import { Image, Skeleton } from '@chakra-ui/react';
import AspectRatioConstraint from './AspectRatioConstraint';

interface Props {
    w?: string;
    h?: string;
    src?: string;
    flex?: number;
    ratio: number;
    boxSize?: string;
    onClick?: () => void;
    isLoading?: boolean;
}

const CoverImage = ({ src, onClick, isLoading, ...rest}: Props) => {
    return (
        <AspectRatioConstraint
            {...rest}
        >
            <Skeleton
                top='0px'
                left='0px'
                boxSize='100%'
                position='absolute'
                isLoaded={!isLoading}
            >
                <Image
                    w='100%'
                    h='100%'
                    src={src}
                    fit='cover'
                    onClick={onClick}
                    cursor={onClick ? 'pointer' : undefined}
                    dropShadow='outline'
                    borderRadius='4px'
                />
            </Skeleton>
        </AspectRatioConstraint>
    );
};

export default CoverImage;
