import { Link, Stack, Card, CardMedia, Typography, CardContent, Button } from '@mui/material';
import { AccessTimeFilledRounded, People, Verified, LaunchRounded } from '@mui/icons-material';
import { SDSChip } from 'components/ui/chip';
import { SDSColorPrimitives } from 'components/ui/Colours';
import { EventInformation, MediaInformation } from 'types/Media';

import dayjs from 'dayjs';

export default function MediaCard(props: MediaInformation | EventInformation) {
    const displayTime = {
        startDate: 'date_from' in props ? dayjs(props.date_from).format('D MMM YYYY') : '',
        endDate: 'date_to' in props ? dayjs(props.date_to).format('D MMM YYYY') : '',
        startTime: 'time_from' in props ? dayjs(props.time_from).format('hh:mm A') : '',
        endTime: 'time_to' in props ? dayjs(props.time_to).format('hh:mm A') : '',
    };

    const displayTimeDateString =
        displayTime.startDate !== displayTime.endDate
            ? `${displayTime.startTime}, ${displayTime.startDate} → ${displayTime.endTime}, ${displayTime.endDate}`
            : `${displayTime.startDate}, ${displayTime.startTime} → ${displayTime.endTime}`;

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
                // margin: '5px',
                whiteSpaceP: 'nowrap',
            }}
        >
            {props.type === 'MEDIA' && props.media_type === 'VIDEO' && (
                <Link
                    href={'url' in props ? props.url : undefined}
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                >
                    <CardMedia sx={{ height: 245 }} image={props.thumbnail} />
                </Link>
            )}
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

                <Stack direction={'row'} gap={'12px'} alignItems={'center'}>
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

                    <SDSChip
                        label={props.fromExcise ? 'Excise' : 'Community'}
                        color={props.fromExcise ? 'primary' : 'secondary'}
                        icon={props.fromExcise ? <Verified /> : <People />}
                    ></SDSChip>
                </Stack>

                <Typography variant="body2" color="text.secondary" style={{ maxLines: 3 }}>
                    {truncateString(removeHtmlTags(props.description ?? ''), descriptionLimit)}
                </Typography>

                <Stack
                    justifyContent={'space-between'}
                    direction={'row'}
                    flexWrap={'wrap'}
                    rowGap={'12px'}
                >
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={'8px'}>
                        <Stack direction="row" alignItems="center" justifyContent="center">
                            <AccessTimeFilledRounded />
                            <p style={{ fontSize: '0.8em', margin: '0', padding: '0px 5px' }}>
                                {props.type === 'MEDIA'
                                    ? new Date(props.timestamp).toDateString()
                                    : displayTimeDateString}
                            </p>
                        </Stack>
                    </Stack>

                    {props.type === 'MEDIA' && props.media_type === 'ARTICLE' && (
                        <Button startIcon={<LaunchRounded />} size="small" variant="contained">
                            Continue Reading
                        </Button>
                    )}

                    {props.type === 'EVENT' && (
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            style={{ width: '100%' }}
                        >
                            <SDSChip
                                label={props.mode}
                                icon={props.mode === 'OFFLINE' ? <Verified /> : <People />}
                            ></SDSChip>

                            <Button
                                startIcon={<LaunchRounded />}
                                size="small"
                                variant="contained"
                                href={props.register_url}
                            >
                                Register Now
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
