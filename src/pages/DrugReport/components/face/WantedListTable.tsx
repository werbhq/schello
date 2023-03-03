import { useWantedData } from "../../../../hooks/useWantedList";
import FACE_DATA from "./FaceData";
import { Table, Image, Input, Space, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { WantedListCustom } from "../../../../api/wanted_list";
import { Report } from "../../../../types/Report";
import { CheckOutlined } from "@ant-design/icons";

export default function WantedListTable({
  wantedPersonId,
  setWantedPersonId,
}: {
  wantedPersonId: Report["wantedPersonId"];
  setWantedPersonId: React.Dispatch<
    React.SetStateAction<Report["wantedPersonId"]>
  >;
}) {
  const { data, isLoading } = useWantedData();
  const [dataSource, setDataSource] = useState<WantedListCustom[]>([]);

  useEffect(() => {
    setDataSource(data ?? []);
  }, [data]);

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      onChange={(e) => {
        const currValue = e.target.value as string;

        if (currValue === "") {
          setDataSource(data ?? []);
          return;
        }

        const filteredData = (data ?? []).filter((e) =>
          e.name.toLowerCase().includes(currValue.toLowerCase())
        );
        setDataSource(filteredData);
      }}
      onKeyDown={(e) => {
        if (e.code === "Enter") e.preventDefault();
      }}
    />
  );

  const columns: ColumnsType<WantedListCustom> = [
    {
      dataIndex: "photoUrl",
      title: "Photo",
      width: 80,
      render: (value) => <Image height={60} width={60} src={value} />,
    },
    {
      dataIndex: "name",
      title: FilterByNameInput,
      width: 150,
      render: (value, record) => {
        const selected = record.id === wantedPersonId;
        return (
          <Space direction="vertical">
            {value}
            <Button
              type="primary"
              size="small"
              icon={selected ? <CheckOutlined /> : null}
              shape="round"
              style={{
                backgroundColor: selected ? "green" : undefined,
              }}
              onClick={() => {
                if (!selected) setWantedPersonId(record.id);
                else setWantedPersonId(null);
              }}
            >
              {selected ? "Selected" : "Select"}
            </Button>
          </Space>
        );
      },
    },
    {
      dataIndex: "age",
      title: "Age",
      width: 100,
      sorter: (a, b) => a["age"] - b["age"],
    },
    ...Array.from(FACE_DATA.keys()).map((e) => ({
      dataIndex: e,
      title: FACE_DATA.get(e)?.label,
      width: 80,
      filters:
        FACE_DATA.get(e)
          ?.data.map((_e) => ({
            text: _e.label,
            value: _e.value,
          }))
          .filter((e) => e.value !== "NONE") ?? [],
      onFilter: (value: any, record: any) => record[e] === value,
    })),
  ];

  return (
    <div style={{ width: "80vw" }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered={true}
        size="small"
        loading={isLoading}
        scroll={{ y: 300 }}
        pagination={{
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
        }}
      />
    </div>
  );
}
