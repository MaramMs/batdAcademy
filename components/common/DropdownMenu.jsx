"use client";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import styles from '@/sass/components/common/drop-down-menu.module.scss';

const DropdownMenuCustom = ({
  label,
  options,
  value,
  onChange,
  multi = false,
  icon,
  alignRight = false,
  triggerClassName,
}) => {
  const displayLabel = multi
    ? value.length === 0 ? label
      : value.length === 1 ? value[0]
      : `${value.length} selected`
    : value || label;

  const handleSelect = (opt, e) => {
    if (multi) e.preventDefault();
    if (multi) {
      const next = value.includes(opt)
        ? value.filter((v) => v !== opt)
        : [...value, opt];
      onChange(next);
    } else {
      onChange(opt);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={`${styles.trigger} ${triggerClassName || ""}`}>
          <span className={styles.label}>{displayLabel}</span>
          {icon}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.content}
          align={alignRight ? 'end' : 'start'}
          sideOffset={6}
          avoidCollisions
        >
          {options.map((opt) => {
            const isSelected = multi ? value.includes(opt) : value === opt;

            return (
              <DropdownMenu.Item
                key={opt}
                className={`${styles.item} ${isSelected ? styles.selected : ''}`}
                onSelect={(e) => handleSelect(opt, e)}
              >
                {multi && (
                  <span className={`${styles.checkbox} ${isSelected ? styles.checked : ''}`} />
                )}
                {opt}
                {!multi && isSelected && <span className={styles.dot} />}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropdownMenuCustom;