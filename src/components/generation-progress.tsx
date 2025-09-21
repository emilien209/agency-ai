"use client";

import { cn } from "@/lib/utils";
import { Bot, Check, Loader, TestTube, Eye } from "lucide-react";

type Status = "idle" | "generating" | "testing" | "done" | "error";

type GenerationProgressProps = {
  status: Status;
};

const steps = [
  { id: "generating", name: "Generating Code", icon: Bot, statuses: ["generating", "testing", "done"] },
  { id: "testing", name: "Automated Testing", icon: TestTube, statuses: ["testing", "done"] },
  { id: "preview", name: "Creating Preview", icon: Eye, statuses: ["done"] },
];

export function GenerationProgress({ status }: GenerationProgressProps) {
  const getStepStatus = (stepId: string): 'active' | 'completed' | 'pending' => {
    const currentStepIndex = steps.findIndex(s => s.id === status);
    const stepIndex = steps.findIndex(s => s.id === stepId);

    if (status === 'done' || stepIndex < currentStepIndex) return 'completed';
    if (status === stepId) return 'active';
    if (stepIndex === 0 && status === 'generating') return 'active';
    if (stepIndex === 1 && status === 'testing') return 'active';
    if (status === 'done' && stepId === 'preview') return 'completed';
    if (stepIndex === 2 && status === 'done') return 'completed';
    
    return 'pending';
  };
  
   if (status === 'idle') {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">Your project is being created!</h2>
        <p className="text-muted-foreground mb-8">Please wait while our AI builds everything for you.</p>
        <div className="w-full max-w-sm">
            <ul className="space-y-4">
            {steps.map((step) => {
                const stepStatus = getStepStatus(step.id);
                return (
                <li key={step.id} className="flex items-center space-x-4">
                    <div className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full",
                        stepStatus === 'completed' && "bg-primary text-primary-foreground",
                        stepStatus === 'active' && "bg-accent text-accent-foreground animate-pulse",
                        stepStatus === 'pending' && "bg-secondary text-secondary-foreground"
                    )}>
                    {stepStatus === 'completed' ? (
                        <Check className="h-5 w-5" />
                    ) : stepStatus === 'active' ? (
                        <Loader className="h-5 w-5 animate-spin" />
                    ) : (
                        <step.icon className="h-5 w-5" />
                    )}
                    </div>
                    <span className={cn(
                        "font-medium",
                        stepStatus === 'pending' && 'text-muted-foreground'
                    )}>{step.name}</span>
                </li>
                );
            })}
            </ul>
        </div>
        {status === "error" && (
            <p className="mt-8 text-destructive">An error occurred. Please try again.</p>
        )}
    </div>
  );
}
