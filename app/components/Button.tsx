export default function Button({ children }: { children: React.ReactNode }) {
  const activated = false;

  return (
    <button
      className={`w-full h-[70px] rounded-[6px] text-black text-center text-[22px] font-semibold cursor-pointer ${
        activated ? "bg-[#FFD351]" : "bg-[#DDDDDD]"
      }`}
    >
      {children}
    </button>
  );
}
