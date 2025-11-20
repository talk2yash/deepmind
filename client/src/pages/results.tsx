import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle2, XCircle, Download, Share2, FileText, AlertTriangle, Info, Loader2 } from "lucide-react";
import type { MediaScan, ManipulationIndicator, TechnicalAnalysis } from "@shared/schema";

export default function Results() {
  const params = useParams();
  const scanId = params.id;

  const { data: scan, isLoading, error } = useQuery<MediaScan>({
    queryKey: ['/api/scans', scanId],
    enabled: !!scanId,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-500';
      case 'low':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <XCircle className="w-5 h-5" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5" />;
      case 'low':
        return <Info className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getAuthenticityBadge = (score: number) => {
    if (score >= 80) {
      return <Badge className="gap-1 bg-green-600 dark:bg-green-700 text-white dark:text-white border-green-700 dark:border-green-600"><CheckCircle2 className="w-3 h-3" />Likely Authentic</Badge>;
    } else if (score >= 50) {
      return <Badge className="gap-1 bg-yellow-600 dark:bg-yellow-700 text-white dark:text-white border-yellow-700 dark:border-yellow-600"><AlertTriangle className="w-3 h-3" />Uncertain</Badge>;
    } else {
      return <Badge className="gap-1" variant="destructive"><XCircle className="w-3 h-3" />Likely Manipulated</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Link href="/upload">
              <Button variant="outline" className="gap-2 mb-4" data-testid="button-back-loading">
                ← Back to Upload
              </Button>
            </Link>
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scan) {
    return (
      <div className="min-h-screen py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-6">
            <XCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Analysis Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The analysis you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/upload">
            <Button data-testid="button-analyze-new-error">
              Analyze New Media
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const manipulationIndicators = scan.manipulationIndicators as ManipulationIndicator[];
  const technicalAnalysis = scan.technicalAnalysis as TechnicalAnalysis;

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Link href="/upload">
            <Button variant="outline" className="gap-2 mb-4" data-testid="button-back">
              ← Back to Upload
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Analysis Results</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive deepfake detection report for your media file
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card data-testid="card-credibility-score">
              <CardHeader>
                <CardTitle>Credibility Score</CardTitle>
                <CardDescription>Overall authenticity assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="relative inline-flex items-center justify-center w-40 h-40 mb-4">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - scan.credibilityScore / 100)}`}
                        className={scan.credibilityScore >= 80 ? "text-green-600" : scan.credibilityScore >= 50 ? "text-yellow-600" : "text-destructive"}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold font-mono" data-testid="text-score">{scan.credibilityScore}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {getAuthenticityBadge(scan.credibilityScore)}
                    <p className="text-sm text-muted-foreground font-medium">{scan.confidenceRating}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File:</span>
                    <span className="font-medium truncate ml-2" data-testid="text-filename">{scan.fileName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-mono text-xs" data-testid="text-filetype">{scan.fileType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-mono text-xs">{(scan.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-actions">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full gap-2" variant="outline" data-testid="button-download-report">
                  <Download className="w-4 h-4" />
                  Download Full Report
                </Button>
                <Button className="w-full gap-2" variant="outline" data-testid="button-share">
                  <Share2 className="w-4 h-4" />
                  Share Results
                </Button>
                <Link href="/upload">
                  <Button className="w-full gap-2" data-testid="button-analyze-new">
                    <FileText className="w-4 h-4" />
                    Analyze Another File
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Card data-testid="card-explanation">
              <CardHeader>
                <CardTitle>Analysis Explanation</CardTitle>
                <CardDescription>Plain-language summary of findings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {scan.explanation}
                </p>
              </CardContent>
            </Card>

            {manipulationIndicators.length > 0 && (
              <Card data-testid="card-manipulation-indicators">
                <CardHeader>
                  <CardTitle>Manipulation Indicators</CardTitle>
                  <CardDescription>Detected anomalies and their severity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {manipulationIndicators.map((indicator, index) => (
                    <div key={index} className="space-y-3" data-testid={`indicator-${index}`}>
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 ${getSeverityColor(indicator.severity)}`}>
                          {getSeverityIcon(indicator.severity)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-semibold">{indicator.type}</h4>
                            <Badge variant="outline" className="flex-shrink-0">
                              {indicator.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{indicator.location}</p>
                          <p className="text-sm text-muted-foreground">{indicator.description}</p>
                          <div className="mt-2">
                            <Progress value={indicator.confidence} className="h-1.5" />
                          </div>
                        </div>
                      </div>
                      {index < manipulationIndicators.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card data-testid="card-technical-analysis">
              <CardHeader>
                <CardTitle>Technical Analysis</CardTitle>
                <CardDescription>Forensic markers and AI detection results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Metadata Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      {technicalAnalysis.metadata.hasBeenEdited ? (
                        <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                      <span className="text-muted-foreground">
                        {technicalAnalysis.metadata.hasBeenEdited ? 'File has been edited' : 'No editing detected'}
                      </span>
                    </div>
                    {technicalAnalysis.metadata.originalCreationDate && (
                      <div className="text-muted-foreground">
                        Created: {technicalAnalysis.metadata.originalCreationDate}
                      </div>
                    )}
                  </div>
                  {technicalAnalysis.metadata.softwareUsed && technicalAnalysis.metadata.softwareUsed.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground mb-2">Software detected:</p>
                      <div className="flex flex-wrap gap-2">
                        {technicalAnalysis.metadata.softwareUsed.map((software, idx) => (
                          <Badge key={idx} variant="secondary">{software}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Forensic Markers</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    {Object.entries(technicalAnalysis.forensicMarkers).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        {value ? (
                          <XCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        )}
                        <span className="text-muted-foreground">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">AI Detection Models</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Models used:</p>
                      <div className="flex flex-wrap gap-2">
                        {technicalAnalysis.aiDetection.modelUsed.map((model, idx) => (
                          <Badge key={idx} variant="secondary" className="font-mono">{model}</Badge>
                        ))}
                      </div>
                    </div>
                    {technicalAnalysis.aiDetection.deepfakeSignatures.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Deepfake signatures detected:</p>
                        <div className="flex flex-wrap gap-2">
                          {technicalAnalysis.aiDetection.deepfakeSignatures.map((sig, idx) => (
                            <Badge key={idx} variant="destructive">{sig}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {technicalAnalysis.aiDetection.syntheticMediaIndicators.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Synthetic media indicators:</p>
                        <div className="flex flex-wrap gap-2">
                          {technicalAnalysis.aiDetection.syntheticMediaIndicators.map((indicator, idx) => (
                            <Badge key={idx} variant="destructive">{indicator}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/50" data-testid="card-disclaimer">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-1">Important Disclaimer</p>
                    <p>
                      This analysis is provided for informational purposes and should be used as one factor in 
                      your verification process. While our AI models are highly accurate, no automated system 
                      is perfect. For critical decisions, we recommend combining this analysis with human expert 
                      review and additional verification methods.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
