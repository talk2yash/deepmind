import { useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileImage, FileVideo, FileAudio, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Upload() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Analysis Complete",
        description: "Your media has been analyzed successfully.",
      });
      setLocation(`/results/${data.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze media. Please try again.",
        variant: "destructive",
      });
    },
  });

  const acceptedTypes = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    'video/*': ['.mp4', '.mov', '.avi', '.webm'],
    'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'],
    'application/pdf': ['.pdf'],
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage className="w-8 h-8" />;
    if (type.startsWith('video/')) return <FileVideo className="w-8 h-8" />;
    if (type.startsWith('audio/')) return <FileAudio className="w-8 h-8" />;
    return <FileText className="w-8 h-8" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    uploadMutation.mutate(selectedFile);
  };

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Analyze Media</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload an image, video, audio file, or document to detect deepfakes and verify authenticity
          </p>
        </div>

        <Card className="mb-8" data-testid="card-upload">
          <CardHeader>
            <CardTitle>Upload Media File</CardTitle>
            <CardDescription>
              Supported formats: Images (JPG, PNG, GIF, WebP), Videos (MP4, MOV, AVI, WebM), 
              Audio (MP3, WAV, OGG, M4A), Documents (PDF)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`
                border-2 border-dashed rounded-md p-12 text-center transition-colors
                ${isDragging ? 'border-primary bg-primary/5' : 'border-border'}
                ${!selectedFile && !uploadMutation.isPending ? 'hover-elevate cursor-pointer' : ''}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !selectedFile && !uploadMutation.isPending && document.getElementById('file-input')?.click()}
              data-testid="dropzone-upload"
            >
              {!selectedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <UploadIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-2">Drag and drop your file here</p>
                    <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                    <Button variant="outline" data-testid="button-browse">
                      Browse Files
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 100MB
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {getFileIcon(selectedFile.type)}
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1" data-testid="text-filename">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground" data-testid="text-filesize">
                      {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Unknown type'}
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                      }}
                      disabled={uploadMutation.isPending}
                      data-testid="button-remove"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}

              <input
                id="file-input"
                type="file"
                className="hidden"
                accept={Object.keys(acceptedTypes).join(',')}
                onChange={handleFileSelect}
                disabled={uploadMutation.isPending}
                data-testid="input-file"
              />
            </div>

            {selectedFile && !uploadMutation.isPending && (
              <div className="mt-6">
                <Button 
                  className="w-full gap-2" 
                  size="lg"
                  onClick={handleAnalyze}
                  data-testid="button-analyze"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Analyze for Deepfakes
                </Button>
              </div>
            )}

            {uploadMutation.isPending && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Analyzing media...</span>
                  <span className="font-mono font-medium">Processing</span>
                </div>
                <Progress value={undefined} data-testid="progress-upload" className="animate-pulse" />
                <p className="text-xs text-muted-foreground text-center">
                  Running multimodal analysis with CNN, RNN, and transformer models
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover-elevate" data-testid="card-feature-speed">
            <CardHeader>
              <div className="w-10 h-10 rounded-md bg-chart-1/10 text-chart-1 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Real-Time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get credibility scores and manipulation indicators in seconds using our cloud-native infrastructure
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="card-feature-accuracy">
            <CardHeader>
              <div className="w-10 h-10 rounded-md bg-chart-2/10 text-chart-2 flex items-center justify-center mb-3">
                <AlertCircle className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Multi-Format Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analyze images, videos, audio, and documents with cross-format deepfake detection
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="card-feature-reports">
            <CardHeader>
              <div className="w-10 h-10 rounded-md bg-chart-3/10 text-chart-3 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Plain-Language Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Receive intelligible credibility reports suitable for legal proceedings and journalistic use
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate" data-testid="card-feature-privacy">
            <CardHeader>
              <div className="w-10 h-10 rounded-md bg-chart-4/10 text-chart-4 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your files are processed securely and deleted after analysis. We never store your sensitive media
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
