interface PortfolioDividerProps {
  title: string;
  description?: string;
}

export const PortfolioDivider = ({ title, description }: PortfolioDividerProps) => {
  return (
    <div className="w-full my-12 flex flex-col items-start">
      <h2 className="text-3xl font-semibold text-foreground mb-2">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-4 max-w-2xl">{description}</p>
      )}
      <hr className="w-full border-t border-whimsical-border/50" />
    </div>
  );
};
