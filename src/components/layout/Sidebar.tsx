'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SocialIcon from '@/components/icons/SocialIcon';

const socials = [
    { name: 'github', href: 'https://github.com/adeoluwaadeoye', color: '#181717' },
    { name: 'linkedin', href: 'https://www.linkedin.com/in/adeoyeadeoluwa', color: '#0A66C2' },
    { name: 'x', href: 'https://x.com/AdeDadB', color: '#000000' },
    { name: 'email', href: 'mailto:adeoluadeoye7@gmail.com', color: '#EA4335' },
];

export default function Sidebar() {
    return (
        <Card className="w-full h-fit max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-xl mx-auto lg:mx-0 custom-scrollbar">

            {/* HEADER - Reduced padding and space-y */}
            <CardHeader className="pt-5 pb-3 flex flex-col items-center text-center space-y-3 px-4">
                {/* Shrink image container from max-w-60 to max-w-48 */}
                <div className="relative w-full max-w-48 aspect-4/5 rounded-xl overflow-hidden border border-border shadow-sm mx-auto">
                    <Image
                        src="/assets/hero2.jpg"
                        alt="Adeoluwa Adeoye"
                        fill
                        sizes="192px"
                        className="object-cover object-top"
                        priority
                    />
                </div>

                <div>
                    <h2 className="text-xl font-bold uppercase tracking-tight">Adeoluwa Adeoye</h2>
                    <p className="text-muted-foreground text-xs font-medium">
                        Fullstack Engineer • UI Systems
                    </p>
                </div>
            </CardHeader>

            <Separator className="opacity-40" />

            {/* BIO - Reduced vertical padding */}
            <CardContent className="px-5 py-4">
                <p className="text-[13px] text-muted-foreground leading-snug text-center">
                    I build scalable digital products with strong UI systems and clean architecture.
                </p>

                {/* Social Icons - More compact grid */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                    {socials.map((social) => (
                        <Link
                            key={social.name}
                            href={social.href}
                            target={social.name !== 'email' ? '_blank' : undefined}
                            className="flex items-center justify-center p-2 rounded-lg border border-border hover:bg-secondary transition-all"
                            style={{ backgroundColor: `${social.color}08` }}
                        >
                            <SocialIcon name={social.name} size={18} />
                        </Link>
                    ))}
                </div>
            </CardContent>

            <Separator className="opacity-40" />

            {/* ACTIONS - Narrower buttons and smaller text */}
            <CardFooter className="p-4 flex flex-col gap-2">
                <Button asChild className="w-full h-9 text-xs font-semibold rounded-lg">
                    <Link href="/assets/ADE_RESUME.pdf" download="Adeoluwa_Adeoye_Resume.pdf">
                        Download Resume
                    </Link>
                </Button>

                <Button
                    variant="outline"
                    asChild
                    className="w-full h-9 text-xs rounded-lg border-border hover:bg-secondary"
                >
                    <Link href="/booking">
                        Book a Call
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}