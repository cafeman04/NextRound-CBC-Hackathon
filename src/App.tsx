import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from './store';
import { AppShell } from './components/AppShell';
import { ProfileScreen } from './screens/ProfileScreen';
import { DeckScreen } from './screens/DeckScreen';
import { MatchScreen } from './screens/MatchScreen';
import { ChatScreen } from './screens/ChatScreen';
import { MatchesScreen } from './screens/MatchesScreen';

const transitions = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

export default function App() {
  const screen = useStore((s) => s.screen);

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          {...transitions}
          className="absolute inset-0 flex flex-col"
        >
          {screen === 'profile' && <ProfileScreen />}
          {screen === 'deck' && <DeckScreen />}
          {screen === 'match' && <MatchScreen />}
          {screen === 'chat' && <ChatScreen />}
          {screen === 'matches' && <MatchesScreen />}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
