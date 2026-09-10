import React from 'react';
import { User, Camera, UserPlus } from 'lucide-react';

export const AvatarPlaceholder = ({ name = '', size = 'md', className = '' }) => {
  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
  };

  const sizes = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-12 h-12 text-sm',
    xl: 'w-16 h-16 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const badgeSizes = {
    sm: 'w-3.5 h-3.5 -bottom-0.5 -right-0.5',
    md: 'w-4 h-4 -bottom-0.5 -right-0.5',
    lg: 'w-5 h-5 bottom-0 right-0',
    xl: 'w-6 h-6 bottom-0.5 right-0.5'
  };

  const badgeIconSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5'
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClass} ${className}`}>
      {/* Base Avatar Circle */}
      <div className={`w-full h-full rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center font-bold text-zinc-300 shadow-inner overflow-hidden`}>
        {name ? (
          <span className="tracking-wider">{getInitials(name)}</span>
        ) : (
          <User className={`${iconSizes[size] || 'w-4 h-4'} text-zinc-400`} />
        )}
      </div>

      {/* "Add Photo" Icon Badge */}
      <div 
        title="Add/Upload Photo" 
        className={`absolute ${badgeSizes[size] || badgeSizes.md} rounded-full bg-indigo-600 text-white border border-black flex items-center justify-center shadow-md hover:bg-indigo-500 transition-colors cursor-pointer`}
      >
        <Camera className={badgeIconSizes[size] || badgeIconSizes.md} />
      </div>
    </div>
  );
};
