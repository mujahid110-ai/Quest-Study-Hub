
import { GraduationCap, Facebook, Twitter, Linkedin, Mail, Sparkles, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-slate-200 border-t border-slate-700">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-white" />
              <span className="text-xl font-bold font-headline text-white">QUEST Study Hub</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-xs">
              A collaborative platform for students at QUEST Nawabshah to share knowledge and excel academically.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-slate-400 hover:text-white"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-white"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-white"><Linkedin className="h-5 w-5" /></Link>
              <Link href="#" className="text-slate-400 hover:text-white"><Facebook className="h-5 w-5" /></Link>
            </div>
          </div>
          <div>
              <h4 className="font-headline font-semibold text-white">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/past-papers" className="text-slate-400 hover:text-white">Past Papers</Link></li>
                <li><Link href="/notes" className="text-slate-400 hover:text-white">Notes</Link></li>
                <li><Link href="/lab-manuals" className="text-slate-400 hover:text-white">Lab Manuals</Link></li>
                 <li>
                  <Link href="/ai-study-guide" className="text-slate-400 hover:text-white flex items-center">
                    AI Study Guide
                    <Sparkles className="h-4 w-4 ml-1.5 text-yellow-400"/>
                  </Link>
                </li>
                 <li><Link href="/upload" className="text-slate-400 hover:text-white">Upload Material</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-headline font-semibold text-white">Get in Touch</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/about" className="text-slate-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-slate-400 hover:text-white">Contact</Link></li>
                 <li><a href="mailto:contact@queststudyhub.com" className="text-slate-400 hover:text-white flex items-center gap-2"><Mail className="h-4 w-4"/> contact@queststudyhub.com</a></li>
              </ul>
            </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-6 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} QUEST Study Hub. All rights reserved.</span>
          <span className='text-xs'>Developed by Mujahid Hussain (23cse62) - Full Stack Developer.</span>
        </div>
      </div>
    </footer>
  );
}
