import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'orange' | 'red' | 'blue' | 'gray';
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'gray',
  variant = 'solid',
  size = 'md',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap';
  
  const colorVariants = {
    solid: {
      green: 'bg-green-100 text-green-800',
      orange: 'bg-orange-100 text-orange-800',
      red: 'bg-red-100 text-red-800',
      blue: 'bg-blue-100 text-blue-800',
      gray: 'bg-gray-100 text-gray-800',
    },
    outline: {
      green: 'bg-transparent text-green-600 border border-green-600',
      orange: 'bg-transparent text-orange-600 border border-orange-600',
      red: 'bg-transparent text-red-600 border border-red-600',
      blue: 'bg-transparent text-blue-600 border border-blue-600',
      gray: 'bg-transparent text-gray-600 border border-gray-600',
    },
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
  };
  
  const classes = `
    ${baseClasses}
    ${colorVariants[variant][color]}
    ${sizeClasses[size]}
    ${className}
  `;
  
  return <span className={classes}>{children}</span>;
};

export default Badge;