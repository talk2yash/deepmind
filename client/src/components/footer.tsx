import { Link } from "wouter";
import { Shield, Twitter, Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 hover-elevate w-fit px-2 py-1 rounded-md -ml-2 cursor-pointer">
                <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">DeepMinds</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              AI-powered deepfake detection and digital evidence authentication for journalism, legal, and institutional use.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">SDG 16</Badge>
              <Badge variant="secondary">ISO Certified</Badge>
              <Badge variant="secondary">Legal Ready</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="social-twitter">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="social-linkedin">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="social-github">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/upload">
                  <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-analyze">
                    Analyze Media
                  </Button>
                </Link>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-features">
                  Features
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-pricing">
                  Pricing
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-api">
                  API Documentation
                </Button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-blog">
                  Blog
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-case-studies">
                  Case Studies
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-white-papers">
                  White Papers
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-help">
                  Help Center
                </Button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-privacy">
                  Privacy Policy
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-terms">
                  Terms of Service
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-security">
                  Security
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 text-muted-foreground hover:text-foreground" data-testid="footer-compliance">
                  Compliance
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest news on deepfake detection and AI security
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 DeepMinds. All rights reserved.</p>
          <p className="text-center md:text-right">
            Built with AI-powered forensic analysis • Protecting truth in the digital age
          </p>
        </div>
      </div>
    </footer>
  );
}
