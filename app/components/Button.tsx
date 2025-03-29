interface ButtonProps {
  children: React.ReactNode;
  activated: boolean;
  onClick?: () => void;
}

export default function Button({ children, activated, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[70px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-pointer ${
        activated ? "bg-[#FFD351]" : "bg-[#DDDDDD]"
      }`}
    >
      {children}
    </button>
  );
}
