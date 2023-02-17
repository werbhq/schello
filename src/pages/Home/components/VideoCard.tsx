import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import stringToHtml from "html-react-parser";
import { Collapse, Grid, Stack } from "@mui/material";
import {
  Error,
  Google,
  Instagram,
  Schedule,
  YouTube,
} from "@mui/icons-material";
import Expand from "../../../components/ui/Expand";

export default function VideoCard(props: any) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpand = () => setExpanded(!expanded);
  let description: any = stringToHtml(props.details.description);

  function renderSwitch(param: string): JSX.Element {
    switch (param) {
      case "YOUTUBE":
        return <YouTube />;
      case "REEL":
        return <Instagram />;
      case "GOOGLE-DRIVE":
        return <Google />;
      default:
        return <Error />;
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 170 }}
        image={props.details.thumbnail}
        title="green iguana"
      />
      <CardContent>
        <Grid>
          <Typography gutterBottom variant="h6">
            {props.details.title}
          </Typography>
        </Grid>

        <Grid container>
          <Typography style={{ left: "0px", padding: "0px 5px 0px 0px" }}>
            {props.details.author}
          </Typography>
          {renderSwitch(props.details.platform)}
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Schedule />
            <p style={{ fontSize: "0.8em", margin: "0", padding: "0px 5px" }}>
              {props.details.timestamp}
            </p>
          </Stack>

          <Expand expanded={expanded} handleExpand={handleExpand} />
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Collapse>
      </CardContent>

      <CardActions>
        <Button size="small" href={props.details.url}>
          Watch
        </Button>
      </CardActions>
    </Card>
  );
}
