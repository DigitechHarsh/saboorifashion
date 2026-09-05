'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, MessageSquare, ChevronRight } from 'lucide-react';
import { sampleBlogPosts } from '@/lib/sampleData';

export default function BlogPostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = sampleBlogPosts.find((p) => p.slug === slug) || sampleBlogPosts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-brand-maroon">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/blog" className="hover:text-brand-maroon">Blog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-semibold truncate max-w-xs">{post.title}</span>
      </nav>

      <article className="space-y-6">
        <div className="space-y-3">
          <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block">
            Surat Textile Wholesale Insights
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-b border-gray-100 pb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>{post.created_at}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-brand-gold" />
              <span>{post.author}</span>
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-gray-100 shadow-lg border border-gray-200">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed space-y-4 pt-4">
          <p className="text-base font-medium text-brand-maroon leading-relaxed">
            {post.excerpt}
          </p>
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
            className="space-y-4 text-sm sm:text-base text-gray-700"
          />
        </div>

        {/* Wholesale Consultation Box inside blog */}
        <div className="p-6 sm:p-8 rounded-2xl bg-brand-cream border border-brand-maroon/20 flex flex-col sm:flex-row items-center justify-between gap-6 mt-10">
          <div>
            <h3 className="font-serif text-xl font-bold text-brand-maroon mb-1">
              Ready to Source Saree & Kurti Catalogs?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Get direct factory rates with fast pan-India transport dispatch from Adarsh Market-2, Surat.
            </p>
          </div>
          <a
            href="https://wa.me/918780331600"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm rounded-xl shrink-0 shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </article>
    </div>
  );
}
