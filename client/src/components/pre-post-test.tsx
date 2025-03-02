import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import type { Question } from "@shared/schema";
import { cn } from "@/lib/utils";

interface PrePostTestProps {
  questions: Question[];
  type: "pre" | "post";
  experimentId: number;
}

export default function PrePostTest({ questions, type, experimentId }: PrePostTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const getScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(curr => curr + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setShowExplanation(false);
  };

  if (showResults) {
    const score = getScore();
    const percentage = (score / questions.length) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Test Complete!</h2>
          <div className="text-4xl font-bold">
            {score} / {questions.length}
            <span className="text-2xl text-muted-foreground"> ({percentage.toFixed(1)}%)</span>
          </div>
          <p className="text-muted-foreground">
            {percentage >= 70 
              ? "Great job! You're ready to proceed."
              : "You might want to review the material and try again."}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-card"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="font-medium">{question.question}</p>
                  <p className="text-sm">
                    Your answer: {question.options[selectedAnswers[index]]}
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <Check className="inline ml-2 h-4 w-4 text-green-500" />
                    ) : (
                      <X className="inline ml-2 h-4 w-4 text-red-500" />
                    )}
                  </p>
                  {selectedAnswers[index] !== question.correctAnswer && (
                    <p className="text-sm text-muted-foreground">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                </div>
                <Badge>{question.difficulty}</Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={resetTest}>Try Again</Button>
        </div>
      </motion.div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="outline">
          Question {currentQuestion + 1} of {questions.length}
        </Badge>
        <Badge>{currentQ.difficulty}</Badge>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{currentQ.question}</h3>
            
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              <div className="space-y-2">
                {currentQ.options.map((option, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-lg transition-all",
                      "hover:bg-accent/50",
                      "data-[state=checked]:bg-green-500/20 dark:data-[state=checked]:bg-green-500/20",
                      selectedAnswers[currentQuestion] === index && "bg-green-500/20 dark:bg-green-500/20"
                    )}
                    data-state={selectedAnswers[currentQuestion] === index ? 'checked' : 'unchecked'}
                  >
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`q${currentQuestion}-a${index}`}
                    />
                    <Label
                      htmlFor={`q${currentQuestion}-a${index}`}
                      className={cn(
                        "cursor-pointer flex-grow",
                        selectedAnswers[currentQuestion] === index && "font-medium text-green-500"
                      )}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {showExplanation && currentQ.explanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 rounded-lg bg-muted"
            >
              <p className="text-sm">{currentQ.explanation}</p>
            </motion.div>
          )}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setShowExplanation(!showExplanation)}
              disabled={!currentQ.explanation}
            >
              {showExplanation ? "Hide" : "Show"} Explanation
            </Button>
            <Button
              onClick={goToNextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
