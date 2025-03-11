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
import { cn } from "@/lib/utils";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isApiReady, setIsApiReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlayerClicked, setIsPlayerClicked] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
    if (!isApiReady || !videoId || !playerContainerRef.current) return;

    // Clear previous player if it exists
    if (playerRef.current) {
      playerRef.current.destroy();
    }

    const player = new window.YT.Player('youtube-player', {
      videoId: videoId,
      width: '100%',
      height: '100%',
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: 0,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: (event: any) => {
          playerRef.current = event.target;
          setDuration(event.target.getDuration());
          event.target.setVolume(volume * 100);
          setPlayerReady(true);
          
          // If user clicked before player was ready, play now
          if (isPlayerClicked) {
            event.target.playVideo();
            setIsPlayerClicked(false);
          }
        },
        onStateChange: (event: any) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          if (event.data === window.YT.PlayerState.PLAYING) {
            setDuration(event.target.getDuration());
          }
        },
        onError: (event: any) => {
          console.error("YouTube player error:", event.data);
        }
      }
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isApiReady, videoId, volume, isPlayerClicked]);

  // Update player controls
  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    
    if (!playerRef.current) {
      // If player isn't ready yet, set a flag to play when it's ready
      setIsPlayerClicked(true);
      return;
    }
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleTimeChange = (value: number[]) => {
    if (!playerRef.current || !playerReady) return;
    const newTime = value[0];
    playerRef.current.seekTo(newTime);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!playerRef.current || !playerReady) return;
    const newVolume = value[0];
    playerRef.current.setVolume(newVolume * 100);
    setVolume(newVolume);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !playerReady) return;
    
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
      if (playerRef.current && isPlaying && playerReady) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, playerReady]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Always show controls on mobile
  useEffect(() => {
    if (isMobile) {
      setShowControls(true);
    }
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="relative group rounded-lg overflow-hidden max-w-3xl mx-auto"
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
    >
      {/* YouTube player container */}
      <div 
        ref={playerContainerRef}
        className="aspect-video bg-black w-full"
      >
        <div id="youtube-player" className="w-full h-full" />
      </div>

      {/* Video overlay for better touch control */}
      <div 
        className="absolute inset-0 bg-transparent z-10 cursor-pointer"
        onClick={togglePlay}
      />

      {/* Video controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 z-20"
      >
        <div className="space-y-2">
          {/* Progress bar */}
          <div 
            className="relative h-3 cursor-pointer rounded-full overflow-hidden bg-white/30"
            onClick={(e) => {
              if (!playerRef.current || !playerReady) return;
              
              const rect = e.currentTarget.getBoundingClientRect();
              const offsetX = e.clientX - rect.left;
              const percentage = offsetX / rect.width;
              const newTime = percentage * duration;
              
              handleTimeChange([newTime]);
            }}
          >
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleTimeChange}
              className="cursor-pointer absolute inset-0"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Play/Pause button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="hover:bg-white/30 text-white rounded-full"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              {/* Mute/Unmute button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="hover:bg-white/30 text-white rounded-full"
              >
                {volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>

              {/* Volume slider (hidden on mobile) */}
              <div className="hidden sm:block">
                <Slider
                  value={[volume]}
                  max={1}
                  step={0.1}
                  onValueChange={handleVolumeChange}
                  className="w-24 relative z-50 bg-white/40 rounded-full"
                />
              </div>

              {/* Time display */}
              <span className="text-sm text-white font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Restart button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!playerRef.current || !playerReady) return;
                  playerRef.current.seekTo(0);
                  setCurrentTime(0);
                }}
                className="hover:bg-white/30 text-white rounded-full"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>

              {/* Fullscreen button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="hover:bg-white/30 text-white rounded-full"
              >
                {isFullscreen ? (
                  <Minimize className="h-5 w-5" />
                ) : (
                  <Maximize className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Large play button in the center for better visibility */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          onClick={togglePlay}
        >
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            size="icon"
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}

      {/* Loading indicator */}
      {!playerReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
    </div>
  );
}
