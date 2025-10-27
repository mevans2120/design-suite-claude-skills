'use client';

import { useState, useEffect } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Arrow key navigation
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
        let newIndex: number;

        if (e.key === 'ArrowRight') {
          newIndex = (currentIndex + 1) % tabs.length;
        } else {
          newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        }

        onTabChange(tabs[newIndex].id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, tabs, onTabChange]);

  return (
    <div className="border-b border-[var(--color-border)] mb-8">
      <nav className="-mb-px flex gap-6" role="tablist" aria-label="Project sections">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2 rounded-sm ${
                isActive
                  ? 'border-[var(--color-brand)] text-[var(--color-brand)]'
                  : 'border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
