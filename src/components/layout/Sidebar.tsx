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
        <Card className="w-full rounded-3xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden mx-auto lg:mx-0">

            {/* HEADER */}
            <CardHeader className="pt-8 pb-6 flex flex-col items-center text-center space-y-12 px-6">
                <div className="relative w-full max-w-75 h-100 md:max-w-70 rounded-md aspect-4/5 overflow-hidden border border-border shadow-md mx-auto">
                    <Image
                        src="/assets/hero.jpg"
                        alt="Adeoluwa Adeoye"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </div>

                <div>
                    <h2 className="text-3xl font-semibold uppercase tracking-wide">Adeoluwa Adeoye</h2>
                    <p className="text-muted-foreground mt-1 text-base">
                        Fullstack Engineer • UI Systems Builder
                    </p>
                </div>
            </CardHeader>

            <Separator />

            {/* BIO */}
            <CardContent className="px-6 py-8 md:px-8">
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                    I design and build scalable digital products with strong UI systems,
                    performance focus, and clean architecture.
                </p>

                {/* Social Icons */}
                <div className="grid grid-cols-4 gap-4 mt-10">
                    {socials.map((social) => (
                        <Link
                            key={social.name}
                            href={social.href}
                            target={social.name !== 'email' ? '_blank' : undefined}
                            className="flex items-center justify-center p-4 rounded-2xl border border-border hover:scale-110 hover:shadow-md transition-all duration-200"
                            style={{ backgroundColor: `${social.color}15` }}
                        >
                            <SocialIcon name={social.name} size={24} />
                        </Link>
                    ))}
                </div>
            </CardContent>

            <Separator />

            {/* ACTIONS */}
            <CardFooter className="p-6 md:p-8 flex flex-col gap-3">
                <Button asChild className="w-full h-12 text-base font-medium rounded-2xl">
                    <a href="/ADEOLUWA_CV.pdf" download="ADEOLUWA_CV.pdf">
                        Download CV
                    </a>
                </Button>

                <Button
                    variant="outline"
                    asChild
                    className="w-full h-12 text-base rounded-2xl"
                >
                    <Link href="/contact">
                        Book a Call
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}