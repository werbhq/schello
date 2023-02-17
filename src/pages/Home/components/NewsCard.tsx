import { Schedule } from "@mui/icons-material";
import {
  Box,
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
    <Card sx={{ width: "345 px", height: "345 px" }}>
      <CardContent>
        <Grid display="flex" marginBottom="5px">
          <Typography variant="h5" padding="5px 0px">
            {props.news_type === "EXTERNAL" ? (
              <Link href={props.redirect_url}>{props.title}</Link>
            ) : (
              props.title
            )}
          </Typography>
        </Grid>
        <Box marginBottom="10px">
          {props.news_type === "EXTERNAL"
            ? "Visit the page for More Information"
            : props.description}
        </Box>

        <Stack direction="row" alignContent="center">
          <Schedule />
          <Typography style={{ padding: "0px 5px", fontSize: "14px" }}>
            {props.timestamp}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
