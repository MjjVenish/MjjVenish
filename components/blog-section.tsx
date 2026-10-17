"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { posts } from "@/lib/blog-data";
import { SectionShell } from "@/components/section-shell";

export default function BlogSection() {
  return (
    <SectionShell id="blog" eyebrow="Writing" title="From the Blog">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="glass-strong group overflow-hidden rounded-2xl transition hover:-translate-y-1"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  {post.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold leading-snug text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:text-primary" />
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
