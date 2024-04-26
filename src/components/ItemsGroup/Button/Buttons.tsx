import { ReactNode, useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  buttonType?: 'primary' | 'secondary' | 'success' | 'danger' | 'edit';
  color?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const Colors: Record<string, string> = {
  primary: '#815B5B',
  secondary: '#8A8178',
  success: '#239B56',
  danger: '#B03A2E',
  edit: '#F1C40F',
};

const Buttons = ({ label, onClick, className, buttonType, color, icon }: ButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const buttonColor = color || (buttonType ? Colors[buttonType] : '');

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <button
      className={`${className} font-kanit`}
      style={{
        backgroundColor: hovered ? (buttonType === 'primary' ? '#a57777' :
                             buttonType === 'secondary' ? '#a89e94' :
                             buttonType === 'success' ? '#28B463' :
                             buttonType === 'danger' ? '#CB4335' :
                             buttonType === 'edit' ? '#F4D03F' : Colors[buttonType || '']) : buttonColor,
        borderColor: hovered ? (buttonType ? Colors[buttonType] : '') : '',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
};

export default Buttons;
