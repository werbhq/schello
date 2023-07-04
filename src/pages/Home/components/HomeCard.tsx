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
// import { Error, Google, Instagram, Schedule, YouTube } from '@mui/icons-material';
import { AccessTimeFilledRounded, People, Verified, RemoveRedEye } from '@mui/icons-material';
// import stringToHtml from 'html-react-parser';
import { SDSChip } from 'components/ui/chip';
import { useState } from 'react';
import { SDSColorPrimitives } from 'components/ui/Colours';
import { EventInformation, MediaInformation } from 'types/Media';

export default function MediaCard(props: MediaInformation | EventInformation) {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => setExpanded(!expanded);

    const descriptionLimit = 250;

    function removeHtmlTags(str: string): string {
        return str.replace(/<[^>]*>?/gm, '');
    }

    function truncateString(str: string, limit: number): string {
        if (str.length > limit) {
            return str.slice(0, limit) + '...';
        } else {
            return str;
        }
    }

    // let description: any = stringToHtml('description' in props ? props.description ?? '' : '');

    return (
        <Card
            sx={{
                width: '100%',
                margin: '5px',
                whiteSpaceP: 'nowrap',
            }}
        >
            <Link
                href={'url' in props ? props.url : undefined}
                target="_blank"
                sx={{ textDecoration: 'none' }}
            >
                <CardMedia sx={{ height: 245 }} image={props.thumbnail} />
            </Link>
            <CardContent
                sx={{
                    height: '100%',
                    width: '100%',
                    rowGap: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: SDSColorPrimitives.bloodyBlue,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {props.title}
                </Typography>

                <Stack direction={'row'} gap={'12px'}>
                    <img
                        src={
                            props.source_pfp ??
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6MQWm0d8mZkv2KRJ4fkG1cs7Gen8RfXFGHw&usqp=CAU'
                        }
                        width={24}
                        height={24}
                        style={{ borderRadius: '50%' }}
                        alt=""
                    ></img>
                    <Typography>{props.source ?? 'UNDEFINED'}</Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary" style={{ maxLines: 3 }}>
                    {truncateString(removeHtmlTags(props.description ?? ''), descriptionLimit)}
                </Typography>

                <Stack justifyContent={'space-between'} direction={'row'}>
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={'8px'}>
                        <Stack direction="row" alignItems="center" justifyContent="center">
                            <AccessTimeFilledRounded />
                            <p style={{ fontSize: '0.8em', margin: '0', padding: '0px 5px' }}>
                                {new Date(props.timestamp).toDateString()}
                            </p>
                        </Stack>

                        {'views' in props && (
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <RemoveRedEye />
                                <p style={{ fontSize: '0.8em', margin: '0', padding: '0px 5px' }}>
                                    {props.views} views
                                </p>
                            </Stack>
                        )}
                    </Stack>

                    <SDSChip
                        label={props.fromExcise ? 'Excise' : 'Community'}
                        color={props.fromExcise ? 'primary' : 'secondary'}
                        icon={props.fromExcise ? <Verified /> : <People />}
                    ></SDSChip>
                </Stack>
            </CardContent>
        </Card>
    );
}
