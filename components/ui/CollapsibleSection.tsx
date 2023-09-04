import { Transition } from "@headlessui/react";
import React, { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  isChecked: boolean;
  onToggleChecked: () => void;
  children: React.ReactNode;
  additionalStyles?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isChecked,
  onToggleChecked,
  children,
  additionalStyles = "",
}) => {
  const [isOpen, setIsOpen] = useState(isChecked);

  const handleToggle = () => {
    onToggleChecked();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border p-4 my-2 ${additionalStyles}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <input
          type="checkbox"
          checked={isOpen}
          onChange={handleToggle}
          className="cursor-pointer form-checkbox text-blue-500"
        />
      </div>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-4">{children}</div>
      </Transition>
    </div>
  );
};

export default CollapsibleSection;
