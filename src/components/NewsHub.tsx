import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Share2,
  Check,
  Tag,
  X
} from 'lucide-react';
import { NEWS_ARTICLES, NewsArticle, filterNews } from '../utils/college-data';

export default function NewsHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    'All',
    'Events',
    'Student Life',
    'Academics',
    'Competitions',
    'Announcements',
  ];

  const filteredNews = filterNews(NEWS_ARTICLES, searchQuery, selectedCategory);
  const featuredArticle = filteredNews[0] || NEWS_ARTICLES[0];
  const secondaryArticles = filteredNews.slice(1);

  const handleShare = (article: NewsArticle, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `https://gordoncollege.edu.ph/ccs/news#${article.id} — ${article.title}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
              Official University Dispatch & Academic Calendar
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-slate-900 tracking-tight">
              News & Campus Events
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-body mt-2 leading-relaxed">
              Stay informed with college announcements, research symposiums, regional hackathon victories, and academic milestones from Gordon College CCS.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-mono text-slate-600">
            <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              AY 2026–2027 Campus Feed
            </span>
          </div>
        </div>

        {/* Filter Bar & Category Switcher */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles by title, tags, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-body text-sm placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-700 font-semibold"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lead Featured Article Showcase */}
        {featuredArticle && !searchQuery && selectedCategory === 'All' && (
          <div
            onClick={() => setActiveArticle(featuredArticle)}
            className="mb-10 rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-orange-500 transition-all cursor-pointer shadow-sm hover:shadow-lg group grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto relative overflow-hidden bg-slate-100">
              <img
                src="/src/assets/images/student_hackathon_colloquium_1794195398713.jpg"
                alt="Gordon College Academic Computing Symposium & Hackathon"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded bg-orange-600 text-white font-mono text-[11px] font-bold uppercase shadow-sm">
                  Featured Lead Story
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
                  <span>{featuredArticle.date}</span>
                  <span>·</span>
                  <span className="text-orange-600 font-bold">{featuredArticle.category}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-slate-600 font-body leading-relaxed line-clamp-3">
                  {featuredArticle.summary || featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 text-slate-500">
                  <User className="w-3.5 h-3.5" />
                  <span>{featuredArticle.author}</span>
                </div>

                <span className="text-orange-600 font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Dispatch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchQuery || selectedCategory !== 'All' ? filteredNews : secondaryArticles).map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer shadow-2xs group"
            >
              <div className="space-y-3">
                {/* Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                  <span className="text-orange-600 font-bold">{article.category}</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed line-clamp-3">
                  {article.summary || article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {(article.tags || [article.category, 'Gordon College']).map((t: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => handleShare(article, e)}
                    className="p-1 rounded text-slate-400 hover:text-slate-700"
                    title="Share link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-orange-600 font-semibold flex items-center space-x-1">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
                <span className="text-orange-600 font-bold uppercase">{activeArticle.category}</span>
                <span>·</span>
                <span>{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                {activeArticle.title}
              </h2>
              <div className="flex items-center space-x-2 text-xs text-slate-500 font-body mt-2">
                <span>By {activeArticle.author}</span>
                <span>·</span>
                <span>{activeArticle.readTime}</span>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 font-body leading-relaxed pt-2">
              <p className="font-semibold text-slate-900">
                {activeArticle.summary || activeArticle.excerpt}
              </p>
              <p>
                {activeArticle.fullContent || activeArticle.content}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={(e) => handleShare(activeArticle, e)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Copy Article Link'}</span>
              </button>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
