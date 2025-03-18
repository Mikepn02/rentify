import CreateAgentModal from "@/components/modal/CreateAgentModal";
import { DataTable } from "@/components/table/PaginatedTable";
import { ColumnDef } from "@tanstack/react-table";

type Agent = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const agentData: Agent[] = [
  { id: "a1", name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
  { id: "a2", name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210" },
];

export const agentColumns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
];

export default function DashboardAgent() {
  return <DataTable data={agentData} columns={agentColumns} filterPlaceholder="Filter agents..."  addNewComponent={<CreateAgentModal />} />;
}