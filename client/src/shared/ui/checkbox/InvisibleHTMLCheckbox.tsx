import React from 'react'
import { InputProps } from '../../lib/props.tsx'
import { InvisibleInput } from '../../lib/InvisibleInput'

export type InvisibleHTMLCheckboxProps = InputProps<boolean> & {
  id?: string
  groupName?: string
}

export const InvisibleHTMLCheckbox: React.FC<InvisibleHTMLCheckboxProps> = ({
  id,
  value,
  onChange,
  groupName,
}) => (
  <InvisibleInput
    type="checkbox"
    checked={value}
    name={groupName}
    value={id}
    onChange={(event) => onChange(event.target.checked)}
  />
)