interface PaymentChoiceGroup {
    payment: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
}
export const PaymentChoice = ({ payment, onClick }: PaymentChoiceGroup) => {
    return (
        <>
            <div className="bg-white text-xl py-8 px-16 cursor-pointer shadow-md hover:bg-slate-50"
                onClick={onClick}>
                {payment}
            </div>
        </>
    )
}
