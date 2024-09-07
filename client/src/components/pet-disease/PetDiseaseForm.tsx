import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Form/Inputs/Input";
import { TextArea } from "@/components/ui/Form/TextArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { PetDisease, PetDiseaseBodyData } from "src/@types/PetDisease";
import { z } from "zod";
import { Select } from "../ui/Form/Inputs/Select";

const petDiseaseSchema = z.object({
  name: z.string().min(1, "Tên bệnh là bắt buộc").max(60, "Tối đa 60 kí tự"),
  description: z.string().max(5000, "Tối đa 5000 kí tự").optional(),
  severity: z.enum(["Nhẹ", "Trung bình", "Nặng"], {
    errorMap: () => ({ message: "Mức độ nghiêm trọng không hợp lệ" }),
  }),
});

type PetDiseaseFormData = z.infer<typeof petDiseaseSchema>;

interface Props {
  disease?: PetDisease;
  onSubmit: (d: PetDiseaseBodyData) => Promise<void>;
  isLoading: boolean;
}

export function PetDiseaseForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PetDiseaseFormData>({
    resolver: zodResolver(petDiseaseSchema),
    defaultValues: {
      name: props.disease?.name ?? "",
      description: props.disease?.description ?? "",
      severity:
        (props.disease?.severity as "Nhẹ" | "Trung bình" | "Nặng") ?? "Nhẹ",
    },
  });

  const getSubmitButtonText = () => (props.disease ? "Cập Nhật" : "Thêm Mới");

  const handleFormSubmit: SubmitHandler<PetDiseaseFormData> = async (data) => {
    props.onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-2xl mt-4"
    >
      <div className="flex flex-col gap-4">
        <fieldset>
          <Input
            label="Tên"
            id="name"
            errorMessage={errors.name?.message}
            {...register("name")}
          />
        </fieldset>

        <fieldset>
          <TextArea
            label="Mô tả"
            id="description"
            errorMessage={errors.description?.message}
            {...register("description")}
          />
        </fieldset>

        <fieldset>
          <Select
            label="Mức độ nghiêm trọng"
            id="severity"
            errorMessage={errors.severity?.message}
            {...register("severity")}
          >
            <option value="Nhẹ">Nhẹ</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Nặng">Nặng</option>
          </Select>
        </fieldset>
      </div>

      <div className="mt-4">
        <Button type="submit" bg="submit" isLoading={props.isLoading}>
          {getSubmitButtonText()}
        </Button>
      </div>
    </form>
  );
}
