import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlayCircle, RotateCcw, Smartphone } from "lucide-react";
import type { Experiment } from "@shared/schema";

interface SortingWorkspaceProps {
  experiment: Experiment;
}

export default function SortingWorkspace({ experiment }: SortingWorkspaceProps) {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);
  const [sorting, setSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [useSensors, setUseSensors] = useState(false);
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    if (!useSensors) {
      window.removeEventListener('deviceorientation', handleOrientation);
      return;
    }

    const requestPermission = async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (err) {
          console.error('Error requesting device orientation permission:', err);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestPermission();

    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [useSensors]);

  const handleOrientation = (event: DeviceOrientationEvent) => {
    setOrientation({
      alpha: event.alpha || 0,
      beta: event.beta || 0,
      gamma: event.gamma || 0
    });

    if (event.beta && Math.abs(event.beta) > 45) {
      setArray(prev => [...prev].sort((a, b) => a - b));
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }
    }
  };

  const resetArray = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setCurrentStep(0);
    setSorting(false);
    if (navigator.vibrate) {
      navigator.vibrate([50, 50]);
    }
  };

  const bubbleSort = async () => {
    setSorting(true);
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentStep(prev => prev + 1);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(r => setTimeout(r, 500));
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
        }
      }
    }

    setSorting(false);
  };

  return (
    <Tabs defaultValue="visualization" className="space-y-4">
      <TabsList>
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="visualization">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <Button 
                onClick={() => bubbleSort()} 
                disabled={sorting}
                size="sm"
                className="transition-all hover:scale-105"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Start
              </Button>
              <Button 
                onClick={resetArray} 
                variant="outline" 
                size="sm"
                className="transition-all hover:scale-105"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button
                onClick={() => setUseSensors(!useSensors)}
                variant={useSensors ? "default" : "outline"}
                size="sm"
                className="transition-all hover:scale-105"
              >
                <Smartphone className="mr-2 h-4 w-4" />
                {useSensors ? "Disable Sensors" : "Enable Sensors"}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Steps: {currentStep}
            </div>
          </div>

          <motion.div 
            className="h-64 bg-card rounded-lg p-6 flex items-end justify-center gap-2"
            animate={{
              rotateX: useSensors ? orientation.beta : 0,
              rotateY: useSensors ? orientation.gamma : 0,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <AnimatePresence>
              {array.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: value * 2,
                    opacity: 1,
                    rotateZ: sorting ? 360 : 0
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="w-12 bg-primary rounded-t-lg flex items-end justify-center pb-2"
                  style={{ height: value * 2 }}
                >
                  {value}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {useSensors && (
            <div className="text-sm text-muted-foreground">
              Tilt your device to control the visualization!
              <br />
              Beta: {orientation.beta.toFixed(2)}° | Gamma: {orientation.gamma.toFixed(2)}°
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="code">
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{`
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
          `}</code>
        </pre>
      </TabsContent>
    </Tabs>
  );
}