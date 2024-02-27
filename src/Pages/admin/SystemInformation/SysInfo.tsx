import { DistrictInfor } from "./SystemGroup/DistrictInfor"
import { PetInfor } from "./SystemGroup/PetInfor"
import { ServiceInfor } from "./SystemGroup/ServiceInfor"

export const SysInfo = () => {
  return (
    <>
      <div className="text-3xl font-semibold">บริการของระบบ</div>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        <PetInfor />
        <DistrictInfor />
        <ServiceInfor />
      </div>
    </>
  )
}
