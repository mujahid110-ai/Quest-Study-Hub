
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';
import { generateStudyGuide, StudyGuide } from '@/ai/flows/study-guide-flow';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export default function AiStudyGuidePage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [studyGuide, setStudyGuide] = useState<StudyGuide | null>(null);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      toast({
        variant: "destructive",
        title: "Topic is required",
        description: "Please enter a topic to generate a study guide.",
      });
      return;
    }
    setLoading(true);
    setStudyGuide(null);
    try {
      const result = await generateStudyGuide({ topic });
      setStudyGuide(result);
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "The AI failed to generate a study guide. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (authLoading || !user) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-24 bg-background text-foreground">
      <div className="text-center mb-12 fade-in-up">
        <h1 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8 text-primary" />
          AI Study Guide Generator
        </h1>
        <p className="text-muted-foreground md:text-lg mt-2 max-w-2xl mx-auto">
          Enter any academic topic and our AI will create a concise study guide with key concepts, a summary, and practice questions to help you prepare.
        </p>
      </div>

      <div className="max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '200ms' }}>
          <Card className="bg-card border shadow-lg">
            <CardHeader>
              <CardTitle>Enter Topic</CardTitle>
              <CardDescription>What subject do you want to master today?</CardDescription>
            </CardHeader>
            <CardContent>
              {isClient ? (
                <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full space-y-2">
                    <Label htmlFor="topic-input" className="sr-only">Topic</Label>
                    <Input
                      id="topic-input"
                      placeholder="e.g., 'Newton's Laws of Motion' or 'Photosynthesis'"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate'
                    )}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center justify-center h-14">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </CardContent>
          </Card>
      </div>

      {studyGuide && (
        <div className="mt-12 max-w-4xl mx-auto fade-in-up">
          <Card className="bg-card border shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Study Guide for: {studyGuide.topic}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-headline text-xl font-semibold mb-2 text-primary">Key Concepts</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {studyGuide.keyConcepts.map((concept, index) => (
                    <li key={index}>{concept}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-headline text-xl font-semibold mb-2 text-primary">Summary</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{studyGuide.summary}</p>
              </div>
              <div>
                <h3 className="font-headline text-xl font-semibold mb-2 text-primary">Practice Questions</h3>
                <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                   {studyGuide.practiceQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
