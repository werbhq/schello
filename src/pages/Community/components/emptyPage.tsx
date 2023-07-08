import { useLocation, NavLink } from 'react-router-dom';
import Page from 'components/ui/Page';
import { Grid, Breadcrumbs, Link, Typography, Stack } from '@mui/material';
import ROUTES from 'routes';
import { MediaInformation } from 'types/Media';
import stringToHtml from 'html-react-parser';
import { SDSChip } from 'components/ui/chip';
import { Verified, People, AccessTimeFilledRounded } from '@mui/icons-material';

import schelloStudentImg from 'assets/images/characters/student.png';
import schelloExciseImg from 'assets/images/characters/excise.png';
import schelloNewsImg from 'assets/images/characters/news.png';

import { removeHtmlTags, getReadTime, formatTimestamp } from 'util/media';

export default function ArticlePage(props: any) {
    const location = useLocation();
    const { data, fromPage, profileColor } = location.state as {
        data: MediaInformation;
        fromPage: string;
        profileColor: string;
    };
    const description: any = stringToHtml(data.description ?? '');

    return (
        <Page>
            <Grid
                container
                style={{
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '100%',
                    width: '100%',
                    padding: '0px 16px 32px 16px',
                }}
            >
                <Grid item xs sm md lg></Grid>
                <Grid item xs={12} sm={10} md={10} lg={10}>
                    <div>
                        <Stack
                            direction={'row'}
                            gap={'24px'}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            justifyContent={'space-between'}
                            sx={{ width: '100%' }}
                        >
                            <Stack direction="row" alignItems="center" justifyContent="center">
                                <AccessTimeFilledRounded />
                                <p
                                    style={{
                                        fontSize: '0.8em',
                                        margin: '0',
                                        padding: '0px 5px',
                                    }}
                                >
                                    {formatTimestamp(data.timestamp)}
                                </p>
                            </Stack>
                            <SDSChip
                                label={getReadTime(removeHtmlTags(data.description ?? ''))}
                            ></SDSChip>
                        </Stack>
                        <br />
                        {/* <hr style={{ border: '1px solid #00000010' }} /> */}
                        <br />
                        <div
                            style={{
                                borderRadius: '10px',
                                border: '1px solid rgba(199, 173, 165, 0.50)',
                                background: '#FFF',
                                padding: '16px',
                                boxShadow: '0px 4px 50px 0px rgba(64, 93, 136, 0.04)',
                            }}
                        >
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover" color="inherit">
                                    <NavLink
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                        color="inherit"
                                        to={fromPage === 'Home' ? '/' : '/' + ROUTES.COMMUNITY}
                                    >
                                        {fromPage}
                                    </NavLink>
                                </Link>

                                <Typography color="text.primary">
                                    {data.media_type === 'ARTICLE' ? 'Article' : 'News'}
                                </Typography>
                            </Breadcrumbs>
                            <br />
                            <Typography variant="h3">{data.title}</Typography>
                            <br />

                            <Stack
                                direction={'row'}
                                gap={'12px'}
                                alignItems={'center'}
                                justifyContent={'flex-start'}
                            >
                                <div
                                    style={{
                                        height: '20px',
                                        display: 'flex',
                                        columnGap: '12px',
                                        minWidth: 0,
                                        flexShrink: 1,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            backgroundImage: `url(${
                                                data.media_type === 'NEWS'
                                                    ? schelloNewsImg
                                                    : data.fromExcise
                                                    ? schelloExciseImg
                                                    : schelloStudentImg
                                            })`,
                                            backgroundColor: profileColor,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            border: '1px solid #00000032',
                                            flex: '0 0 auto',
                                        }}
                                    ></div>
                                    <Typography
                                        style={{
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                            flexShrink: 1,
                                            maxWidth: '100%',
                                            minWidth: '0px',
                                        }}
                                    >
                                        {data.source ?? 'UNDEFINED'}{' '}
                                        {data.type === 'MEDIA' && data.media_type === 'NEWS'
                                            ? ' (News)'
                                            : ''}
                                    </Typography>
                                </div>

                                <SDSChip
                                    sx={{ flexShrink: 0 }}
                                    label={data.fromExcise ? 'Excise' : 'Community'}
                                    color={data.fromExcise ? 'primary' : 'secondary'}
                                    icon={data.fromExcise ? <Verified /> : <People />}
                                ></SDSChip>
                            </Stack>

                            <br />
                            <Typography variant="body1">{description}</Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs sm md lg></Grid>
            </Grid>
        </Page>
    );
}
