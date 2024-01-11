import { DistrictInfor } from "./SystemGroup/DistrictInfor"
import { PetInfor } from "./SystemGroup/PetInfor"
import { PriceInfor } from "./SystemGroup/PriceInfor"
import { ServiceInfor } from "./SystemGroup/ServiceInfor"

export const SysInfo = () => {
  return (
    <>
      <div className="text-3xl font-semibold">บริการของระบบ</div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <PetInfor />
        <DistrictInfor />
        <ServiceInfor />
        <PriceInfor />
      </div>
    </>
  )
}
