export default function PageLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">

            {/* Corner brackets */}
            <div className="absolute inset-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/25" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/25" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-primary/25" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/25" />
            </div>

            <div className="flex flex-col items-center gap-7">

                {/* Monogram — matches header logo */}
                <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-violet-600 flex items-center justify-center shadow-xl shadow-primary/20 animate-pulse">
                        <span className="font-black text-white text-base tracking-tight select-none">AA</span>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background" />
                </div>

                {/* Animated progress track */}
                <div className="relative w-52 h-px bg-border overflow-hidden">
                    <div className="absolute inset-0 bg-primary animate-[progress_1.4s_ease-in-out_infinite]" />
                </div>

                {/* Name + status */}
                <div className="flex flex-col items-center gap-1.5">
                    <p className="font-black text-[11px] uppercase tracking-[0.35em] text-foreground">
                        Adeoluwa Adeoye
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60 animate-pulse">
                        Loading
                    </p>
                </div>
            </div>
        </div>
    );
}
