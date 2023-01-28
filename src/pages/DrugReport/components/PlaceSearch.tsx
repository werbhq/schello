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
  const previousController = React.useRef<AbortController>();

  const getData = (searchTerm: string) => {
    if (previousController.current) {
      previousController.current.abort();
      setLoading(false);
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    const search = searchTerm.replace(" ", "+");

    setLoading(true);

    try {
      fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${search}&accept-language=en&countrycodes=IN&format=jsonv2`,
        {
          signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          const updatedOptions = json.map(
            ({ display_name, place_id, lat, lon }: MapAPIResponse) => {
              return { title: display_name, id: place_id, lat, lon };
            }
          );
          setOptions(updatedOptions);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData(input);
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
