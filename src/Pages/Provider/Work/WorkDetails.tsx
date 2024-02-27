interface WorkDetailsProps {
    title: string;
    value?: string | number | null;
    values?: string[] ;
}

export const WorkDetails = ({ title, value , values}: WorkDetailsProps) => {
    return (
        <div className="text-lg flex gap-x-1">
            <p className="font-semibold">{title}</p>
            <p className="text-gray-500">
                {value ?(<>{value}</>):(<>{values}</>)}
            </p>
        </div>
    )
}
