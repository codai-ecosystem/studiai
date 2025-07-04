import React from 'react';

import { PolicySectionProps } from '@/types';
// ...existing code...

export function PolicySection({ title, children }: PolicySectionProps) {
  return (
    <>
      <h2 className="text-2xl font-semibold mt-8 mb-4">{title}</h2>
      {children}
    </>
  );
}

import { PolicySubsectionProps } from '@/types';
// ...existing code...

export function PolicySubsection({ title, children }: PolicySubsectionProps) {
  return (
    <>
      <h3 className="text-xl font-medium mt-6 mb-2">{title}</h3>
      {children}
    </>
  );
}

import { PolicyListProps } from '@/types';
// ...existing code...

export function PolicyList({ items, type = 'disc' }: PolicyListProps) {
  const listClass = type === 'disc' ? 'list-disc pl-6 mb-4' : 'list-none mb-4';

  return (
    <ul className={listClass}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function PolicyParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>;
}

const PolicyContent = {
  Section: PolicySection,
  Subsection: PolicySubsection,
  List: PolicyList,
  Paragraph: PolicyParagraph,
};

export default PolicyContent;
