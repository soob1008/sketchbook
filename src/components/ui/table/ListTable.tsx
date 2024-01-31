import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Link } from "react-router-dom";

export interface TableData {
  key: string;
  title: string;
  link: string;
  skill: string[];
  date: string;
}

interface ListTableProps {
  data: TableData[];
}

const columns: TableProps<TableData>["columns"] = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title, { link }) => <Link to={link}>{title}</Link>,
  },
  {
    title: "Skill",
    key: "skill",
    dataIndex: "skill",
    render: (_, { skill }) => (
      <>
        {skill.map((it) => {
          let color = it.length > 5 ? "geekblue" : "green";
          if (it === "redux") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={it}>
              {it}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const ListTable = ({ data }: ListTableProps) => {
  return <Table columns={columns} dataSource={data} />;
};

export default ListTable;