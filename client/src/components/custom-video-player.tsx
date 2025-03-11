import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
} from "lucide-react";

interface CustomVideoPlayerProps {
  videoUrl: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function CustomVideoPlayer({ videoUrl }: CustomVideoPlayerProps) {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);

  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl);

  if (!videoId) {
    return <div>Invalid YouTube URL</div>;
  }

  // Initialize YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setIsApiReady(true);
      };
    } else {
      setIsApiReady(true);
    }
  }, []);

  // Initialize player when API is ready
  useEffect(() => {
    if (!isApiReady) return;

    if (!videoId) return;

    const player = new window.YT.Player('youtube-player', {
      videoId: videoId,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: 0
      },
      events: {
        onReady: () => {
          playerRef.current = player;
          setDuration(player.getDuration());
          // Restore volume state
          player.setVolume(volume * 100);
        },
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          if (event.data === window.YT.PlayerState.PLAYING) {
            setDuration(player.getDuration());
          }
        }
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isApiReady, videoUrl, volume]);

  // Update player controls
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleTimeChange = (value: number) => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(value);
    setCurrentTime(value);
  };

  const handleVolumeChange = (value: number) => {
    if (!playerRef.current) return;
    playerRef.current.setVolume(value * 100);
    setVolume(value);
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (volume === 0) {
      playerRef.current.unMute();
      setVolume(1);
    } else {
      playerRef.current.mute();
      setVolume(0);
    }
  };

  // Update time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.getIframe().requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div id="youtube-player" className="w-full aspect-video" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4"
      >
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={([value]) => handleTimeChange(value)}
            className="cursor-pointer"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="hover:bg-foreground/20 text-foreground"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="hover:bg-foreground/20 text-foreground"
              >
                {volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>

              <Slider
                value={[volume]}
                max={1}
                step={0.1}
                onValueChange={([value]) => handleVolumeChange(value)}
                className="w-24 relative z-50 bg-foreground/10 rounded-full"
              />

              <span className="text-sm text-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (!playerRef.current) return;
                  playerRef.current.seekTo(0);
                }}
                className="hover:bg-foreground/20 text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="hover:bg-foreground/20 text-foreground"
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
