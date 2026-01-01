import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
  return (
    <div className={`max-w-4xl mx-auto px-6 py-12 md:py-16 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
