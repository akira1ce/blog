'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Props for the CommandDialog component
 */
export interface CommandDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** The content to display inside the dialog */
  children: React.ReactNode;
  /** Whether to close dialog when clicking outside */
  closeOnClickOutside?: boolean;
  /** Whether to close dialog when pressing Escape */
  closeOnEscape?: boolean;
}

/**
 * A controlled modal dialog component with portal rendering
 */
export const CommandDialog = (props: CommandDialogProps) => {
  const { open, onOpenChange, children, closeOnClickOutside = true, closeOnEscape = true } = props;

  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    if (!closeOnEscape || !open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, closeOnEscape]);

  useEffect(() => {
    if (!closeOnClickOutside || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, closeOnClickOutside]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Only render portal on client side
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />

          {/* Dialog Content */}
          <motion.div
            ref={dialogRef}
            className={cn('bg-main/80 relative overflow-y-auto rounded-xl p-4 shadow-2xl')}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-dialog-title"
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.15,
              ease: 'easeOut',
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
