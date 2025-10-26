import { cn } from '@/lib/utils';
import { ProjectStatus } from '@/types/project';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const statusStyles: Record<ProjectStatus, string> = {
  research: 'bg-[rgba(124,58,237,0.125)] text-[#a78bfa]',
  concepts: 'bg-[rgba(37,99,235,0.125)] text-[#60a5fa]',
  production: 'bg-[rgba(245,158,11,0.125)] text-[#fbbf24]',
  qa: 'bg-[rgba(16,185,129,0.125)] text-[#34d399]',
  complete: 'bg-[rgba(107,114,128,0.125)] text-[#9ca3af]',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'px-3 py-1 rounded-xl text-xs font-medium capitalize',
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}
