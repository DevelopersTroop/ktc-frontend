import { TInventoryItem } from "@/types/product";

import useYmm from "@/hooks/use-ymm";
import { YmmSelector } from "../collections/product/[singleProduct]/_wheels/ymm";

type NormalActionButtonProps = {
  tire: TInventoryItem;
  wheel: TInventoryItem;
};

export const Ymm: React.FC<NormalActionButtonProps> = ({ tire, wheel }) => {
  const ymm = useYmm();
  return (
    <div className="flex flex-col gap-y-4">
      <YmmSelector ymm={ymm} />
    </div>
  );
};
