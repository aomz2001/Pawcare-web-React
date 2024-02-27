interface ConditionCardDetailGroupProps {
    detail: ConditionCardDetailGroup;
}

export interface ConditionCardDetailGroup {
    id: number;
    title: string | null;
    subtitle: JSX.Element | null;
}

export const ConditionCardDetail = ({ detail }: ConditionCardDetailGroupProps) => {
    return (
        <>
            <p className="font-semibold p-6 ">{detail.title}</p>
            <ol className="list-decimal pl-16">
                {detail.subtitle}
            </ol>
        </>
    )
}
