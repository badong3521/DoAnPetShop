import Image from "next/image";
import pretitleImg from "@/public/img/hero/pretitle-img.svg";
import { PetDisease } from "@/@types/PetDisease";
import Link from "next/link";

export default function CardPetCare({
  id,
  name,
  severity,
}: Omit<PetDisease, "createdAt" | "updatedAt">) {
  return (
    <Link
      href={{
        pathname: `/pet-care/${id}`,
        query: { id },
      }}
      key={id}
      className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-orange-300 rounded-2xl p-5 transition-all duration-300 hover:border-orange-600"
    >
      <div className="flex items-center mb-6">
        <Image
          src={pretitleImg}
          layout="responsive"
          alt="Imagepetcare"
          className="rounded-lg w-full object-cover"
        />
      </div>
      <div className="block">
        <h4 className="text-gray-900 font-medium leading-8 mb-9">{name}</h4>
        <div className="flex items-center justify-between font-medium">
          <h6 className="text-sm text-gray-500">PetCare</h6>
          <span className="text-sm text-orange-600">{severity}</span>
        </div>
      </div>
    </Link>
  );
}
