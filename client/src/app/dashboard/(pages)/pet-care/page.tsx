"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageTitle } from "@/components/dashboard/PageTitle";
import {
  deletePetDisease,
  fetchPetDiseases,
  PET_DISEASE_KEY,
} from "@/services/queries/PetDiseases";
import { Button } from "@/components/ui/Button";
import { PencilSimple } from "phosphor-react";
import { TooltipDescription } from "@/components/services/TooltipDescription";
import { toast } from "react-hot-toast";
import { ConfirmDeletePopover } from "@/components/ConfirmDeletePopover";
import { Table } from "@/components/ui/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { PetDisease } from "@/@types/PetDisease";

const columnHelper = createColumnHelper<PetDisease>();

export default function PetDiseases() {
  const queryClient = useQueryClient();

  const petDiseasesListQuery = useQuery({
    queryKey: [PET_DISEASE_KEY],
    queryFn: fetchPetDiseases,
  });

  const petDiseaseDeleteMutation = useMutation({
    mutationFn: (id: string) => deletePetDisease(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PET_DISEASE_KEY] });
      toast.success("Đã xóa thành công!");
    },
    onError: () => {
      toast.error("Ối. Đã xảy ra sự cố khi cố gắng xóa.");
    },
  });

  const columns = [
    columnHelper.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelper.accessor("name", {
      header: "Tên",
      cell: (props) => (
        <div className="flex gap-2 items-center">
          {props.getValue()}
          <TooltipDescription
            description={props.row.original.description || ""}
          />
        </div>
      ),
    }),
    columnHelper.accessor("severity", {
      header: "Mức độ nghiêm trọng",
    }),
    columnHelper.display({
      header: "Tùy chọn",
      cell: (props) => (
        <div className="flex gap-3 w-fit">
          <Button circle tooltipText="Chỉnh sửa" asChild>
            <Link href={`/dashboard/pet-care/${props.row.original.id}/edit`}>
              <PencilSimple className="w-6 h-6" />
            </Link>
          </Button>

          <ConfirmDeletePopover
            onConfirmDelete={() => {
              petDiseaseDeleteMutation.mutate(props.row.original.id);
            }}
          />
        </div>
      ),
    }),
  ];

  return (
    <div>
      <PageTitle title="Pet Care" />
      <div className="my-4">
        <Table
          data={petDiseasesListQuery.data?.petDiseases ?? []}
          columns={columns}
          asyncStatus={petDiseasesListQuery.status}
        />
      </div>
      <Button bg="accent" asChild>
        <Link href="/dashboard/pet-care/new">Thêm mới</Link>
      </Button>
    </div>
  );
}
