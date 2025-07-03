import { cn } from "@/lib/utils";

interface IFlexProps extends React.PropsWithChildren {
  type?: "row" | "column";
  gap?: number | string;
}
export const Flex: React.FC<IFlexProps> = ({
  children,
  type = "row",
  gap = 16,
}) => {
  return (
    <div
      style={{
        rowGap: gap,
        columnGap: gap,
      }}
      className={cn(
        "flex",
        type === "row" ? "flex-col md:flex-row" : "flex-col",
      )}
    >
      {children}
    </div>
  );
};
