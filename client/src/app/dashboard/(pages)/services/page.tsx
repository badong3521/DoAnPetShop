"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageTitle } from "@/components/dashboard/PageTitle";
import {
  deletePetshopService,
  fetchPetShopServices,
  PET_SHOP_SERVICE_KEY,
} from "@/services/queries/PetshopServices";
import { parseCurrencyValueInCentsToBRL } from "@/utils/currency";
import { parseSecondsToHuman } from "@/utils/timeDuration";
import { Button } from "@/components/ui/Button";
import { PencilSimple } from "phosphor-react";
import { TooltipDescription } from "@/components/services/TooltipDescription";
import { toast } from "react-hot-toast";
import { ConfirmDeletePopover } from "@/components/ConfirmDeletePopover";
import { Table } from "@/components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { PetShopService } from "@/@types/PetshopServices";

const columnHelper = createColumnHelper<PetShopService>();

export default function Services() {
  const queryClient = useQueryClient();

  const petShopServicesListQuery = useQuery({
    queryKey: [PET_SHOP_SERVICE_KEY],
    queryFn: fetchPetShopServices,
  });

  const petshopServiceDeleteMutation = useMutation({
    mutationFn: (id: string) => deletePetshopService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PET_SHOP_SERVICE_KEY] });
      toast.success("Đã xóa dịch vụ thành công!");
    },
    onError: () => {
      toast.error("Ối. Đã xảy ra sự cố khi cố gắng xóa dịch vụ.");
    },
  });

  const columns = [
    columnHelper.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelper.display({
      header: "Tiêu đề",
      cell: (props) => (
        <div className="flex gap-2 items-center">
          {props.row.original.title}
          <TooltipDescription description={props.row.original.description} />
        </div>
      ),
    }),
    columnHelper.accessor("value", {
      cell: (info) => parseCurrencyValueInCentsToBRL(info.getValue()),
      header: "Giá tiền",
    }),
    columnHelper.accessor("duration", {
      cell: (info) => parseSecondsToHuman(info.getValue()),
      header: "Khoảng thời gian",
    }),
    columnHelper.display({
      header: "Tùy chọn",
      cell: (props) => (
        <div className="flex gap-3 w-fit">
          <Button circle tooltipText="Chỉnh sửa" asChild>
            <Link href={`/dashboard/services/${props.row.original.id}/edit`}>
              <PencilSimple className="w-6 h-6" />
            </Link>
          </Button>

          <ConfirmDeletePopover
            onConfirmDelete={() => {
              petshopServiceDeleteMutation.mutate(props.row.original.id);
            }}
          />
        </div>
      ),
    }),
  ];

  return (
    <div>
      <PageTitle title="Dịch vụ" />

      <div className="my-4">
        <Table
          data={petShopServicesListQuery.data?.services ?? []}
          columns={columns}
          asyncStatus={petShopServicesListQuery.status}
        />
      </div>

      <Button bg="accent" asChild>
        <Link href="/dashboard/services/new">Dịch vụ mới</Link>
      </Button>
    </div>
  );
}
