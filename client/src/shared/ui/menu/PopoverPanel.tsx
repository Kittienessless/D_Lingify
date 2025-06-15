import {
  ReferenceType,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  autoUpdate,
  flip,
  offset,
  shift,
  FloatingFocusManager,
  autoPlacement,
  inline,
} from "@floating-ui/react";
import { Panel } from "../../lib/panel";
import { ReactNode, useEffect, useState } from "react";
import styled, { css } from "styled-components";

export interface RenderOpenerProps extends Record<string, unknown> {
  ref: (node: ReferenceType | null) => void;
}

export interface RenderContentParams {
  onClose: () => void;
}

type RenderOpenerParams = {
  props: RenderOpenerProps;
  isOpen: boolean;
};

export interface PopoverPanelProps {
  renderContent: (params: RenderContentParams) => ReactNode;
  renderOpener: (params: RenderOpenerParams) => ReactNode;
  className?: string;
}

export const PopoverPanel = ({
  renderContent,
  renderOpener,
  className,
}: PopoverPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Container = styled(Panel)`
    position: absolute;
    overflow: hidden;
  `;

  const {
    x,
    y,
    refs: { setReference, setFloating },
    context,
  } = useFloating({
    open: isOpen,

    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    strategy:'fixed',
     transform: false,
    middleware: [autoPlacement()],
  });

  useDismiss(context);
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <>
      {renderOpener({
        isOpen,
        props: { ref: setReference, ...getReferenceProps() },
      })}
      {isOpen && (
        <div
          style={{
            left: x ?? 0,
            top: y ?? 0,

            zIndex: 1,
          }}
          ref={setFloating}
          {...getFloatingProps()}
        >
          <FloatingFocusManager modal context={context}>
            <Container padding={12} className={className}>
              {renderContent({ onClose: () => setIsOpen(false) })}
            </Container>
          </FloatingFocusManager>
        </div>
      )}
    </>
  );
};
