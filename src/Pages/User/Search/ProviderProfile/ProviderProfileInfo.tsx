interface ProviderProfileInfoProps {
    title: string;
    subtitle?: string | number;
    detail?: string;
    comment?: JSX.Element;
}
export const ProviderProfileInfo = ({ title, subtitle, detail, comment }: ProviderProfileInfoProps) => {
    return (
        <>
            <div className="text-2xl mb-3">
                {title}{subtitle}
            </div>
            {detail ? (
                <div className="bg-white p-6 flex flex-col gap-2 border-stone-200 border-[1px] rounded-3xl mb-3">
                    {detail}
                </div>
            ) : (
                <div className="h-96 bg-white border-stone-200 border-[1px] rounded-3xl hover:overflow-y-auto overflow-hidden">
                    <div className="p-5 ">{comment}</div>
                </div>
            )}
        </>
    )
}
