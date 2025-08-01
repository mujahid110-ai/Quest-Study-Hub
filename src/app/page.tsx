
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Check, GraduationCap, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { departments } from '@/lib/data';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import type { Material } from '@/lib/types';
import MaterialCard from '@/components/material-card';
import { Skeleton } from '@/components/ui/skeleton';


export default function Home() {

  const [recentMaterials, setRecentMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentMaterials = async () => {
      setLoading(true);
      try {
        const materialsRef = collection(db, 'materials');
        const q = query(
          materialsRef,
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const materials = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
            } as Material;
        });
        
        const approvedMaterials = materials.filter(m => m.status === 'approved').slice(0, 8);
        setRecentMaterials(approvedMaterials);

      } catch (error) {
        console.error("Failed to fetch recent materials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMaterials();
  }, []);

  return (
    <div className="flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-24 lg:pb-32 bg-gradient-to-r from-[#e0f7ff] to-white">
        <div className="container px-4 md:px-6 z-10">
          <div className="grid grid-cols-1">
            <div className="flex flex-col justify-center space-y-4 text-center zoom-in">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/tight text-gray-900">
                  Welcome to 
                  <span className="text-gradient"> QUEST Study Hub</span>
                </h1>
                <p className="max-w-[700px] text-gray-700 md:text-xl mx-auto">
                Access and Share Verified Academic Materials from QUEST Nawabshah
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row mx-auto" >
                <Button asChild size="lg" className="group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                  <Link href="/past-papers">
                    <BookOpen className="mr-2 h-5 w-5" /> Browse Materials
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="shadow-sm transition-all duration-300 hover:scale-105 hover:bg-primary/5">
                  <Link href="/register">
                     Register Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why use section */}
      <section id="why-use" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center fade-in-up">
            <div className="space-y-2">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Why Use QUEST Study Hub?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A platform built by students, for students, to make academic life easier.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
            {[
              { icon: UploadCloud, title: 'Upload Study Materials', description: 'Contribute your study materials to the community with a simple and secure upload process.' },
              { icon: Check, title: 'Admin Verified for Quality', description: 'All uploaded materials are reviewed by admins to ensure quality and relevance for your studies.' },
              { icon: BookOpen, title: 'Organized by Subject & Semester', description: 'Find all your course materials—past papers, notes, and lab manuals—in one organized place.' },
            ].map(({ icon: Icon, title, description }, index) => (
              <Card key={title} className="bg-card border-border h-full hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-2 duration-300 fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader className="items-center text-center">
                  <div className="p-4 bg-primary/10 rounded-full inline-flex mb-4 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="font-headline text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground text-center">
                  <p>{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center fade-in-up">
                <div className="space-y-2">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Departments We Support</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Covering a wide range of engineering and technology fields at QUEST.
                    </p>
                </div>
            </div>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {departments.map((dept, index) => (
                    <Link href={`/past-papers?department=${encodeURIComponent(dept.name)}`} key={dept.id}>
                        <div className="bg-card p-4 rounded-lg border text-center font-semibold text-muted-foreground hover:bg-primary/5 hover:text-primary hover:shadow-md transition-all fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                            {dept.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>
      
      {/* Recently Approved Section */}
      <section id="recent" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center fade-in-up">
                <div className="space-y-2">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Recently Approved Uploads</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Check out the latest materials contributed by the community.
                    </p>
                </div>
            </div>
            <div className="mt-12 fade-in-up" style={{animationDelay: '300ms'}}>
               <Carousel 
                 opts={{
                    align: "start",
                    loop: recentMaterials.length > 3,
                 }}
                 className="w-full"
               >
                 <CarouselContent>
                   {loading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                          <div className="p-1">
                             <Skeleton className="h-[400px] w-full" />
                          </div>
                        </CarouselItem>
                      ))
                   ) : recentMaterials.length > 0 ? (
                      recentMaterials.map((material) => (
                        <CarouselItem key={material.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                          <div className="p-1 h-full">
                            <MaterialCard material={material} />
                          </div>
                        </CarouselItem>
                      ))
                   ) : (
                      <div className="w-full col-span-full text-center py-16 text-muted-foreground bg-card rounded-lg border border-dashed">
                        <p>No recent materials have been approved yet. Check back soon!</p>
                      </div>
                   )}
                 </CarouselContent>
                 <CarouselPrevious className="hidden md:flex" />
                 <CarouselNext className="hidden md:flex"/>
               </Carousel>
            </div>
        </div>
      </section>


      {/* CTA Section */}
      <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container fade-in-up">
          <div className="mx-auto max-w-4xl text-center bg-card p-8 sm:p-12 rounded-2xl shadow-lg border">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-foreground">
              Join the Community & Share Your Knowledge
            </h2>
            <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
             Become a part of the QUEST Study Hub. Upload your materials, help fellow students, and contribute to our collaborative learning environment. Your contributions make a real difference.
            </p>
            <div className="mt-8 flex justify-center">
               <Button asChild size="lg" className="group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                  <Link href="/upload">
                    Upload Materials <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
               </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
