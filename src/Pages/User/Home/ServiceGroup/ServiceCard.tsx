interface ServiceCardGroupProps {
    detail: ServiceCardGroup;
}

export interface ServiceCardGroup {
    id: number;
    img: JSX.Element | null;
    title: string | null;
    subtitle: string | null;
    color: string | null;
}

export const ServiceCard = ({ detail }: ServiceCardGroupProps) => {
    return (
        <>
        {detail.img ? (
            <>
                {detail.img}
            </>
        ) : (
            <div className={`bg-[${detail.color}] p-10 shadow-md`}>
                <h2 className='text-3xl pb-6'>{detail.title}</h2>
                <p className=''>{detail.subtitle}</p>
            </div>
        )}
        </>
    )
}
