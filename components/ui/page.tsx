import classNames from "classnames";
import React from "react";
type PageProps = {
  loading?: boolean;
  children: React.ReactNode;
};

const Page: React.FC<PageProps> = ({ children, loading }) => {
  if (loading) {
    return (
      <main className="mt-8 pb-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <Spinner />
        </div>
      </main>
    );
  }
  return (
    <main className="mt-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">{children}</div>
    </main>
  );
};

type PageHeaderProps = {
  title?: React.ReactNode;
  category?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ category, title, children, actions }) => {
  return (
    <>
      <div className="border-b border-gray-300">
        <div className={classNames(`flex items-center justify-between`, children ? null : "mb-6")}>
          {/* meta */}
          <div className="flex-1 min-w-0">
            {/* placeholder category */}
            {category && <div className="text-xs font-bold text-gray-500 uppercase">{category}</div>}
            <h1 className="leading-tight text-gray-600 text-2xl font-normal">{title}</h1>
            {/* placeholder subtitle */}
          </div>
          {/* placeholder actions */}
          {actions && <div className="flex lg:mt-0 lg:ml-4">{actions}</div>}
        </div>
        {children}
      </div>
    </>
  );
};

PageHeader.displayName = "Page.Header";

type PageBodyProps = { children: React.ReactNode };

export const PageBody: React.FC<PageBodyProps> = ({ children }) => {
  return <div className="divide-y divide-gray-300">{children}</div>;
};

PageBody.displayName = "Page.Body";

type PageLoadingProps = {};

export const PageLoading: React.FC<PageLoadingProps> = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <Spinner />
    </div>
  );
};

PageLoading.displayName = "Page.Loading";

type PageSectionProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  category?: React.ReactNode;
  actions?: React.ReactNode;
};

export const PageSection: React.FC<PageSectionProps> = ({ title, actions, children }) => {
  const hasSectionHeader = !!(title || actions);
  return (
    <div className="py-8">
      {hasSectionHeader && (
        <div className="mb-6 flex items-center justify-between">
          {title && <h1 className="text-xl leading-6 font-normal text-gray-600">{title}</h1>}
          {actions && <div className="flex ml-auto">{actions}</div>}
        </div>
      )}
      {children && <div>{children}</div>}
    </div>
  );
};

PageSection.displayName = "Page.Section";

export default Object.assign(Page, {
  Header: PageHeader,
  Body: PageBody,
  Section: PageSection,
  Loading: PageLoading,
});

const Spinner = ({ className = "h-12" }: { className?: string }) => (
  <svg
    style={{
      margin: "auto",
      background: "none",
      display: "block",
      shapeRendering: "auto",
    }}
    className={className}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid">
    <g transform="rotate(0 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.9166666666666666s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(30 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.8333333333333334s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(60 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.75s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(90 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.6666666666666666s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(120 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.5833333333333334s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(150 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.5s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(180 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.4166666666666667s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(210 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.3333333333333333s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(240 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.25s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(270 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.16666666666666666s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(300 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="-0.08333333333333333s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
    <g transform="rotate(330 50 50)">
      <rect x={48} y={24} rx={2} ry="2.7600000000000002" width={4} height={12} fill="#999999">
        <animate
          attributeName="opacity"
          values="1;0"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </rect>
    </g>
  </svg>
);