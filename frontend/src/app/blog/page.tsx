import React from 'react';
import Link from 'next/link';
import { sampleBlogPosts } from '@/lib/sampleData';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogListPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-brand-goldMuted uppercase tracking-widest block">
          Surat Textile & Fashion Trends
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-maroon">
          Saboori Fashion Blog
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Insights, market sourcing guides, and seasonal fashion trends for boutique owners, retailers, and ethnic wear lovers.
        </p>
        <div className="w-20 h-1 bg-brand-gold mx-auto mt-3 rounded-full" />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sampleBlogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100 relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-brand-maroon text-brand-goldLight text-[10px] font-bold uppercase px-3 py-1 rounded-md shadow">
                Surat Wholesale Guide
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
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

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 hover:text-brand-maroon transition-colors leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium">
                  Tags: {post.tags}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-maroon hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
