
"use client";

import { Users, Code, Brush, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const teamMembers = [
  {
    name: "Mujahid Hussain",
    role: "Lead Full Stack Developer",
    avatarFallback: "MH",
    avatarImage: "/images/team-mujahid.png",
    socials: {
        linkedin: "#",
        github: "#"
    }
  },
  {
    name: "Ghulam Mustafa",
    role: "Full Stack Developer",
    avatarFallback: "GM",
    avatarImage: "/images/team-mustafa.png",
     socials: {
        linkedin: "#",
        github: "#"
    }
  },
  {
    name: "Vishwas Suthar",
    role: "UI/UX Designer",
    avatarFallback: "VS",
    avatarImage: "/images/team-vishwas.png",
     socials: {
        linkedin: "#",
        github: "#"
    }
  }
];


export default function AboutPage() {

  return (
    <div className="bg-background text-foreground">
       <div className="container py-12 md:py-24">
         <div className="text-center mb-16 px-4 fade-in-up">
              <h1 className="font-headline text-4xl md:text-5xl font-bold flex items-center justify-center gap-3">
                <Users className="h-10 w-10 text-primary" />
                About QUEST Study Hub
              </h1>
              <p className="text-muted-foreground text-lg mt-4 max-w-3xl mx-auto">
                  Learn about the vision and the creators behind this platform.
              </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground text-center fade-in-up" style={{ animationDelay: '200ms' }}>
             <p>
                QUEST Study Hub is a student-driven platform built to help students access and share academic resources like past papers, notes, and lab manuals. Designed for QUEST Nawabshah, it aims to improve collaboration and access to quality study material.
              </p>
              <p>
                The platform ensures content is properly categorized by department, semester, and subject. Each upload goes through an admin approval process for accuracy.
              </p>
          </div>

          <div className="text-center mt-20 mb-12 px-4 fade-in-up" style={{ animationDelay: '400ms' }}>
            <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Meet Our Team
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
               <div key={member.name} className="fade-in-up" style={{ animationDelay: `${600 + index * 200}ms` }}>
                 <Card className="text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group bg-card">
                    <CardContent className="pt-6">
                        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-transparent group-hover:border-primary transition-colors">
                           <AvatarImage src={member.avatarImage} alt={member.name} data-ai-hint="profile picture" />
                           <AvatarFallback className="text-3xl bg-secondary">{member.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-xl font-bold font-headline text-foreground">{member.name}</h3>
                        <p className="text-primary font-medium">{member.role}</p>
                        <div className="flex justify-center gap-4 mt-4 text-muted-foreground">
                            <Link href={member.socials.linkedin} className="hover:text-primary"><Linkedin size={20}/></Link>
                            <Link href={member.socials.github} className="hover:text-primary"><Github size={20}/></Link>
                        </div>
                    </CardContent>
                 </Card>
               </div>
            ))}
          </div>

        </div>
    </div>
  );
}
