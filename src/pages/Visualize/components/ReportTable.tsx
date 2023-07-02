import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { InputReport } from "types/Report";
import dayjs from "dayjs";

const columns: GridColDef<InputReport>[] = [
  {
    field: "dateIncident",
    headerName: "Incident Date",
    width: 120,
    valueGetter: (params) => dayjs(params.value).format("D MMM YYYY"),
  },
  {
    field: "timeFrom",
    headerName: "Time From",
    width: 100,
    valueGetter: (params) => dayjs(params.value).format("hh:mm A"),
  },
  {
    field: "timeTo",
    headerName: "Time To",
    width: 100,
    valueGetter: (params) => dayjs(params.value).format("hh:mm A"),
  },
  {
    field: "category",
    headerName: "Category",
    width: 200,
    sortable: false,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    sortable: false,
  },
  {
    field: "location",
    headerName: "Location",
    width: 180,
    sortable: false,
  },
  {
    field: "facialData",
    headerName: "Face Data",
    width: 180,
    sortable: false,
  },
];

export default function ReportTable(props: { reports: InputReport[] }) {
  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={props.reports.map((e, index) => ({ ...e, id: index }))}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[5, 20, 50, 100]}
        isRowSelectable={() => false}
      />
    </div>
  );
}
