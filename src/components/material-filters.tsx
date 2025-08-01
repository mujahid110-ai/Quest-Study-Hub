
"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { departments } from '@/lib/data';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


export default function MaterialFilters({ searchParams }: { searchParams?: { search?: string; department?: string; semester?: string; subject?: string; } }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  
  const [selectedDepartment, setSelectedDepartment] = useState(searchParams?.department || '');
  const [selectedSemester, setSelectedSemester] = useState(searchParams?.semester || '');
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const updateSubjects = useCallback((dep: string, sem: string) => {
    if (dep && sem) {
      const department = departments.find(d => d.name === dep);
      const semester = department?.semesters.find(s => s.id.toString() === sem);
      setAvailableSubjects(semester?.subjects || []);
    } else {
      setAvailableSubjects([]);
    }
  }, []);


  useEffect(() => {
    updateSubjects(selectedDepartment, selectedSemester);
  }, [selectedDepartment, selectedSemester, updateSubjects]);

  const createQueryString = useCallback(
    (updates: { name: string, value: string }[]) => {
      const params = new URLSearchParams(currentSearchParams.toString());
      updates.forEach(({ name, value }) => {
        if (value && value !== 'all') {
          params.set(name, value);
        } else {
          params.delete(name);
        }
      });
      return params.toString();
    },
    [currentSearchParams]
  );
  
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setSelectedSemester(''); // Reset semester
    const newQuery = createQueryString([
      { name: 'department', value },
      { name: 'semester', value: '' },
      { name: 'subject', value: '' }
    ]);
    router.push(pathname + '?' + newQuery);
  };
  
  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value);
    const newQuery = createQueryString([
      { name: 'semester', value },
      { name: 'subject', value: '' }
    ]);
    router.push(pathname + '?' + newQuery);
  };

  const handleSubjectChange = (value: string) => {
    router.push(pathname + '?' + createQueryString([{ name: 'subject', value }]));
  }
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      router.push(pathname + '?' + createQueryString([{name: 'search', value: event.target.value}]));
  };
  
  const FilterControls = ({ inSheet = false }: { inSheet?: boolean }) => (
     <div className={`grid gap-4 ${inSheet ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
        <Select onValueChange={handleDepartmentChange} defaultValue={selectedDepartment || 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(dep => (
              <SelectItem key={dep.id} value={dep.name}>{dep.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleSemesterChange} defaultValue={selectedSemester || 'all'} disabled={!selectedDepartment || selectedDepartment === 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="All Semesters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
             {departments.find(d => d.name === selectedDepartment)?.semesters.map(sem => (
              <SelectItem key={sem.id} value={sem.id.toString()}>{sem.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
         <Select onValueChange={handleSubjectChange} defaultValue={searchParams?.subject || 'all'} disabled={!selectedDepartment || !selectedSemester || selectedDepartment === 'all' || selectedSemester === 'all'}>
          <SelectTrigger>
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {availableSubjects.map(sub => (
              <SelectItem key={sub} value={sub}>{sub}</SelectItem>
            ))}
          </SelectContent>
        </Select>
     </div>
  );


  if (!isMounted) {
    return (
        <div className="mb-8 p-4 rounded-lg border bg-card border-border animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="h-10 bg-muted rounded-md col-span-1 lg:col-span-1"></div>
                <div className="h-10 bg-muted rounded-md"></div>
                <div className="h-10 bg-muted rounded-md"></div>
                <div className="h-10 bg-muted rounded-md"></div>
            </div>
        </div>
    );
  }

  return (
    <div className="mb-8 p-4 rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search by title..." 
                className="pl-10 h-10"
                onChange={handleSearch}
                defaultValue={searchParams?.search || ''}
            />
        </div>
        <div className="hidden lg:flex flex-grow gap-4">
            <FilterControls />
        </div>
        <Sheet>
          <SheetTrigger asChild>
             <Button variant="outline" className="lg:hidden w-full flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
             </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Materials</SheetTitle>
              <SheetDescription>
                Select department, semester, and subject to find what you need.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <FilterControls inSheet />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
