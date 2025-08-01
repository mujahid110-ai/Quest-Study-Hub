
export type MaterialType = 'past-paper' | 'note' | 'lab-manual';

export type MaterialStatus = 'pending' | 'approved' | 'rejected';

export interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  department: string;
  semester: number;
  subject: string;
  fileURL: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploaderId: string;
  uploaderName: string;
  createdAt: Date;
  status: MaterialStatus;
}

export interface Department {
  id: string;
  name: string;
}

export interface Semester {
  id: number;
  name: string;
}

export interface User {
  uid: string;
  fullName: string;
  email: string;
  contactNumber: string;
  rollNo: string;
  department: string;
  semester: number;
  batch: number;
  role: 'student' | 'admin';
}
