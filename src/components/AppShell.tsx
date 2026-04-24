import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <div className="relative min-h-full w-full overflow-hidden flex items-stretch sm:items-center justify-center px-0 sm:px-6 lg:px-10 py-0 sm:py-8">
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        <div className="absolute left-[8%] top-[10%] h-52 w-52 rounded-full bg-coral-200/70 blur-3xl" />
        <div className="absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-sage-200/70 blur-3xl" />
        <div className="absolute bottom-[8%] left-[18%] h-64 w-64 rounded-full bg-coral-100/80 blur-3xl" />
      </div>

      <div
        className="
          relative flex flex-col
          w-full sm:w-[430px] sm:h-[880px] sm:max-h-[calc(100vh-4rem)]
          bg-cream/95 backdrop-blur
          overflow-hidden
          sm:rounded-[2.75rem] sm:shadow-float
          border border-coral-100/70
        "
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/45 to-transparent" />
        {children}
      </div>
    </div>
  );
}
