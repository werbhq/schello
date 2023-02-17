import { Autocomplete, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import Stack from "@mui/material/Stack";
import type { MapData } from "../../../models/MapData";

interface MapAPIResponse {
  display_name: string;
  place_id: string;
  lat: string;
  lon: string;
}

function AutocompleteCustom({
  options,
  setInput,
  formVars,
  setFormVars,
  loading,
}: {
  options: MapData[];
  setInput: any;
  formVars: any;
  setFormVars: any;
  loading: boolean;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Autocomplete
        options={options}
        onInputChange={(e, value: any) => {
          setInput(value);
        }}
        isOptionEqualToValue={(option: MapData, value: any) => true}
        getOptionLabel={(option: MapData) => option.title}
        style={{ width: 300 }}
        noOptionsText={"No Place Found"}
        onChange={(e, value) => {
          setFormVars({ ...formVars, location: value });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      {loading && <CircularProgress />}
    </Stack>
  );
}

export function PlaceSearch(props: any) {
  const { formVars, setFormVars } = props;
  const [options, setOptions] = React.useState<MapData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [input, setInput] = React.useState<string>("kerala");

  const getData = (searchTerm: string, signal: AbortSignal) => {
    const search = searchTerm.replace(" ", "+");

    const url = new URL("https://nominatim.openstreetmap.org/search.php");
    url.searchParams.append("q", search);
    url.searchParams.append("accept-language", "en");
    url.searchParams.append("countrycodes", "IN");
    url.searchParams.append("format", "jsonv2");

    setLoading(true);

    fetch(url.href, {
      signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const updatedOptions = json.map(
          ({ display_name, place_id, lat, lon }: MapAPIResponse) => {
            return { title: display_name, id: place_id, lat, lon };
          }
        );
        setOptions(updatedOptions);
        setLoading(false);
      })
      .catch((e) => {});
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getData(input, signal);

    return () => controller.abort();
  }, [input]);

  return (
    <AutocompleteCustom
      options={options}
      setInput={setInput}
      formVars={formVars}
      setFormVars={setFormVars}
      loading={loading}
    />
  );
}
