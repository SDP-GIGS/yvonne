import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: '',
    });

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                alert('Registration failed. Please check your details and try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.9),_transparent_40%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)]" />
            <div className="absolute -top-24 right-[-6rem] h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="absolute bottom-[-5rem] left-[-4rem] h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
                    <aside className="relative hidden flex-col justify-between border-r border-white/10 p-10 lg:flex">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-100">
                                <Sparkles className="h-4 w-4" />
                                Student internship platform
                            </div>
                            <div className="space-y-4">
                                <h1 className="max-w-md text-5xl font-semibold tracking-tight text-white">
                                    Create your InSync-ILES account
                                </h1>
                                <p className="max-w-lg text-base leading-7 text-slate-300">
                                    Join the internship logging and evaluation system with a clean workflow for students, supervisors, and administrators.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-300">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Secure onboarding</p>
                                    <p className="text-sm text-slate-400">Professional access for every internship role.</p>
                                </div>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Logging</p>
                                    <p className="mt-2 text-sm text-slate-200">Track weekly activities without clutter.</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Evaluation</p>
                                    <p className="mt-2 text-sm text-slate-200">Review progress and feedback in one place.</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
                        <div className="w-full max-w-md">
                            <div className="mb-8 lg:hidden">
                                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-100">
                                    <Sparkles className="h-4 w-4" />
                                    Student internship platform
                                </div>
                                <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white">Create your account</h1>
                                <p className="mt-2 text-sm leading-6 text-slate-300">Sign up to start logging and evaluating internships.</p>
                            </div>

                            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-black/20 sm:p-8">
                                <div className="mb-8 text-center">
                                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">InSync-ILES</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-white">Create account</h2>
                                    <p className="mt-2 text-sm text-slate-400">A polished start for students and supervisors.</p>
                                </div>

                                <form onSubmit={handleSignUp} className="space-y-5">
                                    <div className="flex gap-4">
                                        <div className="space-y-2 w-1/2">
                                            <label className="ml-1 text-sm font-medium text-slate-200">First Name</label>
                                            <div className="relative group">
                                                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-sky-300" />
                                                <input
                                                    type="text"
                                                    placeholder="First name"
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-sky-400/60 focus:bg-white/10 focus:ring-4 focus:ring-sky-400/10"
                                                    value={formData.first_name}
                                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2 w-1/2">
                                            <label className="ml-1 text-sm font-medium text-slate-200">Second Name</label>
                                            <div className="relative group">
                                                <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-sky-300" />
                                                <input
                                                    type="text"
                                                    placeholder="Second name"
                                                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-sky-400/60 focus:bg-white/10 focus:ring-4 focus:ring-sky-400/10"
                                                    value={formData.last_name}
                                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ml-1 text-sm font-medium text-slate-200">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-sky-300" />
                                            <input
                                                type="email"
                                                placeholder="name@example.com"
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-sky-400/60 focus:bg-white/10 focus:ring-4 focus:ring-sky-400/10"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ml-1 text-sm font-medium text-slate-200">Password</label>
                                        <div className="relative group">
                                            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-sky-300" />
                                            <input
                                                type="password"
                                                placeholder="Create a strong password"
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-sky-400/60 focus:bg-white/10 focus:ring-4 focus:ring-sky-400/10"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ml-1 text-sm font-medium text-slate-200">Role</label>
                                        <div className="relative group">
                                            <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-sky-300" />
                                            <select
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-sky-400/60 focus:bg-white/10 focus:ring-4 focus:ring-sky-400/10"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}

                                                required
                                                style={{ color: 'gray' }}
                                            >
                                                <option value="">Select a role</option>
                                                <option value="STUDENT">Student</option>
                                                <option value="ADMIN">Admin</option>
                                                <option value="WORK_SUPERVISOR">Workplace Supervisor</option>
                                                <option value="ACADEMIC_SUPERVISOR">Academic Advisor</option>

                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:from-sky-400 hover:to-indigo-400 focus:outline-none focus:ring-4 focus:ring-sky-400/20"
                                    >
                                        <UserPlus className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                                        Sign Up
                                    </button>
                                </form>

                                <p className="mt-8 text-center text-sm text-slate-400">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-sky-300 transition-colors hover:text-sky-200 hover:underline">
                                        Log In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
export default SignUpPage;