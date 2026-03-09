import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Leaf, 
  BarChart3, 
  Building2, 
  Calculator, 
  FileUp, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Menu,
  X,
  Globe2,
  Users,
  Zap,
  TrendingUp,
  Lock
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useJoinWaitlist, useSubmitContact } from "@/hooks/use-landing";
import { api } from "@shared/routes";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-panel py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">CarbonOps</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo("problem")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">The Problem</button>
              <button onClick={() => scrollTo("features")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</button>
              <button onClick={() => scrollTo("audience")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">For Who</button>
              <Button 
                onClick={() => scrollTo("waitlist")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6 shadow-lg shadow-primary/20"
              >
                Join Waitlist
              </Button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-24 px-4 flex flex-col gap-4 md:hidden">
          <button onClick={() => scrollTo("problem")} className="text-lg font-medium p-4 text-left border-b border-border">The Problem</button>
          <button onClick={() => scrollTo("features")} className="text-lg font-medium p-4 text-left border-b border-border">Features</button>
          <button onClick={() => scrollTo("audience")} className="text-lg font-medium p-4 text-left border-b border-border">For Who</button>
          <div className="p-4 mt-4">
            <Button 
              onClick={() => scrollTo("waitlist")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-14 rounded-xl"
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Platform in Active Development
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
              Carbon accounting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">without spreadsheets</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              CarbonOps helps consultants and companies collect activity data, apply emission factors, calculate Scope 1, Scope 2, and Scope 3 emissions, and generate carbon footprint reports — all in one platform.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={() => scrollTo("waitlist")}
                size="lg" 
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
              >
                Request Early Access <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                onClick={() => scrollTo("features")}
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl border-border hover:bg-secondary/50 transition-all duration-300"
              >
                Explore Features
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Abstract decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl -z-10 mix-blend-multiply"></div>
      </section>

      {/* Credibility Section */}
      <section className="py-16 bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h3 variants={fadeIn} className="text-lg font-semibold text-primary mb-4">
              Built around recognized carbon accounting standards
            </motion.h3>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Aligned with the GHG Protocol framework
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Supports Scope 1, Scope 2, and Scope 3 calculations
              </span>
              <span className="hidden sm:inline text-border">•</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Designed for consultants and sustainability teams
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Carbon accounting is still spreadsheet-driven</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Carbon footprint work is still mostly done in spreadsheets. Teams pull data from different sources, apply factors manually, and spend too much time preparing reports. As reporting demands grow, this approach becomes hard to manage.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Spreadsheet complexity leads to calculation errors",
                  "Data is scattered across teams and files",
                  "Emission factors become outdated or inconsistent",
                  "Reporting prep takes too much time"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-destructive/10 to-transparent rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
              <Card className="border-border shadow-xl overflow-hidden rounded-3xl">
                <div className="bg-muted px-4 py-3 border-b flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="ml-4 text-xs font-mono text-muted-foreground">Emissions_Master_vFINAL_v2.xlsx</div>
                </div>
                <div className="p-6 overflow-hidden">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-destructive/10 rounded w-3/4"></div>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className={`h-6 rounded ${i % 3 === 0 ? 'bg-destructive/20' : 'bg-muted'} ${i === 5 || i === 7 ? 'border border-destructive' : ''}`}></div>
                      ))}
                    </div>
                    <div className="text-xs text-destructive mt-4 flex items-center gap-1 font-mono">
                      <span>#REF!</span> Error: Cell reference missing
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">One centralized workspace for carbon accounting</h2>
            <p className="text-xl text-background/80 mb-12">
              CarbonOps replaces spreadsheet-based workflows with a centralized workspace where emissions data, emission factors, and reports can be managed in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Core capabilities</h2>
            <p className="text-lg text-muted-foreground">Measure your emissions first, then turn that data into clear decarbonisation opportunities.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-primary" />}
              title="Multi-Client Workspace"
              description="Consultants can manage carbon accounting for multiple organizations from one dashboard."
              delay={0.1}
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-primary" />}
              title="Emissions Dashboard"
              description="Companies can track emissions across operations and reporting periods."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Emission Factor Engine"
              description="Apply emission factors automatically based on region, category, and reporting year."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Calculator className="w-6 h-6 text-primary" />}
              title="Scope 1, 2, and 3 Calculations"
              description="Built-in carbon accounting engine aligned with GHG Protocol standards."
              delay={0.4}
            />
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Decarbonisation Insights"
              description="Understand where emissions are coming from and identify potential reduction opportunities based on activity data."
              delay={0.5}
            />
            <FeatureCard 
              icon={<FileUp className="w-6 h-6 text-primary" />}
              title="Data Import via CSV"
              description="Upload activity data from spreadsheets or exported operational systems."
              delay={0.6}
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-primary" />}
              title="Automated Reports"
              description="Generate structured carbon footprint reports ready for ESG disclosures."
              delay={0.7}
            />
            <FeatureCard 
              icon={<Lock className="w-6 h-6 text-primary" />}
              title="Audit-Ready Factor Traceability"
              description="Every emission factor used in calculations is recorded and traceable for reporting."
              delay={0.8}
            />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">How CarbonOps fits into your workflow</h2>
            <p className="text-lg text-muted-foreground">Carbon accounting should be straightforward. CarbonOps organizes the process from data collection to reporting in a structured workflow.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <WorkflowStep 
              number={1}
              title="Collect activity data"
              description="Upload energy, fuel, travel, and procurement data from spreadsheets or operational systems."
              delay={0.1}
            />
            <WorkflowStep 
              number={2}
              title="Emission factors"
              description="The platform automatically applies emission factors based on region, category, and reporting year."
              delay={0.2}
            />
            <WorkflowStep 
              number={3}
              title="Calculate emissions"
              description="Generate Scope 1, Scope 2, and Scope 3 emissions aligned with GHG Protocol."
              delay={0.3}
            />
            <WorkflowStep 
              number={4}
              title="Generate reports"
              description="Create structured carbon footprint reports ready for sustainability reporting and client delivery."
              delay={0.4}
            />
            <WorkflowStep 
              number={5}
              title="Identify opportunities"
              description="Understand emission hotspots and explore decarbonisation opportunities."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* From Measurement to Decarbonisation Section */}
      <section className="py-24 bg-background relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">From measurement to decarbonisation</h2>
            <p className="text-lg text-muted-foreground">Once emissions are measured, the platform helps identify reduction opportunities.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Identify hotspots"
              description="Identify emission hotspots across operations."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-primary" />}
              title="Reduction opportunities"
              description="Highlight high-impact reduction opportunities."
              delay={0.2}
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-primary" />}
              title="Compare over time"
              description="Compare emissions across reporting periods."
              delay={0.3}
            />
            <FeatureCard 
              icon={<CheckCircle2 className="w-6 h-6 text-primary" />}
              title="Track progress"
              description="Track progress toward reduction targets."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* Built by Neucem Section */}
      <section className="py-16 bg-primary/5 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h3 variants={fadeIn} className="text-lg font-semibold text-primary mb-4">
              Built by Neucem
            </motion.h3>
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              CarbonOps is developed by the engineering team at Neucem, an AI and software solutions company focused on building scalable digital platforms. The platform combines carbon accounting workflows with modern software infrastructure to simplify emissions tracking and reporting.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Audience Section */}
      <section id="audience" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">Built for climate leaders</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <AudienceCard 
              title="ESG Consultants"
              items={["Manage carbon accounting for multiple client organizations", "Streamline reporting workflows", "Standardize carbon accounting methodology"]}
              delay={0.1}
            />
            <AudienceCard 
              title="Sustainability Advisors"
              items={["Analyze emissions data and support reduction strategies", "Identify high-impact reduction opportunities", "Track impact of sustainability initiatives"]}
              delay={0.2}
              featured
            />
            <AudienceCard 
              title="Companies / SMEs"
              items={["Track emissions internally", "Collaborate with external consultants", "Prepare for ESG reporting and disclosure"]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-24 bg-primary relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2Mmg0djRoMnYtNGg0VjJoLTR6bS0xOCAxMnYtNGgtMnY0aC00djJoNHY0aDJ2LTRoNHYtMmgtNHptMC0xMlYwaC0ydjRoLTR2Mmg0djRoMnYtNGg0VjJoLTR6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9zdmc+')]"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Join early access
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              CarbonOps is currently being developed. Early users help shape the product and get access before the full launch. If you're a consultant or company ready to simplify your carbon accounting, join the waitlist.
            </p>

            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Get in touch</h2>
            <p className="text-muted-foreground">Have questions? Want to learn more? Use this form to ask questions, request a conversation, or join early access.</p>
          </div>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground py-12 text-center text-background/60">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-xl text-background">CarbonOps</span>
        </div>
        <p>© {new Date().getFullYear()} CarbonOps. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Sub-components

function WorkflowStep({ number, title, description, delay }: { number: number, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <div className="bg-card border border-border rounded-2xl p-6 h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold font-display flex-shrink-0">
            {number}
          </div>
          <h3 className="text-lg font-bold font-display text-foreground">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  );
}

function AudienceCard({ title, items, delay, featured = false }: { title: string, items: string[], delay: number, featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-3xl p-8 ${
        featured 
          ? "bg-foreground text-background shadow-2xl relative -translate-y-2" 
          : "bg-card border border-border"
      }`}
    >
      {featured && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Most Popular
        </div>
      )}
      <h3 className={`text-2xl font-display font-bold mb-8 ${featured ? "text-background" : "text-foreground"}`}>{title}</h3>
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 className={`w-6 h-6 flex-shrink-0 ${featured ? "text-primary" : "text-primary"}`} />
            <span className={featured ? "text-background/90" : "text-muted-foreground"}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function WaitlistForm() {
  const { mutate: joinWaitlist, isPending } = useJoinWaitlist();
  
  const form = useForm<z.infer<typeof api.waitlist.join.input>>({
    resolver: zodResolver(api.waitlist.join.input),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: z.infer<typeof api.waitlist.join.input>) => {
    joinWaitlist(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  placeholder="Enter your work email" 
                  className="h-14 bg-background border-transparent focus-visible:ring-2 focus-visible:ring-white/20 text-foreground rounded-xl text-lg px-6"
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-primary-foreground/90 font-medium text-left ml-2" />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={isPending}
          className="h-14 px-8 bg-foreground hover:bg-foreground/90 text-background text-lg font-semibold rounded-xl shadow-lg transition-transform active:scale-95 whitespace-nowrap"
        >
          {isPending ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>
    </Form>
  );
}

function ContactForm() {
  const { mutate: submitContact, isPending } = useSubmitContact();
  
  const form = useForm<z.infer<typeof api.contact.submit.input>>({
    resolver: zodResolver(api.contact.submit.input),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: z.infer<typeof api.contact.submit.input>) => {
    submitContact(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <Card className="shadow-lg border-border/50">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" className="h-12 bg-muted/50 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jane@company.com" className="h-12 bg-muted/50 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How can we help you?" 
                      className="min-h-[120px] resize-none bg-muted/50 rounded-xl p-4" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary/90"
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// Missing icon fallback
function DatabaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
