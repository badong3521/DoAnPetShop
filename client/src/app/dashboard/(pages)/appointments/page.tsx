"use client";
import { Appointment, AppointmentStatus } from "@/@types/Appointment";
import { PageTitle } from "@/components/dashboard/PageTitle";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Form/Inputs/Select";
import { Label } from "@/components/ui/Form/Label";
import { Table } from "@/components/ui/Table";
import {
  APPOINTMENT_KEY,
  deleteAppointmentStatus,
  fetchAppointments,
} from "@/services/queries/Appointment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PaginationState,
  SortingState,
  createColumnHelper,
} from "@tanstack/react-table";
import { parseAppointmentStatus } from "@/utils/parseAppointmentStatus";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Funnel, PencilSimple } from "phosphor-react";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat";
import { z } from "zod";
import { useEffect, useState } from "react";
import { isFetchingWithPreviousData } from "@/utils/isFetchingWithPreviousData";
import { parseSortingStateToSortingParams } from "@/utils/parseSortingStateToSortingParams";
import { ConfirmDeletePopover } from "@/components/ConfirmDeletePopover";
import { CUSTOMER_KEY, deleteCustomer } from "@/services/queries/Customer";
import toast from "react-hot-toast";
import axios from "axios";
import { APIError } from "@/@types/API";
import { deletePetshopService } from "@/services/queries/PetshopServices";

dayjs.extend(customParseFormatPlugin);

const columnHelper = createColumnHelper<Appointment>();

const DATE_INPUT_FORMAT = "YYYY-MM-DDTHH:mm";

export default function Appointments() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const deleteAppointmentMutation = useMutation({
    mutationFn: (id: string) => deleteAppointmentStatus(id),
    onSuccess: () => {
      toast.success("Đã xóa cuộc hẹn thành công");
      queryClient.invalidateQueries([CUSTOMER_KEY]);
    },
    onError: (err) => {
      console.log("err", err);

      if (
        axios.isAxiosError(err) &&
        (err.response?.data as APIError).name === "InvalidDeleteOperation"
      ) {
        // toast.error("Không thể xóa khách hàng vì đã có lịch hẹn.");
      } else {
        toast.error("Ối. Đã xảy ra sự cố khi cố xóa cuộc hẹn khách.");
      }
    },
  });

  const columns = [
    columnHelper.display({
      cell: (props) => props.row.index + 1,
      id: "row-number",
    }),
    columnHelper.accessor("appointmentTime", {
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY - HH:mm"),
      enableSorting: true,
      header: "Thời gian",
    }),
    columnHelper.display({
      header: "Pet",
      cell: (props) => (
        <Link
          className="link tooltip"
          data-tip={"Thú cưng"}
          href={`/dashboard/customers/${props.row.original.pet.ownerId}/edit`}
        >
          {props.row.original.pet.name}
        </Link>
      ),
    }),
    columnHelper.display({
      header: "Dịch vụ",
      cell: (props) => (
        <Link
          className="link tooltip"
          data-tip={"Xem dịch vụ"}
          href={
            props.row.original.service
              ? `/dashboard/services/${props.row.original.service.id}/edit`
              : ""
          }
        >
          {props.row.original.service?.title}
        </Link>
      ),
    }),
    columnHelper.accessor("status", {
      cell: (info) => parseAppointmentStatus(info.getValue()),
      enableSorting: true,
      header: "Trạng thái",
    }),
    columnHelper.display({
      header: "Hành động",
      cell: (props) => (
        <div className="flex gap-3">
          <Button circle tooltipText="Chỉnh sửa" asChild>
            <Link
              href={`/dashboard/appointments/${props.row.original.id}/edit`}
            >
              <PencilSimple className="w-6 h-6" />
            </Link>
          </Button>
          <ConfirmDeletePopover
            onConfirmDelete={() =>
              deleteAppointmentMutation.mutate(props.row.original.id)
            }
          />
        </div>
      ),
    }),
  ];

  const date = parseDateParam();
  const status = parseStatusParam();
  const paginationParams = parsePaginationParams();
  const sortingParams = parseSortingParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: paginationParams.pageIndex,
    pageSize: paginationParams.pageSize,
  });
  const [sorting, setSorting] = useState<SortingState>(sortingParams);

  const startTimestamp =
    date !== undefined ? dayjs(date).toISOString() : undefined; // value sent to the query
  const endTimestamp =
    date !== undefined ? dayjs(date).endOf("day").toISOString() : undefined; // value sent to the query
  const appointmentsListQuery = useQuery({
    queryKey: [APPOINTMENT_KEY, startTimestamp, status, pagination, sorting],
    queryFn: () =>
      fetchAppointments({
        startDate: startTimestamp,
        endDate: endTimestamp,
        status: status,
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        ...parseSortingStateToSortingParams(sorting),
      }),
    keepPreviousData: true,
  });

  // update pagination URL params
  useEffect(() => {
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    );
    params.set("page", (pagination.pageIndex + 1).toString());
    params.set("pageSize", pagination.pageSize.toString());

    changeQueryParams(params.toString());
  }, [pagination]);

  // update pagination URL params
  useEffect(() => {
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    );
    if (sorting.length === 0) {
      params.delete("sortBy");
      params.delete("sortOrder");
    } else {
      params.set("sortBy", sorting[0].id);
      params.set("sortOrder", sorting[0].desc ? "desc" : "asc");
    }

    changeQueryParams(params.toString());
  }, [sorting]);

  function changeQueryParams(params: string) {
    router.replace("/dashboard/appointments?" + params);
  }

  function parseDateParam() {
    const dateParam = searchParams.get("date");
    const validDateParam = dayjs(dateParam, DATE_INPUT_FORMAT, true).isValid();
    if (validDateParam) {
      return dateParam as string;
    }
    return undefined;
  }

  function parseStatusParam() {
    const statusParam = searchParams.get("status");

    const appointmentStatusSchema = z.nativeEnum(AppointmentStatus);
    const validStatusParam =
      appointmentStatusSchema.safeParse(statusParam).success;

    if (validStatusParam) {
      return statusParam as AppointmentStatus;
    }
    return undefined;
  }

  function parsePaginationParams(): PaginationState {
    const pageParam = searchParams.get("page");
    const pageSizeParam = searchParams.get("pageSize");

    const paginationValidator = z.coerce.number().min(1);

    const validPageParam = paginationValidator.safeParse(pageParam).success;
    const validPageSizeParam =
      paginationValidator.safeParse(pageSizeParam).success;

    return {
      pageIndex: validPageParam ? Number(pageParam) - 1 : 0, // default pagination index = 0
      pageSize: validPageSizeParam ? Number(pageSizeParam) : 10, // default pagination size = 10
    };
  }

  function parseSortingParams(): SortingState {
    const SORTABLE_COLUMNS = ["appointmentTime", "status"] as const;

    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");

    const sortByValidator = z.enum(SORTABLE_COLUMNS);

    const validSortByParam = sortByValidator.safeParse(sortByParam).success;

    if (validSortByParam) {
      return [
        {
          id: sortByParam!,
          desc: sortOrderParam === "desc",
        },
      ];
    }
    return [];
  }

  function handleChangeDate(date: string) {
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    );
    params.set("date", date);

    changeQueryParams(params.toString());
  }

  function handleIncrementDate(increment: -1 | 1) {
    const newDate = dayjs(date).add(increment, "day").format(DATE_INPUT_FORMAT);
    handleChangeDate(newDate);
  }

  function handleChangeStatus(status: AppointmentStatus | "") {
    const params = new URLSearchParams(
      searchParams as unknown as URLSearchParams
    );
    params.set("status", status);

    changeQueryParams(params.toString());
  }

  return (
    <div>
      <PageTitle title="Cuộc hẹn" />
      <div className="flex my-4 flex-col items-center lg:flex-row lg:items-start">
        <div className="prose w-fit">
          <h3 className="flex items-center gap-2 w-40">
            <Funnel size={16} weight="fill" /> Bộ lọc
          </h3>

          <div>
            <Label htmlFor="date">Dữ liệu</Label>
            <div className="flex items-center justify-center">
              <Button bg="ghost" circle onClick={() => handleIncrementDate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <input
                type="datetime-local"
                className="input input-bordered"
                required
                id="date"
                value={date ?? ""}
                onChange={(e) => handleChangeDate(e.target.value)}
              />
              <Button bg="ghost" circle onClick={() => handleIncrementDate(1)}>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <Select
              value={status ?? ""}
              name="status"
              id="status"
              onChange={(e) =>
                handleChangeStatus(e.target.value as AppointmentStatus)
              }
              label="Trạng thái"
            >
              <option value="">-</option>
              <option value={AppointmentStatus.PENDING}>Chưa giải quyết</option>
              <option value={AppointmentStatus.CANCELED}>Đã hủy</option>
              <option value={AppointmentStatus.DONE}>Hoàn thành</option>
            </Select>
          </div>
        </div>

        <div className="divider lg:divider-horizontal divider-accent"></div>

        <div className="w-full">
          <Table
            data={appointmentsListQuery.data?.appointments ?? []}
            columns={columns}
            asyncStatus={appointmentsListQuery.status}
            pagination={{
              state: pagination,
              setState: setPagination,
            }}
            lastPage={appointmentsListQuery.data?.meta.lastPage}
            sorting={{
              state: sorting,
              setState: setSorting,
            }}
            isFetchingWithPreviousData={isFetchingWithPreviousData(
              appointmentsListQuery.isFetching,
              appointmentsListQuery.isPreviousData
            )}
          />
        </div>
      </div>

      <div className="my-4">
        <Button bg="accent" asChild>
          <Link href={"/dashboard/appointments/new"}>Lịch cuộc hẹn mới</Link>
        </Button>
      </div>
    </div>
  );
}
