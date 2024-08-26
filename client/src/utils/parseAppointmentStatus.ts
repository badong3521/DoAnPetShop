import { AppointmentStatus } from "@/@types/Appointment";

const parsedAppointmentStatus: Record<AppointmentStatus, string> = {
  PENDING: "Đang chờ",
  CANCELED: "Đã huỷ",
  DONE: "Hoàn thành",
};

export const parseAppointmentStatus = (
  status: AppointmentStatus,
  { capitalize = true }: { capitalize?: boolean } = {}
) => parsedAppointmentStatus[status];
