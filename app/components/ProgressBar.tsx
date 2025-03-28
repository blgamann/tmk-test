interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-[7px] rounded-none overflow-hidden bg-[#EFEFEF]">
      <div
        className="h-full bg-[#FFD351]"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}
