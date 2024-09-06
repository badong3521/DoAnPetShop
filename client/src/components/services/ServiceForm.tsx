import { Button } from "@/components/ui/Button";
import { CurrencyInput } from "@/components/ui/Form/Inputs/CurrencyInput";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { TextArea } from "@/components/ui/Form/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  maskNumberToCurrency,
  parseMaskedCurrencyValueToNumber,
} from "@/utils/currency";
import {
  parseTimeStringToDuration,
  parseSecondsToTimeDurationString,
} from "@/utils/timeDuration";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  PetShopServiceBodyData,
  PetShopService,
} from "src/@types/PetshopServices";
import { z } from "zod";

const petshopServiceSchema = z.object({
  title: z.string().min(1, "Tiêu đề và nghĩa vụ").max(60, "Tối đa 60 kí tự"),
  description: z
    .string()
    .min(1, "Mô tả và nghĩa vụ")
    .max(500, "Tối đa 500 kí tự"),
  value: z
    .string()
    .nonempty({
      message: "Giá tiền là bắt buộc",
    })
    // CurrencyInput masks the currency value, so we need to transform that string value into
    // a number for better validation
    .transform((value) => parseMaskedCurrencyValueToNumber(value))
    .pipe(
      z
        .number()
        .min(10_000, "Giá tiền tối thiểu là 10.000đ")
        .max(100_000_000, "Giá tiền tối đa là 100.000.000đ")
    )
    .transform((value) => maskNumberToCurrency(value)), // transform back to string to use it as a string
  duration: z
    .string()
    .length(8, "Thời gian là bắt buộc")
    // parses time string into seconds for validation
    .transform((value) => {
      const timeDuration = parseTimeStringToDuration(value);
      return timeDuration.asSeconds();
    })
    .pipe(z.number().min(1, "Thời gian tối thiểu là 1 giây"))
    .transform((value) => {
      // transform back to time string (HH:mm:ss) to use it as a string
      return parseSecondsToTimeDurationString(value);
    }),
});

export type PetshopServiceFormData = z.infer<typeof petshopServiceSchema>;

interface Props {
  service?: PetShopService;
  onSubmit: (d: PetShopServiceBodyData) => Promise<void>;
  isLoading: boolean;
}
export function ServiceForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetshopServiceFormData>({
    resolver: zodResolver(petshopServiceSchema),
    defaultValues: {
      title: props.service?.title ?? "",
      description: props.service?.description ?? "",
      value: props.service ? maskNumberToCurrency(props.service?.value) : "0",
      duration: parseSecondsToTimeDurationString(
        props.service?.duration ?? 3600
      ),
    },
  });

  const getSubmitButtonText = () => (props.service ? "Xác Nhận" : "Tạo Mới");

  const handleFormSubmit: SubmitHandler<PetshopServiceFormData> = async (
    data
  ) => {
    const timeDuration = parseTimeStringToDuration(data.duration);

    props.onSubmit({
      ...data,
      value: parseMaskedCurrencyValueToNumber(data.value),
      duration: timeDuration.asSeconds(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-2xl mt-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <div className="flex flex-col gap-2">
          <fieldset>
            <Input
              label="Tiêu đề"
              id="title"
              errorMessage={errors.title?.message}
              {...register("title")}
            />
          </fieldset>

          <fieldset>
            <TextArea
              label="Miêu tả"
              id="description"
              errorMessage={errors.description?.message}
              {...register("description")}
            />
          </fieldset>
        </div>

        <div className="flex flex-col gap-2">
          <fieldset>
            <Input
              label="Khoảng thời gian"
              type="time"
              step={1} // required to render seconds as well
              id="duration"
              errorMessage={errors.duration?.message}
              {...register("duration")}
            />
          </fieldset>
          <fieldset>
            <CurrencyInput
              label="Giá tiền"
              id="value"
              errorMessage={errors.value?.message}
              {...register("value")}
            />
          </fieldset>
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          {getSubmitButtonText()}
        </Button>
      </div>
    </form>
  );
}
