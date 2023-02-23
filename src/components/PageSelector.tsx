import { Button, HStack, StackProps } from '@chakra-ui/react';

interface Props extends StackProps {
    page: number;
    totalPages: number;
    selectPage: (page: number) => void;
}

const PageSelector = ({ page, totalPages, selectPage, ...rest }: Props) => {
    const marginButtonsCount = 1;
    const centerButtonsCount = 5;

    const centerSectionStartPage = page - Math.floor(centerButtonsCount / 2);
    const centerSectionEndPage = page + Math.floor(centerButtonsCount / 2);

    return (
        <HStack
            {...rest}
        >
            { centerSectionStartPage > marginButtonsCount &&
                Array(Math.min(marginButtonsCount, centerSectionStartPage - 1))
                    .fill(0)
                    .map((_, i) => <Button 
                        key={i} 
                        onClick={() => selectPage(i + 1)}
                        variant='ghost'
                    >
                        {i + 1}
                    </Button>)
            }

            { centerSectionStartPage > marginButtonsCount + 1 &&
                <span>...</span>
            }

            {
                Array(centerButtonsCount)
                .fill(0)
                .map((_, i) => {
                    const current = Math.max(centerSectionStartPage, 1) + i;

                    if (current > totalPages) return <></>;

                    return <Button 
                        key={i} 
                        onClick={() => selectPage(current)}
                        variant={current === page ? 'solid' : 'ghost'}
                    >
                        {current}
                    </Button>;
                })
            }

            {  centerSectionEndPage < totalPages - marginButtonsCount - 1 &&
                <span>...</span>
            }

            { centerSectionEndPage < totalPages - marginButtonsCount &&
                Array(marginButtonsCount)
                    .fill(0)
                    .map((_, i) => <Button 
                        key={i} 
                        onClick={() => selectPage(totalPages - (marginButtonsCount - 1) + i)}
                        variant='ghost'
                    >
                        {totalPages - (marginButtonsCount - 1) + i}
                    </Button>)
            }
        </HStack>
    );
};

export default PageSelector;
