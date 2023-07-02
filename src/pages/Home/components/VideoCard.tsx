import {
    Collapse,
    Grid,
    Link,
    Stack,
    Card,
    CardMedia,
    Typography,
    CardContent,
} from '@mui/material';
import { Error, Google, Instagram, Schedule, YouTube } from '@mui/icons-material';
import stringToHtml from 'html-react-parser';
import Expand from 'components/ui/Expand';
import { useState } from 'react';
import { GeneralVideo } from 'types/General Awarness';
import { CommunityVideo } from 'types/Community';
import { SDSColorPrimitives } from 'components/ui/Colours';

export default function VideoCard(props: GeneralVideo | CommunityVideo) {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => setExpanded(!expanded);
    let description: any = stringToHtml(props.description);

    function renderSwitch(param: string): JSX.Element {
        switch (param) {
            case 'YOUTUBE':
                return <YouTube />;
            case 'REEL':
                return <Instagram />;
            case 'GOOGLE-DRIVE':
                return <Google />;
            default:
                return <Error />;
        }
    }

    return (
        <Card
            sx={{
                minWidth: '320px',
                maxWidth: '320px',
                margin: '5px',
                whiteSpaceP: 'nowrap',
            }}
        >
            <CardMedia sx={{ height: 120 }} image={props.thumbnail} />
            <CardContent sx={{ height: '100%', width: '100%' }}>
                <Grid>
                    <Link href={props.url} target="_blank">
                        <Typography variant="body1" sx={{ color: SDSColorPrimitives.bloodyBlue }}>
                            {props.title.substring(0, 30) + '...'}
                        </Typography>
                    </Link>
                </Grid>

                <Grid container>
                    <Typography style={{ left: '0px', padding: '0px 5px 0px 0px' }}>
                        {props.author}
                    </Typography>
                    {renderSwitch(props.platform)}
                </Grid>

                <Grid container>
                    <Stack direction="row" alignItems="center" justifyContent="center">
                        <Schedule />
                        <p style={{ fontSize: '0.8em', margin: '0', padding: '0px 5px' }}>
                            {new Date(props.timestamp).toDateString()}
                        </p>
                    </Stack>
                    {props.description !== '' && (
                        <Expand expanded={expanded} handleExpand={handleExpand} />
                    )}
                </Grid>

                {props.description !== '' && (
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </Collapse>
                )}
            </CardContent>
        </Card>
    );
}
