import styled from '@emotion/styled';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
}));

function Expand({ expanded, handleExpand }: { expanded: boolean; handleExpand: () => void }) {
    return (
        <ExpandMore expand={expanded} onClick={handleExpand} aria-label="show more">
            <ExpandMoreIcon />
        </ExpandMore>
    );
}

export default Expand;
