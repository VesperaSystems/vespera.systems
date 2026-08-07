'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import { PlusIcon } from './icons';
import type { Attachment } from 'ai';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
  selectedVisibilityType: VisibilityType;
  attachments?: Array<Attachment>;
  handleSubmit?: UseChatHelpers['handleSubmit'];
}

function PureSuggestedActions({
  chatId,
  append,
  attachments = [],
  handleSubmit,
}: SuggestedActionsProps) {
  const hasDocumentAttachments = attachments.some(
    (attachment) =>
      attachment.contentType?.includes('document') ||
      attachment.contentType?.includes('pdf') ||
      attachment.contentType?.includes('word') ||
      attachment.contentType?.includes('text'),
  );

  const suggestedActions = [
    {
      title: 'What should I check in a dataroom',
      label: ' before issuing a term sheet?',
      action: 'What should I check in a dataroom before issuing a term sheet?',
      showAlways: true,
    },
    {
      title: 'Draft a technical due-diligence checklist',
      label: ' for a SaaS acquisition',
      action: 'Draft a technical due-diligence checklist for a SaaS acquisition.',
      showAlways: true,
    },
    {
      title: 'Analyze this document for control, incentives,',
      label: ' and governance risk',
      action: 'Analyze this document for control, incentives, and governance risk.',
      showAlways: false,
    },
    {
      title: 'Explain the moving-average crossover',
      label: ' experiment in the Strategy Lab',
      action: 'Explain the moving-average crossover experiment in the Strategy Lab.',
      showAlways: true,
    },
  ];

  const filteredActions = suggestedActions.filter(
    (action) =>
      action.showAlways ||
      (action.title.includes('Analyze') && hasDocumentAttachments),
  );

  return (
    <div
      data-testid="suggested-actions"
      className="hidden w-full gap-2 lg:grid lg:grid-cols-2"
    >
      {filteredActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              if (
                hasDocumentAttachments &&
                suggestedAction.title.includes('Analyze')
              ) {
                if (handleSubmit) {
                  handleSubmit(undefined, {
                    experimental_attachments: attachments,
                  });
                }
              } else {
                append({
                  role: 'user',
                  content: suggestedAction.action,
                });
              }
            }}
            className="h-auto flex-1 items-start justify-start gap-1 rounded-xl border px-4 py-3.5 text-left text-sm sm:flex-col"
          >
            <div className="flex items-center gap-2">
              <PlusIcon size={16} />
              <span className="font-medium">{suggestedAction.title}</span>
            </div>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;
    if (
      JSON.stringify(prevProps.attachments) !==
      JSON.stringify(nextProps.attachments)
    )
      return false;

    return true;
  },
);
