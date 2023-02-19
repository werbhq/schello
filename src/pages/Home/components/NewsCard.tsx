import {
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { GeneralNews } from "../../../models/General Awarness";

export default function NewsCard(props: GeneralNews) {
  return (
    <Card
      sx={{
        minWidth: "345px",
        width: 345,
        height: 245,
        maxWidth: "345px",
        minHeight: "245px",
        maxHeight: "245px",
        margin: "5px",
        whiteSpaceP: "nowrap",
      }}
    >
      <CardContent>
        <Grid display="flex" marginBottom="5px">
          <Typography variant="h5" padding="5px 0px">
            {props.news_type === "EXTERNAL" ? (
              <Link target="_blank" rel="noopener" href={props.redirect_url}>
                {props.title}
              </Link>
            ) : (
              props.title
            )}
          </Typography>
        </Grid>
        <Stack marginBottom="10px">
          {props.news_type === "EXTERNAL"
            ? props.title.slice(0, 20).concat("...")
            : props.description}
        </Stack>

        <Stack
          direction="row"
          alignContent="center"
          position="absolute"
          bottom="15px"
        >
          <Typography
            style={{
              padding: "0px 5px",
              fontSize: "14px",
              width: 118,
              height: 21,
            }}
          >
            {new Date(props.timestamp).toDateString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
