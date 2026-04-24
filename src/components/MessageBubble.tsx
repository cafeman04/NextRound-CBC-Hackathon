import { motion } from 'framer-motion';
import type { Message } from '../types';
import { getUser } from '../data/users';

interface Props {
  message: Message;
  showAvatar: boolean;
  showName: boolean;
}

export function MessageBubble({ message, showAvatar, showName }: Props) {
  const isMe = message.userId === 'me';
  const user = getUser(message.userId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      {!isMe && (
        <div className="w-7 shrink-0">
          {showAvatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : null}
        </div>
      )}

      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[78%]`}>
        {showName && !isMe && (
          <span className="text-[11px] text-ink/55 ml-1 mb-1 font-medium">
            {user.name}
          </span>
        )}

        <div
          className={
            isMe
              ? 'px-3.5 py-2.5 text-sm leading-snug text-cream rounded-[20px] rounded-br-[8px] bg-gradient-to-br from-coral-500 to-coral-600 shadow-[0_8px_18px_-10px_rgba(232,93,62,0.55)]'
              : 'px-3.5 py-2.5 text-sm leading-snug text-ink rounded-[20px] rounded-bl-[8px] bg-white/95 border border-coral-100 shadow-[0_8px_18px_-14px_rgba(43,36,32,0.18)]'
          }
        >
          {message.text}
        </div>
      </div>
    </motion.div>
  );
}
