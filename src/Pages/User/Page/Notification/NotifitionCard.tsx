interface NotifitionCardProps {
    title: string;
    subtitle: string | number;
}

export const NotifitionCard = ({ title, subtitle }: NotifitionCardProps) => {
    return (
        <div className="flex gap-x-1">
            <p className="font-semibold">{title}</p>
            <p>{subtitle}</p>
        </div>
    )
}
