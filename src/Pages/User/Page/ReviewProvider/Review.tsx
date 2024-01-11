
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import Ratings from "./Rating"

export const Review = () => {

  return (
    <>
      <div className="bg-[#FFF8EA] ">
        <div className="container p-24 ">
          <h3 className="text-3xl mb-10">ให้คะแนน / รีวิว</h3>
          <div className="h-56 flex justify-center items-center ">
            <div className="flex flex-col ">
              <img src="" alt="" className="bg-slate-500 h-40 w-40 rounded-full mb-10" />
              <h3 className="text-lg">ผู้ให้บริการ : </h3>
            </div>
          </div>
          <div className="flex justify-center mt-10"><Ratings /></div>
          <div className="p-5"></div>
          <label htmlFor="message" className="block mb-2 text-xl font-medium text-black">Your message</label>
          <div className="flex flex-col items-end">
            <textarea rows={4} className="block p-2.5 w-full text-lg rounded-xl text-black  " placeholder="Write your thoughts here..."></textarea>
            <Buttons
              label="ตกลง"
              className="p-2 w-32 rounded-xl mt-3"
              buttonType="primary"
              onClick={() => { }}
            />
            <div className="mt-10 underline text-black cursor-pointer">
              รายงาน
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
