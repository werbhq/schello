import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Report } from "../../../types/Report";
import dayjs from "dayjs";

const columns: GridColDef<Report>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
  },
  {
    field: "dateIncident",
    headerName: "Incident Date",
    width: 100,
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
    width: 200,
    sortable: false,
  },
  {
    field: "studentId",
    headerName: "Student ID",
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

export default function ReportTable(props: { reports: Report[] }) {
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
