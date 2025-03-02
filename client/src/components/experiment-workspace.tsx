import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlayCircle, RotateCcw, FastForward, Smartphone } from "lucide-react";
import type { Experiment } from "@shared/schema";

interface ExperimentWorkspaceProps {
  experiment: Experiment;
}

export default function ExperimentWorkspace({ experiment }: ExperimentWorkspaceProps) {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [sorting, setSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [useSensors, setUseSensors] = useState(false);
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [currentComplexity, setCurrentComplexity] = useState<"best" | "average" | "worst">("average");

  useEffect(() => {
    if (useSensors) {
      // Request device motion and orientation access
      if (typeof DeviceOrientationEvent !== 'undefined' && 
          typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((response: string) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }

      // Enable haptic feedback if available
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
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

    // Use device tilt to control animation speed
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

  const renderRecurrenceTree = () => {
    return (
      <motion.svg 
        viewBox="0 0 800 400" 
        className="w-full h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.g
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Root node */}
          <circle cx="400" cy="50" r="30" className="fill-primary/20 stroke-primary" />
          <text x="400" y="50" textAnchor="middle" dy=".3em" className="text-sm font-mono">
            T(n)
          </text>

          {/* Level 1 nodes */}
          <motion.path
            d="M 370,70 L 300,120"
            className="stroke-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />
          <motion.path
            d="M 430,70 L 500,120"
            className="stroke-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          />

          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <circle cx="300" cy="140" r="25" className="fill-primary/20 stroke-primary" />
            <text x="300" y="140" textAnchor="middle" dy=".3em" className="text-xs font-mono">
              T(n/2)
            </text>
          </motion.g>

          <motion.g
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <circle cx="500" cy="140" r="25" className="fill-primary/20 stroke-primary" />
            <text x="500" y="140" textAnchor="middle" dy=".3em" className="text-xs font-mono">
              T(n/2)
            </text>
          </motion.g>
        </motion.g>

        {/* Complexity formula */}
        <motion.text
          x="400"
          y="250"
          textAnchor="middle"
          className="text-lg font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          T(n) = 2T(n/2) + O(n)
        </motion.text>
      </motion.svg>
    );
  };

  return (
    <Tabs defaultValue="visualization" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="visualization">Visualization</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="visualization" className="space-y-6">
        <div className="flex justify-between items-center">
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
      </TabsContent>

      <TabsContent value="code">
        <pre className="bg-card p-4 rounded-lg overflow-x-auto">
          {`function bubbleSort(arr) {
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
}`}
        </pre>
      </TabsContent>

      <TabsContent value="analysis" className="space-y-6">
        <div className="flex justify-center space-x-4">
          <Button
            variant={currentComplexity === "best" ? "default" : "outline"}
            onClick={() => setCurrentComplexity("best")}
          >
            Best Case
          </Button>
          <Button
            variant={currentComplexity === "average" ? "default" : "outline"}
            onClick={() => setCurrentComplexity("average")}
          >
            Average Case
          </Button>
          <Button
            variant={currentComplexity === "worst" ? "default" : "outline"}
            onClick={() => setCurrentComplexity("worst")}
          >
            Worst Case
          </Button>
        </div>

        <motion.div
          key={currentComplexity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-4"
        >
          <div className="p-6 bg-card rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {currentComplexity === "best" && "Best Case: O(n)"}
              {currentComplexity === "average" && "Average Case: O(n²)"}
              {currentComplexity === "worst" && "Worst Case: O(n²)"}
            </h3>

            {currentComplexity === "best" && (
              <p className="text-muted-foreground">
                When the array is already sorted, Bubble Sort makes n-1 comparisons in a single pass,
                leading to a linear time complexity of O(n).
              </p>
            )}

            {currentComplexity === "average" && (
              <>
                <p className="text-muted-foreground mb-4">
                  For random input arrays, Bubble Sort performs approximately n²/2 comparisons
                  and n²/2 swaps on average.
                </p>
                {renderRecurrenceTree()}
              </>
            )}

            {currentComplexity === "worst" && (
              <p className="text-muted-foreground">
                When the array is sorted in reverse order, every comparison leads to a swap,
                resulting in n(n-1)/2 comparisons and swaps.
              </p>
            )}
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}