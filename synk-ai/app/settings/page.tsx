import Link from 'next/link';
export default function Page() {
  return (
    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">

<div className="flex h-screen overflow-hidden">
{/* Side Navigation */}
<aside className="w-72 flex-shrink-0 flex flex-col border-r border-slate-800 bg-background-dark/50 backdrop-blur-xl">
<div className="p-6">
<div className="flex items-center gap-3 mb-8">
<div className="size-10 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(60,131,246,0.4)]">
<span className="material-symbols-outlined text-white">bolt</span>
</div>
<div className="flex flex-col">
<h1 className="text-slate-100 text-lg font-bold leading-none tracking-tight">Synk.ai</h1>
<p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Tech Noir v2.0</p>
</div>
</div>
<nav className="flex flex-col gap-1">
<Link href="/portfolio"className="flex items-center gap-3 px-4 py-3 rounded-lg sidebar-item-active group" >
<span className="material-symbols-outlined text-primary">person</span>
<span className="text-sm font-semibold">Profile</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 transition-all" >
<span className="material-symbols-outlined">shield_lock</span>
<span className="text-sm font-semibold">Security</span>
</Link>
<Link href="/"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 transition-all" >
<span className="material-symbols-outlined">credit_card</span>
<span className="text-sm font-semibold">Subscription</span>
</Link>
<Link href="/synk-terminal"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 transition-all" >
<span className="material-symbols-outlined">terminal</span>
<span className="text-sm font-semibold">Integrations</span>
</Link>
<Link href="/settings"className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 transition-all" >
<span className="material-symbols-outlined">settings_input_component</span>
<span className="text-sm font-semibold">Advanced</span>
</Link>
</nav>
</div>
<div className="mt-auto p-6 border-t border-slate-800 flex flex-col gap-4">
<div className="flex items-center gap-3 text-slate-400 hover:text-slate-100 cursor-pointer transition-colors">
<span className="material-symbols-outlined text-[20px]">help_outline</span>
<span className="text-sm font-medium">Support Center</span>
</div>
<div className="flex items-center gap-3 text-slate-400 hover:text-slate-100 cursor-pointer transition-colors">
<span className="material-symbols-outlined text-[20px]">menu_book</span>
<span className="text-sm font-medium">Documentation</span>
</div>
<button className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-bold transition-colors mt-2 flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">logout</span>
                Logout
            </button>
</div>
</aside>
{/* Main Content Area */}
<main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
<div className="max-w-5xl mx-auto px-8 py-12">
{/* Header Section */}
<div className="mb-10">
<h2 className="text-4xl font-black text-slate-100 tracking-tight mb-2">System Settings</h2>
<p className="text-slate-400 text-lg">Manage your neural identity and global workspace preferences.</p>
</div>
{/* Tab Navigation (Mobile/Top) */}
<div className="mb-8 border-b border-slate-800 flex gap-8">
<button className="pb-4 border-b-2 border-primary text-primary font-bold text-sm tracking-wide">ACCOUNT DETAILS</button>
<button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-300 font-bold text-sm tracking-wide transition-colors">SECURITY &amp; AUTH</button>
<button className="pb-4 border-b-2 border-transparent text-slate-500 hover:text-slate-300 font-bold text-sm tracking-wide transition-colors">BILLING &amp; USAGE</button>
</div>
<div className="space-y-8">
{/* Profile Section Card */}
<section className="glass-panel rounded-xl p-8 overflow-hidden relative">
<div className="flex flex-col md:flex-row gap-8 items-start">
<div className="relative group">
<div className="size-32 rounded-xl bg-slate-800 border-2 border-slate-700 overflow-hidden shadow-2xl">
<img className="w-full h-full object-cover grayscale contrast-125" data-alt="Cyberpunk style portrait of a male user" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4NH6jHLzylpFP7mR44Ccz-UbPi0SGyqg-9Yg0tXoUFkHbDBntZPUeeyc3yaMWyeCAYlzCqcZqUgUaKlvCs5B6Boic7JuFb1xLNTHs4NlyDTbOIAIfe3vjDMJQVIdOZG-_USBBYg3jNzHPsA4tflxTq_0qhGHGS7FEZQRchDvvk9VJlBM7zCGvXj_F1KPC3nnHDAAII1fFe31k2sQd197arbuwuu5yUiNKv_hlXiWBBIfyoesDRudNEhdkOSToqsHSHZYjjI3C5A"/>
</div>
<button className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-lg text-white shadow-lg hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-sm">photo_camera</span>
</button>
</div>
<div className="flex-1 space-y-6">
<div>
<h3 className="text-xl font-bold text-slate-100">Neural Identity</h3>
<p className="text-slate-400 text-sm mt-1">This information is visible across the Synk network.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="space-y-2">
<label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Display Name</label>
<input className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all" type="text" value="Case_Neuromancer"/>
</div>
<div className="space-y-2">
<label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Neural ID</label>
<input className="w-full bg-slate-950 border border-slate-800 rounded-lg py-3 px-4 text-slate-500 cursor-not-allowed" disabled type="text" value="SNK-9902-X"/>
</div>
<div className="space-y-2 md:col-span-2">
<label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio/Manifesto</label>
<textarea className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-3 px-4 text-slate-100 focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all h-24">Running silent in the sprawl. Data architect and synth-wave enthusiast.</textarea>
</div>
</div>
</div>
</div>
</section>
{/* Security Section Card */}
<section className="glass-panel rounded-xl p-8">
<div className="flex items-center justify-between mb-8">
<div>
<h3 className="text-xl font-bold text-slate-100">Security &amp; Authorization</h3>
<p className="text-slate-400 text-sm mt-1">Multi-factor protocols and active session management.</p>
</div>
<span className="material-symbols-outlined text-slate-600 text-4xl">verified_user</span>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
<div className="flex gap-4">
<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">vibration</span>
</div>
<div>
<p className="text-slate-100 font-semibold">Two-Factor Authentication (2FA)</p>
<p className="text-slate-500 text-xs">Biometric or hardware key required for login.</p>
</div>
</div>
<div className="relative inline-flex items-center cursor-pointer">
<div className="w-11 h-6 bg-primary rounded-full"></div>
<div className="absolute left-6 top-1 bg-white w-4 h-4 rounded-full transition-all"></div>
</div>
</div>
<div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50">
<div className="flex gap-4">
<div className="size-10 rounded-lg bg-slate-700/30 flex items-center justify-center text-slate-400">
<span className="material-symbols-outlined">history</span>
</div>
<div>
<p className="text-slate-100 font-semibold">Active Sessions</p>
<p className="text-slate-500 text-xs">Currently logged in from 3 devices.</p>
</div>
</div>
<button className="text-xs font-bold text-primary hover:underline uppercase tracking-tighter">View All</button>
</div>
</div>
</section>
{/* Subscription Section Card */}
<section className="relative rounded-xl overflow-hidden border border-primary/30 group">
<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background-dark to-background-dark -z-10"></div>
<div className="p-8">
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div className="space-y-2">
<div className="flex items-center gap-3">
<span className="px-2 py-0.5 rounded text-[10px] font-black bg-primary text-white tracking-widest uppercase shadow-[0_0_10px_rgba(60,131,246,0.6)]">Pro Membership</span>
<h3 className="text-xl font-bold text-slate-100">Subscription Tier</h3>
</div>
<p className="text-slate-400 text-sm">Your next renewal is on <span className="text-slate-200 font-mono">2024.12.01</span></p>
</div>
<div className="flex flex-col items-end">
<p className="text-3xl font-black text-slate-100">$29.00<span className="text-sm font-normal text-slate-500">/mo</span></p>
<button className="mt-4 px-6 py-2 rounded-lg bg-primary hover:bg-primary/80 text-white text-sm font-bold transition-all shadow-lg">Manage Plan</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
<div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
<p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Neural Processing</p>
<div className="flex items-end gap-2">
<span className="text-2xl font-mono text-slate-100">Unlimited</span>
</div>
</div>
<div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
<p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Storage Array</p>
<div className="flex items-end gap-2">
<span className="text-2xl font-mono text-slate-100">512 GB</span>
<span className="text-xs text-slate-600 pb-1">/ 1 TB</span>
</div>
<div className="w-full h-1 bg-slate-800 rounded-full mt-2">
<div className="w-1/2 h-full bg-primary rounded-full"></div>
</div>
</div>
<div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800">
<p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Support Priority</p>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm">emergency_home</span>
<span className="text-xl font-bold text-slate-100 tracking-tight">Level 1 Elite</span>
</div>
</div>
</div>
</div>
</section>
{/* Action Footer */}
<div className="flex justify-end gap-4 pt-4">
<button className="px-6 py-3 rounded-lg text-slate-400 font-bold hover:text-slate-100 transition-colors">Discard Changes</button>
<button className="px-10 py-3 rounded-lg bg-primary text-white font-bold shadow-[0_0_20px_rgba(60,131,246,0.3)] hover:scale-105 transition-all">Synchronize Settings</button>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}
