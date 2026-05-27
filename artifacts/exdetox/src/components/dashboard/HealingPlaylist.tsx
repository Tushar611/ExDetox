import { useState } from "react";
import { motion } from "framer-motion";
import { useProStatus } from "@/hooks/use-pro-status";
import { ProGate } from "@/components/pro/ProGate";
import { Music2, ExternalLink } from "lucide-react";

const PLAYLIST_DATA: Record<string, { title: string; artist: string; vibe: string; url: string }[]> = {
  sad: [
    { title: "Falling", artist: "Harry Styles", vibe: "Ugly cry. Let it out.", url: "https://open.spotify.com/search/Falling%20Harry%20Styles" },
    { title: "Everything I Wanted", artist: "Billie Eilish", vibe: "When you can't stop thinking.", url: "https://open.spotify.com/search/Everything%20I%20Wanted%20Billie%20Eilish" },
    { title: "Liability", artist: "Lorde", vibe: "For the alone 2am moment.", url: "https://open.spotify.com/search/Liability%20Lorde" },
  ],
  angry: [
    { title: "Good 4 U", artist: "Olivia Rodrigo", vibe: "Channel that rage.", url: "https://open.spotify.com/search/Good%204%20U%20Olivia%20Rodrigo" },
    { title: "Before He Cheats", artist: "Carrie Underwood", vibe: "Cathartic. Earned.", url: "https://open.spotify.com/search/Before%20He%20Cheats" },
    { title: "Stronger", artist: "Kanye West", vibe: "Anger → power.", url: "https://open.spotify.com/search/Stronger%20Kanye%20West" },
  ],
  empty: [
    { title: "Motion Sickness", artist: "Phoebe Bridgers", vibe: "Numb but feeling it.", url: "https://open.spotify.com/search/Motion%20Sickness%20Phoebe%20Bridgers" },
    { title: "Numb Little Bug", artist: "Em Beihold", vibe: "When words aren't there.", url: "https://open.spotify.com/search/Numb%20Little%20Bug" },
    { title: "The Night Will Always Win", artist: "Manchester Orchestra", vibe: "Sit with the quiet.", url: "https://open.spotify.com/search/The%20Night%20Will%20Always%20Win" },
  ],
  healing: [
    { title: "Flowers", artist: "Miley Cyrus", vibe: "Main character mode ON.", url: "https://open.spotify.com/search/Flowers%20Miley%20Cyrus" },
    { title: "Break My Soul", artist: "Beyoncé", vibe: "You're literally glowing up.", url: "https://open.spotify.com/search/Break%20My%20Soul%20Beyonce" },
    { title: "Running Up That Hill", artist: "Kate Bush", vibe: "Power through.", url: "https://open.spotify.com/search/Running%20Up%20That%20Hill" },
  ],
  peaceful: [
    { title: "Golden", artist: "Harry Styles", vibe: "You're becoming your best self.", url: "https://open.spotify.com/search/Golden%20Harry%20Styles" },
    { title: "As It Was", artist: "Harry Styles", vibe: "Acceptance. Peace.", url: "https://open.spotify.com/search/As%20It%20Was%20Harry%20Styles" },
    { title: "Superstar", artist: "Taylor Swift", vibe: "Soft. Present. Okay.", url: "https://open.spotify.com/search/Superstar%20Taylor%20Swift" },
  ],
};

const MOOD_LABELS: Record<string, string> = {
  sad: "😢 Sad", angry: "😤 Angry", empty: "😶 Empty", healing: "💜 Healing", peaceful: "😌 Peaceful"
};

function PlaylistContent() {
  const [selectedMood, setSelectedMood] = useState<string>("healing");

  return (
    <div className="w-full bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Music2 size={14} /> Healing Playlist
        </h3>
      </div>

      {/* Mood selector */}
      <div className="flex gap-2 flex-wrap mb-4">
        {Object.keys(PLAYLIST_DATA).map(mood => (
          <button
            key={mood}
            data-testid={`button-playlist-mood-${mood}`}
            onClick={() => setSelectedMood(mood)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
              selectedMood === mood
                ? "bg-primary text-white shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                : "bg-card/60 border border-border/40 text-muted-foreground hover:border-primary/40"
            }`}
          >
            {MOOD_LABELS[mood]}
          </button>
        ))}
      </div>

      {/* Tracks */}
      <div className="space-y-2">
        {PLAYLIST_DATA[selectedMood]?.map((track, idx) => (
          <motion.a
            key={track.title}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-track-${idx}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
              <Music2 size={14} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{track.title}</p>
              <p className="text-xs text-muted-foreground">{track.artist}</p>
              <p className="text-xs text-primary/70 italic mt-0.5">{track.vibe}</p>
            </div>
            <ExternalLink size={14} className="text-muted-foreground/40 group-hover:text-primary flex-shrink-0 transition-colors" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export function HealingPlaylist() {
  return (
    <ProGate
      feature="Healing Playlist"
      description="Get mood-matched song recommendations to support your healing journey."
    >
      <PlaylistContent />
    </ProGate>
  );
}
