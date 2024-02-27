interface AdminWorkDetailsProps {
    id?: number;
    title?: string;
    subtitle?: string | number;
}

export const AdminWorkDetails = ({title, subtitle}:AdminWorkDetailsProps) => {
    return (
        <>
            <div className="flex gap-x-1">
                <p className="font-semibold pb-1">{title}</p>
                <p>{subtitle}</p>
            </div>
        </>
    )
}
