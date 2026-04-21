'use client';

import { useState } from 'react';
import IntroLoader from '@/components/ui/IntroLoader';

export default function ClientShell({ children }: { children: React.ReactNode }) {
    const [done, setDone] = useState(false);

    return (
        <>
            {!done && <IntroLoader onComplete={() => setDone(true)} />}
            {children}
        </>
    );
}
