import { FinalStep } from "./CheckoutStep/FinalStep";
import { StepFour } from "./CheckoutStep/StepFour";
import { StepOne } from "./CheckoutStep/StepOne";
import { StepThree } from "./CheckoutStep/StepThree";
import ShippingAddressForm from "./ShippingAddress";

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
      return <ShippingAddressForm />;
    case 3:
      return <StepThree setStep={setStep} />;
    case 4:
      return (
        <StepFour
          handleBack={handleBack}
          handleContinue={handleContinue}
          setStep={setStep}
          step={step}
        />
      );
    case 5:
      return <FinalStep setStep={setStep} />;
    default:
      return null;
  }
};
