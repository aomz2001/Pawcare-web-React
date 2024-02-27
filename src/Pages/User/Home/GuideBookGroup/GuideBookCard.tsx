interface GuideBookCardProps {
    detail: GuideBookProps;
}

export interface GuideBookProps {
    id: number;
    img: JSX.Element | null;
    title: string | null;
    subtitle: string | null;
}

export const GuideBookCard = ({ detail }: GuideBookCardProps) => {
    return (
        <>
            {/* Molecule */}
            <div className="">
                {/* atomic header */}
                <div className="bg-[#D9D9D9] max-w-[245px] h-[245px] rounded-full z-10 shadow-md">
                    <div className="absolute h-20 w-20 bg-[#7B6161] rounded-full pl-[30px] pt-[20px] text-3xl text-white">{detail.id}</div>
                    <div className="flex justify-center pt-16">
                        {detail.img}
                    </div>
                </div>
                {/* Atommic Body */}
                <div className="pt-[13px] px-4">
                    <h3 className='text-3xl text-white py-3'>{detail.title}</h3>
                    <p className=''>{detail.subtitle}</p>
                </div>
            </div>
        </>
    )
}