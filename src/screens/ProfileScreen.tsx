import { ArrowRight, Check, MapPin, PencilLine, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../store';

const AVATAR_OPTIONS = [47, 13, 22, 35, 41, 58].map(
  (id) => `https://i.pravatar.cc/400?img=${id}`,
);

const splitTags = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

export function ProfileScreen() {
  const user = useStore((state) => state.currentUser);
  const setScreen = useStore((state) => state.setScreen);
  const updateCurrentUser = useStore((state) => state.updateCurrentUser);

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title);
  const [homeBase, setHomeBase] = useState(user.homeBase);
  const [background, setBackground] = useState(user.background);
  const [interestsInput, setInterestsInput] = useState(user.interests.join(', '));
  const [avatar, setAvatar] = useState(user.avatar);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(user.name);
    setTitle(user.title);
    setHomeBase(user.homeBase);
    setBackground(user.background);
    setInterestsInput(user.interests.join(', '));
    setAvatar(user.avatar);
  }, [user]);

  useEffect(() => {
    if (!saved) return;
    const timeout = window.setTimeout(() => setSaved(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [saved]);

  const interests = splitTags(interestsInput);

  const handleSave = () => {
    updateCurrentUser({
      name: name.trim() || 'You',
      title: title.trim() || 'Career prep member',
      homeBase: homeBase.trim() || 'Remote',
      background:
        background.trim() ||
        'Add a little context about your experience, goals, and the kind of people you want to prep with.',
      interests,
      avatar,
    });
    setSaved(true);
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-coral-50/40 to-transparent">
      <div className="shrink-0 overflow-hidden border-b border-coral-100 bg-gradient-to-br from-coral-300 via-coral-400 to-coral-600 px-5 pb-6 pt-6 text-cream">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
              <PencilLine className="h-3 w-3" />
              Your account
            </div>
            <h1 className="mt-4 max-w-[280px] font-display text-[33px] font-semibold leading-tight">
              Build the version of you people will prep with.
            </h1>
          </div>
          <img
            src={avatar}
            alt={name || 'Your avatar'}
            className="h-16 w-16 rounded-2xl object-cover ring-4 ring-white/50 shadow-float"
          />
        </div>
        <p className="max-w-[320px] text-sm leading-relaxed text-cream/92">
          Add your background, interests, and what you are aiming for. This replaces the old static profile card and keeps the page from colliding with the hero area.
        </p>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6 pt-5">
        <div className="space-y-4">
          <section className="rounded-[1.75rem] border border-coral-100 bg-white/80 p-4 shadow-[0_16px_30px_-24px_rgba(43,36,32,0.28)] backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coral-600/90">
                  Live preview
                </p>
                <h2 className="mt-1 font-display text-2xl text-ink">
                  {name.trim() || 'Your name'}
                </h2>
                <p className="mt-1 text-sm font-medium text-ink/70">
                  {title.trim() || 'Career prep member'}
                </p>
                <div className="mt-2 flex items-center gap-1 text-sm text-ink/55">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{homeBase.trim() || 'Remote'}</span>
                </div>
              </div>
              <img
                src={avatar}
                alt={name || 'Preview avatar'}
                className="h-20 w-20 rounded-[1.5rem] object-cover ring-4 ring-coral-50 shadow-float"
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink/78">
              {background.trim() ||
                'Tell people what you are studying or working on, what kind of roles you want, and what makes a prep group feel useful to you.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {(interests.length > 0 ? interests : ['Interview prep', 'Career growth']).map(
                (interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-sage-100 px-2.5 py-1 text-xs font-medium text-sage-700"
                  >
                    {interest}
                  </span>
                ),
              )}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-coral-100 bg-white/85 p-4 backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coral-600/90">
              Account details
            </p>
            <div className="mt-4 grid gap-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink/80">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-coral-100 bg-coral-50/55 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-coral-300 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink/80">
                  Role target or current stage
                </span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="CS junior recruiting for SWE internships"
                  className="w-full rounded-2xl border border-coral-100 bg-coral-50/55 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-coral-300 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink/80">Location</span>
                <input
                  value={homeBase}
                  onChange={(event) => setHomeBase(event.target.value)}
                  placeholder="Boston, MA"
                  className="w-full rounded-2xl border border-coral-100 bg-coral-50/55 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-coral-300 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink/80">
                  Background
                </span>
                <textarea
                  value={background}
                  onChange={(event) => setBackground(event.target.value)}
                  placeholder="Share your experience, what you're preparing for, and what kind of prep partners help you do your best work."
                  rows={5}
                  className="w-full resize-none rounded-[1.4rem] border border-coral-100 bg-coral-50/55 px-4 py-3 text-sm leading-relaxed text-ink outline-none transition placeholder:text-ink/35 focus:border-coral-300 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink/80">
                  Interests
                </span>
                <input
                  value={interestsInput}
                  onChange={(event) => setInterestsInput(event.target.value)}
                  placeholder="Behavioral practice, System design, Resume review"
                  className="w-full rounded-2xl border border-coral-100 bg-coral-50/55 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-coral-300 focus:bg-white"
                />
                <p className="mt-2 text-[12px] text-ink/52">
                  Separate interests with commas.
                </p>
              </label>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-sage-100 bg-sage-50/75 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sage-700/85">
              Pick an avatar
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {AVATAR_OPTIONS.map((option) => {
                const selected = option === avatar;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setAvatar(option)}
                    className={`relative overflow-hidden rounded-[1.25rem] border p-1 transition ${
                      selected
                        ? 'border-coral-400 bg-white shadow-float'
                        : 'border-transparent bg-white/70 hover:border-sage-200'
                    }`}
                    aria-label="Choose avatar"
                  >
                    <img
                      src={option}
                      alt="Avatar option"
                      className="h-20 w-full rounded-[1rem] object-cover"
                    />
                    {selected && (
                      <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-coral-500 text-cream shadow">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-coral-100 bg-white/75 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-coral-600/90">
              Why this matters
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/74">
              People are joining a small shared effort with you. A clear background and a few real interests make the group feel intentional instead of anonymous.
            </p>
          </section>
        </div>
      </div>

      <div className="shrink-0 border-t border-coral-100 bg-cream/95 px-5 pb-6 pt-4 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handleSave}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-coral-200 bg-white py-3.5 text-sm font-semibold text-ink shadow-float transition hover:bg-coral-50"
          >
            <Check className="h-4 w-4" />
            Save account
          </button>
          <button
            onClick={() => {
              handleSave();
              setScreen('deck');
            }}
            className="flex flex-[1.25] items-center justify-center gap-2 rounded-full bg-gradient-to-br from-coral-400 to-coral-600 py-3.5 text-sm font-semibold text-cream shadow-card transition hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="h-4 w-4" />
            Start swiping
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] text-ink/52">
          {saved ? 'Account updated for this demo session.' : 'Your profile updates instantly across the prototype.'}
        </p>
      </div>
    </div>
  );
}
