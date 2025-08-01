
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { departments } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { Loader2, UploadCloud } from 'lucide-react';
import type { Material } from '@/lib/types';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = [
    'application/pdf', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword'
];

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  type: z.string({ required_error: 'Please select a material type.' }),
  department: z.string({ required_error: 'Please select a department.' }),
  semester: z.string({ required_error: 'Please select a semester.' }),
  subject: z.string({ required_error: 'Please select a subject.' }),
  file: z.instanceof(File).refine(
      (file) => file.size <= MAX_FILE_SIZE_BYTES,
      `File size must be less than ${MAX_FILE_SIZE_MB}MB.`
  ).refine(
      (file) => ALLOWED_FILE_TYPES.includes(file.type),
      'Only .pdf and .doc/.docx files are allowed.'
  )
});

export default function UploadPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const selectedDepartment = form.watch('department');
  const selectedSemester = form.watch('semester');
  
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  
  useEffect(() => {
    form.setValue('subject', '');
    if (selectedDepartment && selectedSemester) {
        const department = departments.find(d => d.name === selectedDepartment);
        const semester = department?.semesters.find(s => s.id.toString() === selectedSemester);
        setAvailableSubjects(semester?.subjects || []);
    } else {
        setAvailableSubjects([]);
    }
  }, [selectedDepartment, selectedSemester, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ variant: 'destructive', title: 'Not Authenticated', description: 'You must be logged in to upload materials.' });
        return;
    }
    setIsLoading(true);
    try {
        const file = values.file;
        const storageRef = ref(storage, `materials/${user.uid}/${Date.now()}-${file.name}`);
        
        // Upload file to Firebase Storage
        const uploadResult = await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(uploadResult.ref);

        // Add document to Firestore
        await addDoc(collection(db, 'materials'), {
            title: values.title,
            description: values.description,
            type: values.type,
            department: values.department,
            semester: parseInt(values.semester, 10),
            subject: values.subject,
            fileURL: fileURL,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploaderId: user.uid,
            uploaderName: user.fullName,
            createdAt: serverTimestamp(),
            status: 'pending',
        } as Omit<Material, 'id' | 'createdAt'>);

      toast({
        title: 'Upload Successful!',
        description: 'Your material has been submitted for review.',
      });
      router.push(`/my-uploads`);
    } catch (error) {
      console.error('Upload Error:', error);
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  if (authLoading || !user) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-3xl mx-auto fade-in-up">
        <Card className="bg-card border shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">Upload Material</CardTitle>
                <CardDescription>Share your resources with the community.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Final Term Paper 2023" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="A brief description of the material..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Material Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="past-paper">Past Paper</SelectItem>
                              <SelectItem value="note">Note</SelectItem>
                              <SelectItem value="lab-manual">Lab Manual</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {departments.map(dep => (
                                  <SelectItem key={dep.id} value={dep.name}>{dep.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Semester</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDepartment}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select semester" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {departments.find(d => d.name === selectedDepartment)?.semesters.map(sem => (
                                <SelectItem key={sem.id} value={sem.id.toString()}>{sem.name}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedSemester}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {availableSubjects.map(sub => (
                                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                        <FormLabel>File (PDF or DOCX, Max 5MB)</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        onChange(file);
                                    }
                                }}
                                {...rest}
                                className="pt-2 h-auto"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" variant="accent" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                  Submit for Review
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
