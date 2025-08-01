
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { departments } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firebaseApp, db } from '@/lib/firebase/config';
import { useEffect, useState } from 'react';
import { Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const auth = getAuth(firebaseApp);

const formSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  contactNumber: z.string().regex(/^\+?[0-9\\s-]{10,15}$/, { message: 'Please enter a valid contact number.' }),
  rollNo: z.string().min(5, { message: 'Roll number seems too short.' }),
  department: z.string({ required_error: 'Please select a department.' }),
  semester: z.string({ required_error: 'Please select a semester.' }),
  batch: z.string().regex(/^[0-9]{2}$/, { message: 'Batch should be a 2-digit year (e.g., 23, 24).' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      contactNumber: '',
      rollNo: '',
      department: '',
      semester: '',
      batch: '',
      password: '',
    },
  });

  const selectedDepartment = form.watch('department');

  useEffect(() => {
    if (selectedDepartment) {
      form.setValue('semester', '');
    }
  }, [selectedDepartment, form]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const userRole = values.email === 'admin@quest.edu.pk' ? 'admin' : 'student';

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: values.fullName,
        email: values.email,
        contactNumber: values.contactNumber,
        rollNo: values.rollNo,
        department: values.department,
        semester: parseInt(values.semester, 10),
        batch: parseInt(values.batch, 10),
        role: userRole,
      });

      toast({
        title: "Registration Successful!",
        description: "Your account has been created. You can now log in.",
      });
      router.push('/login');

    } catch (error: any) {
      console.error("Registration Error:", error);
      let errorMessage = "An unknown error occurred during registration.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please log in.";
      }
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
      });
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!loading && user) {
        router.push('/');
    }
  }, [user, loading, router]);
  
  if (loading || user) {
    return <div className="container min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="w-full lg:grid lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2 zoom-in">
       <div className="flex items-center justify-center py-12 px-4">
        <Card className="mx-auto w-full max-w-lg bg-card border-border shadow-lg">
          <CardHeader className="text-center">
            <UserPlus className="mx-auto h-8 w-8 text-primary mb-4" />
            <CardTitle className="text-2xl font-bold font-headline">Create an Account</CardTitle>
            <CardDescription>
              Join our community! Fill out the form below to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+92 300 1234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rollNo"
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Roll No</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 23CS100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your department" />
                            </SelectTrigger>
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
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Semester</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDepartment}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
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
                    name="batch"
                    render={({ field }) => (
                      <FormItem className="col-span-2 sm:col-span-1">
                        <FormLabel>Batch</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 23" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full col-span-2 mt-2" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </Form>
              <div className="mt-4 text-center text-sm col-span-2">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-primary underline">
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://quest.edu.pk/media/campuslife/images/mlib.JPG"
          alt="QUEST University Library"
          data-ai-hint="university library students"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
