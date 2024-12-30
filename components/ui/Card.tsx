import React from 'react';

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return (
    <div className={`border rounded-lg p-4 shadow-md ${className}`}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return (
    <div className={`border-b pb-2 mb-4 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return (
    <h2 className={`text-lg font-bold ${className}`}>
      {children}
    </h2>
  );
};

const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => {
  return (
    <div className={`border-t pt-2 mt-4 ${className}`}>
      {children}
    </div>
  );
};

export { CardHeader, CardTitle, CardContent, CardFooter };
export default Card; 