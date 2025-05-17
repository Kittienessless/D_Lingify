import { InputHTMLAttributes, useState, useRef, useEffect } from "react";
import "./textfield.css";
import { IconButton } from "shared/ui/button/IconButton";
import { CloseIcon } from "shared/assets/CloseIcon";
import { EditIcon } from "shared/assets/EditIcon";
import { CheckIcon } from "shared/assets/CheckIcon";
import styled from "styled-components";
import { centerContent } from "../../../lib/centerContent";
import { ScreenReaderText } from "./ScreenReaderTextProps";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onSave?: (value: any) => Promise<void>;
}
const TextfieldWrapper = styled.div`
  border-radius: 12px;
  padding: 5px 15px;
  background: ${({ theme }) => theme.colors.container};
  color: ${({ theme }) => theme.colors.font};
  ${centerContent};
`;

const TextfieldHeader = styled.div`
  display: flex;
  text-wrap: nowrap;
  width: max-content;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  margin-right: 3em;
  background-color: transparent;
`;

export function TextField({ id, onSave, label, ...props }: TextFieldProps) {
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);

  const closeEditMode = () => {
    setEditMode(false);
    editBtnRef?.current?.focus();
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const onEditHandler = async () => {
    const currentValue = inputRef.current?.value

    const onSavePromise = await onSave?.(currentValue);

    closeEditMode();

    return onSavePromise;
  };

  useEffect(() => {
    if (!editMode) {
      return;
    }

    inputRef?.current?.focus();
  }, [editMode]);

  const labelId = `label-${id}`;
  const cancelScreenReaderId = `cancel-screen-reader-text-${id}`;
  const editScreenReaderId = `edit-screen-reader-text-${id}`;

  return (
    <TextfieldWrapper>
      <TextfieldHeader>
        <label  id={labelId} htmlFor={id}>{label}</label>
      </TextfieldHeader>
      <input
        id={id}
        {...props}
        readOnly={!editMode}
        ref={inputRef}
        className="textfield--input"
      />

      {editMode && (
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "15px" }}
        >
          <ScreenReaderText id={cancelScreenReaderId}>
            Cancel editing
          </ScreenReaderText>

          <IconButton
            title={""}
            icon={<CloseIcon />}
            onClick={closeEditMode}
            className="textfield--header-action"
          >
            Cancel
          </IconButton>
        </div>
      )}
      <IconButton
        title={editMode ? "Save" : "Edit"}
        icon={editMode ? <CheckIcon /> : <EditIcon />}
        onClick={editMode ? onEditHandler : openEditMode}
        ref={editBtnRef}
        className="textfield--header-action"
      ></IconButton>
      <ScreenReaderText id={editScreenReaderId}>
        {editMode ? "Save changes" : "Edit"}
      </ScreenReaderText>
    </TextfieldWrapper>
  );
}
