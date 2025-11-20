import StripeProvider from "@/context/StripeProvider";
import { FinalStep } from "./CheckoutStep/FinalStep";
import { StepOne } from "./CheckoutStep/StepOne";
import { StepTwo } from "./CheckoutStep/StepTwo";

interface RendererProps {
  step: number;
  setStep: (step: number) => void;
}
export const Renderer: React.FC<RendererProps> = ({ step, setStep }) => {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (step < 3) {
      setStep(step + 1);
    }
  };
  switch (step) {
    case 1:
      return <StepOne handleContinue={handleContinue} setStep={setStep} />;
    case 2:
      return (
        <StripeProvider>
          <StepTwo
            handleBack={handleBack}
            handleContinue={handleContinue}
            setStep={setStep}
            step={step}
          />
        </StripeProvider>
      );
    case 3:
      return <FinalStep />;
    default:
      return null;
  }
};
