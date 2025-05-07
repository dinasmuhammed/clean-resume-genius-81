
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlarmClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimeChallengeProps {
  duration: number; // Duration in minutes
  onComplete: () => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const TimeChallenge = ({ duration, onComplete }: TimeChallengeProps) => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert minutes to seconds
  const [showDialog, setShowDialog] = useState(false);
  const [showCompletionDialog, setShowCompletionDialog] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Check if the challenge was already started
    const challengeState = localStorage.getItem('resume_challenge_state');
    if (challengeState) {
      const { startTime, originalDuration } = JSON.parse(challengeState);
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = Math.max(0, originalDuration - elapsedSeconds);
      
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
        setIsActive(true);
        setHasStarted(true);
      } else if (!localStorage.getItem('resume_challenge_completed')) {
        // Time is up but challenge wasn't completed
        setTimeLeft(0);
        setShowDialog(true);
      }
    }
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          
          // Save current state to localStorage
          if (newTime > 0) {
            const challengeState = localStorage.getItem('resume_challenge_state');
            const parsedState = challengeState ? JSON.parse(challengeState) : {};
            localStorage.setItem('resume_challenge_state', JSON.stringify({
              ...parsedState,
              timeLeft: newTime
            }));
          }
          
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowDialog(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startChallenge = () => {
    setIsActive(true);
    setHasStarted(true);
    
    // Save start time and duration to localStorage
    localStorage.setItem('resume_challenge_state', JSON.stringify({
      startTime: Date.now(),
      originalDuration: duration * 60,
      timeLeft: duration * 60
    }));
    
    toast({
      title: "Challenge Started!",
      description: `Complete your resume in ${duration} minutes to get 10% off!`,
    });
  };

  const handleChallengeComplete = () => {
    if (timeLeft > 0 && isActive) {
      setIsActive(false);
      setShowCompletionDialog(true);
      localStorage.setItem('resume_challenge_completed', 'true');
      localStorage.setItem('resume_discount_code', 'TIMECHAMP10');
      onComplete();
    }
  };

  // Check if the challenge is already completed
  const isChallengeCompleted = localStorage.getItem('resume_challenge_completed') === 'true';

  if (isChallengeCompleted) {
    return (
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
        <AlarmClock className="w-5 h-5 text-green-500" />
        <div>
          <span className="font-medium text-green-700">Challenge completed! </span>
          <span className="text-green-600">Your discount code: TIMECHAMP10</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AlarmClock className="w-5 h-5 text-amber-500" />
            <div>
              <span className="font-medium">Time Challenge: </span>
              {hasStarted ? (
                <span>Complete in {formatTime(timeLeft)} for 10% off!</span>
              ) : (
                <span>Complete your resume in {duration} minutes for 10% off!</span>
              )}
            </div>
          </div>
          {!hasStarted ? (
            <Button 
              size="sm" 
              onClick={startChallenge} 
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Start Challenge
            </Button>
          ) : (
            <Button 
              size="sm" 
              onClick={handleChallengeComplete} 
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              I'm Done!
            </Button>
          )}
        </div>
      </div>

      {/* Time's up dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Time's Up!</DialogTitle>
            <DialogDescription>
              Unfortunately, you didn't complete your resume within the time limit. 
              Don't worry though, you can still finish your resume and download it at the regular price.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDialog(false)}>
              Continue Working
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Completion dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Congratulations!</DialogTitle>
            <DialogDescription>
              You've completed the challenge! Use the discount code <strong>TIMECHAMP10</strong> during checkout to get 10% off.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowCompletionDialog(false)}>
              Great!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
