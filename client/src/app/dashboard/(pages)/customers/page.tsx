"use client";

import { PageTitle } from "@/components/dashboard/PageTitle";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import {
  CUSTOMER_KEY,
  deleteCustomer,
  fetchCustomers,
} from "@/services/queries/Customer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { PencilSimple, TrashSimple } from "phosphor-react";
import { Customer } from "@/@types/Customer";
import { ConfirmDeletePopover } from "@/components/ConfirmDeletePopover";
import toast from "react-hot-toast";
import axios from "axios";
import { APIError } from "@/@types/API";
import { patternFormatter } from "react-number-format";
import {
  cellPhonePattern,
  removeCountryCodeAnd9FromRawPhone,
} from "@/utils/phoneNumber";
import { useSessionStore } from "@/stores/session";

const columnHelper = createColumnHelper<Customer>();

export default function Customers() {
  const queryClient = useQueryClient();
  const [user] = useSessionStore((state) => [state.user, state.signOut]);

  const customersListQuery = useQuery({
    queryKey: [CUSTOMER_KEY],
    queryFn: () => fetchCustomers(user?.id || ""),
  });

  const deleteCustomerMutation = useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      toast.success("Đã xóa khách hàng thành công");
      queryClient.invalidateQueries([CUSTOMER_KEY]);
    },
    onError: (err) => {
      if (
        axios.isAxiosError(err) &&
        (err.response?.data as APIError).name === "InvalidDeleteOperation"
      ) {
        toast.error("Không thể xóa khách hàng vì đã có lịch hẹn.");
      } else {
        toast.error("Ối. Đã xảy ra sự cố khi cố xóa ứng dụng khách.");
      }
    },
  });

  const columns = [
    columnHelper.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Tên",
    }),
    columnHelper.accessor("phone", {
      cell: (info) =>
        patternFormatter(info.getValue(), {
          format: cellPhonePattern,
          patternChar: "#",
        }),
      header: "Số điện thoại",
    }),
    columnHelper.accessor("pets", {
      cell: (info) => info.getValue().length,
      header: "Số lượng thú cưng",
    }),
    columnHelper.display({
      header: "Tuỳ chọn",
      cell: (props) => (
        <div className="flex gap-3">
          <Button circle tooltipText="Chỉnh sửa" asChild>
            <Link href={`/dashboard/customers/${props.row.original.id}/edit`}>
              <PencilSimple className="w-6 h-6" />
            </Link>
          </Button>
          <ConfirmDeletePopover
            onConfirmDelete={() =>
              deleteCustomerMutation.mutate(props.row.original.id)
            }
          />
        </div>
      ),
    }),
  ];

  return (
    <div>
      <PageTitle title="Khách hàng" />
      <div className="my-4">
        <Table
          data={customersListQuery.data?.customers ?? []}
          columns={columns}
          asyncStatus={customersListQuery.status}
        />
      </div>

      <Button bg="accent" asChild>
        <Link href={"/dashboard/customers/new"}>Khách hàng mới</Link>
      </Button>
    </div>
  );
}
