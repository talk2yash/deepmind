import { useLayoutEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileSearch, Brain, Zap, CheckCircle2, XCircle, Briefcase, Building2, Landmark, Users, Upload, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/ai_neural_network_hero_background.png";
import { scrollManager } from "@/lib/scrollManager";

export default function Home() {
  const featuresRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  // Register sections synchronously on every render using layout effect
  // This ensures sections are always registered before user interactions
  useLayoutEffect(() => {
    if (featuresRef.current) {
      scrollManager.registerSection('features', featuresRef.current);
    }
    if (pricingRef.current) {
      scrollManager.registerSection('pricing', pricingRef.current);
    }

    // Cleanup on unmount
    return () => {
      scrollManager.registerSection('features', null);
      scrollManager.registerSection('pricing', null);
    };
  }); // No dependencies - runs on every render to maintain registry

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-20 md:py-32 text-center">
          <Badge className="mb-6" variant="secondary" data-testid="badge-sdg">
            SDG 16: Peace, Justice, and Strong Institutions
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            DeepMinds
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4">
            Deepfake Detection & Digital Evidence Authentication
          </p>
          
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-8">
            AI-powered platform that cross-analyzes media formats in real-time to detect manipulations, 
            generate credibility reports, and safeguard truth in journalism, legal proceedings, and democratic discourse.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link href="/upload">
              <Button size="lg" className="gap-2" data-testid="button-analyze-media">
                <Upload className="w-5 h-5" />
                Analyze Media Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 bg-background/50 backdrop-blur-sm" data-testid="button-view-demo">
              Watch Demo
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="mt-12 text-sm text-muted-foreground">
            Trusted by 100+ newsrooms, legal firms, and government agencies
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-16 md:py-24 bg-card" data-testid="section-problem">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">The Deepfake Crisis</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              AI-generated deepfakes and manipulated media threaten journalistic integrity, 
              legal proceedings, and democratic discourse worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate" data-testid="card-problem-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <CardTitle>Misinformation Spread</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Synthetic media undermines public trust and spreads false narratives at unprecedented scale, 
                  threatening democratic institutions and social cohesion.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-problem-2">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <CardTitle>Legal Evidence Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  With 3.5 crore pending cases in India, courts struggle to verify digital evidence authenticity, 
                  delaying justice and increasing costs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-problem-3">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-destructive/10 text-destructive flex items-center justify-center mb-4">
                  <XCircle className="w-6 h-6" />
                </div>
                <CardTitle>Manual Verification Fails</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Current tools are time-consuming, error-prone, and can't keep pace with rapidly 
                  evolving deepfake generation techniques.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Features */}
      <section ref={featuresRef} id="features" className="py-16 md:py-24" data-testid="section-solution">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Solution</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              First-of-its-kind GenAI-powered platform combining multimodal forensic analysis 
              with plain-language credibility reports for journalists, legal professionals, and institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover-elevate" data-testid="card-feature-multimodal">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6" />
                </div>
                <CardTitle>Multimodal Analysis</CardTitle>
                <CardDescription>Cross-format Detection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analyzes images, videos, audio, and text metadata simultaneously using ensemble algorithms 
                  and deep learning models (CNN, RNN, transformers).
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-realtime">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <CardTitle>Real-Time Processing</CardTitle>
                <CardDescription>Instant Results</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get credibility scores and manipulation indicators in seconds, not hours. 
                  Cloud-native architecture ensures scalability and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-reports">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <FileSearch className="w-6 h-6" />
                </div>
                <CardTitle>Plain-Language Reports</CardTitle>
                <CardDescription>Legal & Journalistic Ready</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Intelligible credibility reports with manipulation evidence visualizations, 
                  designed for legal admissibility and media workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-forensic">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle>Forensic Algorithms</CardTitle>
                <CardDescription>Statistical Watermarking</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Combines forensic algorithms, statistical watermarking, and GenAI large language models 
                  for comprehensive manipulation detection.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-vernacular">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>Vernacular Support</CardTitle>
                <CardDescription>Regional Languages</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Analyzes media in vernacular languages, crucial for India's diverse linguistic landscape 
                  and regional journalism ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-feature-api">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <CardTitle>API & SDK Integration</CardTitle>
                <CardDescription>Seamless Workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Integrate directly into existing legal and media platforms via comprehensive APIs, 
                  ensuring smooth adoption without workflow disruption.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-card" data-testid="section-comparison">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">How We Compare</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              DeepMinds addresses critical gaps left by existing solutions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-comparison">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Solution</th>
                  <th className="text-left p-4 font-semibold">Strengths</th>
                  <th className="text-left p-4 font-semibold">Limitations</th>
                  <th className="text-left p-4 font-semibold">Accessibility</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover-elevate" data-testid="row-fakecatcher">
                  <td className="p-4 font-medium">Intel FakeCatcher</td>
                  <td className="p-4 text-muted-foreground">96% accuracy, real-time blood flow analysis</td>
                  <td className="p-4 text-destructive">Video only, requires specialized hardware</td>
                  <td className="p-4">
                    <Badge variant="destructive">Enterprise Only</Badge>
                  </td>
                </tr>
                <tr className="border-b hover-elevate" data-testid="row-reality-defender">
                  <td className="p-4 font-medium">Reality Defender</td>
                  <td className="p-4 text-muted-foreground">Multi-modal detection (audio/video/text)</td>
                  <td className="p-4 text-destructive">₹4-8L/year, black-box outputs, US-focused</td>
                  <td className="p-4">
                    <Badge variant="destructive">Expensive</Badge>
                  </td>
                </tr>
                <tr className="border-b hover-elevate" data-testid="row-sensity">
                  <td className="p-4 font-medium">Sensity AI</td>
                  <td className="p-4 text-muted-foreground">Monitors 9,000+ sources for identity verification</td>
                  <td className="p-4 text-destructive">No journalist interface, no legal workflow integration</td>
                  <td className="p-4">
                    <Badge variant="secondary">KYC Focused</Badge>
                  </td>
                </tr>
                <tr className="border-b hover-elevate" data-testid="row-weverify">
                  <td className="p-4 font-medium">WeVerify/InVID</td>
                  <td className="p-4 text-muted-foreground">Free browser extension, metadata extraction</td>
                  <td className="p-4 text-destructive">No AI deepfake detection, manual verification required</td>
                  <td className="p-4">
                    <Badge>Free</Badge>
                  </td>
                </tr>
                <tr className="border-b hover-elevate" data-testid="row-cognitech">
                  <td className="p-4 font-medium">Cognitech/Amped</td>
                  <td className="p-4 text-muted-foreground">Professional-grade video analysis suites</td>
                  <td className="p-4 text-destructive">₹12-40L cost, steep learning curve, desktop-only</td>
                  <td className="p-4">
                    <Badge variant="destructive">Forensic Experts</Badge>
                  </td>
                </tr>
                <tr className="bg-primary/5 border-b" data-testid="row-deepminds">
                  <td className="p-4 font-bold">DeepMinds</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Multi-modal
                      </Badge>
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Real-time
                      </Badge>
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Plain reports
                      </Badge>
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        API/SDK
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">Requires quarterly model updates</td>
                  <td className="p-4">
                    <Badge>Freemium + Pro</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="py-16 md:py-24" data-testid="section-markets">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Target Markets</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Serving critical sectors that depend on media authenticity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="hover-elevate" data-testid="card-market-journalism">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-chart-1/10 text-chart-1 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle>Journalism</CardTitle>
                <CardDescription>100,000+ Journalists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold font-mono">5-10 hrs</div>
                  <div className="text-sm text-muted-foreground">Saved per week on verification</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono">₹50L</div>
                  <div className="text-sm text-muted-foreground">Annual productivity boost per newsroom</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-market-legal">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-chart-2/10 text-chart-2 flex items-center justify-center mb-4">
                  <Landmark className="w-6 h-6" />
                </div>
                <CardTitle>Legal System</CardTitle>
                <CardDescription>3.5 Crore Pending Cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold font-mono">60%</div>
                  <div className="text-sm text-muted-foreground">Reduction in evidence analysis costs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono">Faster</div>
                  <div className="text-sm text-muted-foreground">Automated preliminary screening</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-market-government">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-chart-3/10 text-chart-3 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <CardTitle>Government</CardTitle>
                <CardDescription>Election Commission, PIB</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold font-mono">2026-29</div>
                  <div className="text-sm text-muted-foreground">State elections monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono">Real-time</div>
                  <div className="text-sm text-muted-foreground">Campaign content verification</div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate" data-testid="card-market-insurance">
              <CardHeader>
                <div className="w-12 h-12 rounded-md bg-chart-4/10 text-chart-4 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6" />
                </div>
                <CardTitle>Insurance/Banking</CardTitle>
                <CardDescription>Fraud Prevention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-3xl font-bold font-mono">₹3.8Cr</div>
                  <div className="text-sm text-muted-foreground">Average deepfake fraud cost per incident</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-mono">70-80%</div>
                  <div className="text-sm text-muted-foreground">Detection saves</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-16 md:py-24 bg-card" data-testid="section-architecture">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Technical Architecture</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Multimodal neural networks and ensemble approach for comprehensive analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card data-testid="card-arch-input">
              <CardHeader>
                <CardTitle className="text-center">Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  Image, Video, Audio, Text
                </div>
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  Metadata extraction
                </div>
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  Format validation
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-arch-analysis">
              <CardHeader>
                <CardTitle className="text-center">Analysis Engine</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-primary/10 rounded-md text-sm font-mono text-center">
                  CNN • RNN • Transformers
                </div>
                <div className="p-3 bg-primary/10 rounded-md text-sm font-mono text-center">
                  Xception • DIRE Models
                </div>
                <div className="p-3 bg-primary/10 rounded-md text-sm font-mono text-center">
                  Forensic Algorithms
                </div>
                <div className="p-3 bg-primary/10 rounded-md text-sm font-mono text-center">
                  Statistical Watermarking
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-arch-output">
              <CardHeader>
                <CardTitle className="text-center">Output</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  Credibility Score (0-100)
                </div>
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  Manipulation Indicators
                </div>
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  Plain-language Report
                </div>
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  Source Provenance Trace
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Powered by ensemble approach with quarterly model updates</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary">Cloud-Native</Badge>
              <Badge variant="secondary">Scalable</Badge>
              <Badge variant="secondary">SDK/API Ready</Badge>
              <Badge variant="secondary">Legal Admissible</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-16 md:py-24" data-testid="section-pricing">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Pricing Plans</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing for individuals, professionals, and enterprises
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card data-testid="card-pricing-free">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>For students & freelancers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>5 scans per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Basic credibility reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Community support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" data-testid="button-pricing-free">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary" data-testid="card-pricing-professional">
              <CardHeader>
                <Badge className="w-fit mb-2">Most Popular</Badge>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For journalists & researchers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹2,999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Unlimited scans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Detailed technical reports</span>
                  </li>
                </ul>
                <Button className="w-full" data-testid="button-pricing-professional">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-pricing-enterprise">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For organizations</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹50,000</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>White-label solution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Custom integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>SLA guarantees</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" data-testid="button-pricing-enterprise">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-pricing-legal">
              <CardHeader>
                <CardTitle>Legal</CardTitle>
                <CardDescription>For law firms & courts</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹1,00,000</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Expert witness support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Chain-of-custody certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Legal admissibility reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                    <span>Compliance documentation</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline" data-testid="button-pricing-legal">
                  Contact Legal Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Ready to Safeguard Truth?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join 100+ newsrooms, legal firms, and institutions using DeepMinds to combat misinformation
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-start">
                Start Analyzing Media
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20" data-testid="button-cta-contact">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
