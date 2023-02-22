import { HStack, VStack, Box, useColorModeValue } from '@chakra-ui/react';
import { Member, CrewMember, CastMember } from '../interfaces/movies';

interface Props {
    data: Member[]; 
}

const MemberList = ({ data }: Props) => {
    const isCastMember = (m: Member): m is CastMember => (m as CastMember).character !== undefined;
    const isCrewMember = (m: Member): m is CrewMember => (m as CrewMember).job !== undefined;

    const titleColor = useColorModeValue('gray.500', 'gray.300');

    return (
        <Box
            pb='0.5em'
            maxW='100%'
        >
            <HStack
                pb='0.5em'
                css={{ scrollbarWidth: 'thin' }}
                spacing='2em'
                overflowX='scroll'
            >
                {data.map((member, i) => (
                    <VStack
                        key={i}
                        align='left'
                        spacing='0px'
                    >
                        <Box
                            whiteSpace='nowrap'
                            fontWeight='bold'
                        >
                            {member.name}
                        </Box>

                        <Box 
                            color={titleColor}
                            whiteSpace='nowrap'
                        >
                            {isCastMember(member) ? member.character : isCrewMember(member) ? member.job : undefined}
                        </Box>
                    </VStack>
                ))}
            </HStack>
        </Box>
    );
};

export default MemberList;
