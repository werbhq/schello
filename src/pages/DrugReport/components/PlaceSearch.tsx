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
  const AbortControllerRef = React.useRef<null | AbortController>(null);

  const getData = async (searchTerm: string) => {
    if (AbortControllerRef.current) AbortControllerRef.current.abort();
    AbortControllerRef.current = new AbortController();
    const signal = AbortControllerRef.current.signal;

    const url = new URL("https://nominatim.openstreetmap.org/search.php");
    url.searchParams.append("q", searchTerm);
    url.searchParams.append("accept-language", "en");
    url.searchParams.append("countrycodes", "IN");
    url.searchParams.append("format", "jsonv2");

    const data = await fetch(url.href, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal,
    });

    const json = await data.json();

    const updatedOptions = json.map(
      ({ display_name, place_id, lat, lon }: MapAPIResponse) => {
        return { title: display_name, id: place_id, lat, lon };
      }
    );

    setOptions(updatedOptions);
  };

  React.useMemo(() => {
    setLoading(true);
    getData(input)
      .then(() => setLoading(false))
      .catch((e) => {});
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
