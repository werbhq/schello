import { Link, Stack, Card, CardMedia, Typography, CardContent, Button } from '@mui/material';
import { AccessTimeFilledRounded, People, Verified, LaunchRounded } from '@mui/icons-material';
import { SDSChip } from 'components/ui/chip';
import { SDSColorPrimitives, SDSColorsSemantic } from 'components/ui/Colours';
import { EventInformation, MediaInformation } from 'types/Media';
import schelloStudentImg from 'assets/images/characters/student.png';
import schelloAdminImg from 'assets/images/characters/admin.png';
import schelloExciseImg from 'assets/images/characters/excise.png';
import schelloNewsImg from 'assets/images/characters/news.png';

import dayjs from 'dayjs';

const backgroundColors = [
    SDSColorsSemantic.brandPrimary,
    SDSColorsSemantic.brandSecondary,
    SDSColorsSemantic.brandTeritiary,
];

export default function MediaCard(props: {
    data: MediaInformation | EventInformation;
    expand?: boolean;
    index: number;
}) {
    const displayTime = {
        startDate:
            'date_from' in props.data ? dayjs(props.data.date_from).format('D MMM YYYY') : '',
        endDate: 'date_to' in props.data ? dayjs(props.data.date_to).format('D MMM YYYY') : '',
        startTime: 'time_from' in props.data ? dayjs(props.data.time_from).format('hh:mm A') : '',
        endTime: 'time_to' in props.data ? dayjs(props.data.time_to).format('hh:mm A') : '',
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

    const expand = props.expand ?? true;

    // let description: any = stringToHtml('description' in props ? props.data.description ?? '' : '');

    return (
        <Card
            sx={{
                width: expand ? '100%' : '320px',
                // margin: '5px',
                whiteSpaceP: 'nowrap',
            }}
        >
            {props.data.type === 'MEDIA' && props.data.media_type === 'VIDEO' && (
                <Link
                    href={'url' in props.data ? props.data.url : undefined}
                    target="_blank"
                    sx={{ textDecoration: 'none' }}
                >
                    <CardMedia sx={{ height: expand ? 245 : 120 }} image={props.data.thumbnail} />
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
                    {props.data.title}
                </Typography>

                <Stack
                    direction={'row'}
                    gap={'12px'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    sx={{ width: '100%' }}
                >
                    <Stack direction={'row'} gap={'12px'} sx={{ flex: '1 0 0' }}>
                        <div
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundImage: `url(${
                                    props.data.type === 'MEDIA' && props.data.media_type === 'NEWS'
                                        ? schelloNewsImg
                                        : props.data.fromExcise
                                        ? schelloExciseImg
                                        : props.data.type === 'EVENT'
                                        ? schelloAdminImg
                                        : schelloStudentImg
                                })`,
                                backgroundColor: backgroundColors[props.index % 3],
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                border: '1px solid #00000032',
                            }}
                        ></div>
                        <Typography
                            style={{
                                overflow: 'hidden',
                                flex: '1 0 0',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            {props.data.source ?? 'UNDEFINED'}
                        </Typography>
                    </Stack>

                    <SDSChip
                        label={expand ? (props.data.fromExcise ? 'Excise' : 'Community') : ''}
                        color={props.data.fromExcise ? 'primary' : 'secondary'}
                        icon={props.data.fromExcise ? <Verified /> : <People />}
                    ></SDSChip>
                </Stack>

                <Typography variant="body2" color="text.secondary" style={{ maxLines: 3 }}>
                    {truncateString(removeHtmlTags(props.data.description ?? ''), descriptionLimit)}
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
                                {props.data.type === 'MEDIA'
                                    ? new Date(props.data.timestamp).toDateString()
                                    : displayTimeDateString}
                            </p>
                        </Stack>
                    </Stack>

                    {props.data.type === 'MEDIA' &&
                        (props.data.media_type === 'ARTICLE' ||
                            props.data.media_type === 'NEWS') && (
                            <Button
                                href={props.data.url ?? undefined}
                                startIcon={<LaunchRounded />}
                                size="small"
                                variant="contained"
                            >
                                Continue Reading
                            </Button>
                        )}

                    {props.data.type === 'EVENT' && (
                        <Stack
                            direction={'row'}
                            justifyContent={'space-between'}
                            style={{ width: '100%' }}
                        >
                            <SDSChip
                                label={props.data.mode}
                                icon={props.data.mode === 'OFFLINE' ? <Verified /> : <People />}
                            ></SDSChip>

                            <Button
                                startIcon={<LaunchRounded />}
                                size="small"
                                variant="contained"
                                href={props.data.register_url}
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
