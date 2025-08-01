
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <div className="container py-12 md:py-24">
        <div className="text-center mb-16 px-4 fade-in-up">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question, feedback, or need assistance, feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="fade-in-up" style={{ animationDelay: '200ms' }}>
            <Card className="bg-card border shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                    <CardDescription>Our team will get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isClient ? (
                      <form className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <Label htmlFor="name">Name</Label>
                                  <Input id="name" placeholder="Your Name" />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input id="email" type="email" placeholder="Your Email" />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="subject">Subject</Label>
                              <Input id="subject" placeholder="Message Subject" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="message">Message</Label>
                              <Textarea id="message" placeholder="Your message..." rows={5} />
                          </div>
                          <Button type="submit" className="w-full" variant="primary">Submit Message</Button>
                      </form>
                    ) : (
                      <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg border-border">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                </CardContent>
            </Card>
          </div>
          <div className="space-y-8 fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="space-y-4">
                  <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-primary/10 text-primary rounded-lg p-3">
                          <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                          <h3 className="font-semibold text-lg text-foreground">Address</h3>
                          <p className="text-muted-foreground">QUEST, Nawabshah, Sindh, Pakistan</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-primary/10 text-primary rounded-lg p-3">
                          <Mail className="h-6 w-6" />
                      </div>
                      <div>
                          <h3 className="font-semibold text-lg text-foreground">Email</h3>
                          <p className="text-muted-foreground">contact@queststudyhub.com</p>
                      </div>
                  </div>
                  <div className="flex items-start gap-4">
                       <div className="flex-shrink-0 bg-primary/10 text-primary rounded-lg p-3">
                          <Phone className="h-6 w-6" />
                      </div>
                      <div>
                          <h3 className="font-semibold text-lg text-foreground">Phone</h3>
                          <p className="text-muted-foreground">(123) 456-7890</p>
                      </div>
                  </div>
              </div>
              <div className="mt-8 relative group">
                   <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-accent rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                   <Image src="/images/university-map.png" alt="Map of QUEST university" data-ai-hint="university map" width={600} height={400} className="rounded-lg object-cover w-full aspect-video relative shadow-lg"/>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
