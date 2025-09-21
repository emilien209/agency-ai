"use client";

import Image from "next/image";
import { Download, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type PreviewPanelProps = {
  code: string;
  projectName: string;
  onReset: () => void;
};

export function PreviewPanel({ code, projectName, onReset }: PreviewPanelProps) {
  const previewImage = PlaceHolderImages.find(img => img.id === 'app-preview');

  const handleDownload = () => {
    // Note: The AI returns code as a string, not a real ZIP. 
    // This simulates downloading a file containing the generated code.
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '_')}_project.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Generation Complete!</CardTitle>
        <CardDescription>Your project is ready. Here is a preview and download link.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="aspect-video w-full overflow-hidden rounded-lg border">
          {previewImage ? (
             <Image
                src={previewImage.imageUrl}
                alt={previewImage.description}
                width={800}
                height={600}
                className="object-cover w-full h-full"
                data-ai-hint={previewImage.imageHint}
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
                <p className="text-muted-foreground">Preview not available</p>
            </div>
          )}
        </div>
         <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Developer Note</AlertTitle>
            <AlertDescription>
              The downloaded file is a text file containing all generated code. For a full application, you would need to structure this into separate files and folders.
            </AlertDescription>
          </Alert>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2">
        <Button onClick={handleDownload} className="w-full sm:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Download Code
        </Button>
        <Button variant="outline" onClick={onReset} className="w-full sm:w-auto">
          <RefreshCw className="mr-2 h-4 w-4" />
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
}
