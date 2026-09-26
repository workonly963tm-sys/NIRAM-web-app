import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Search,
  Flame,
  Heart,
  MessageCircle,
  Bookmark,
  Plus,
  X,
  Send,
} from "lucide-react";
import { communityPosts, trendingRemedies } from "../../data";
import { CardGroup, CardItem } from "../Card";
import { CommunityPost } from "../../types";

interface CommunityScreenProps {
  onNavigate: (screen: string) => void;
}

export function CommunityScreen({ onNavigate }: CommunityScreenProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newRemedy, setNewRemedy] = useState("");
  const [newTag, setNewTag] = useState("");

  const toggleLike = (id: string) => {
    setLikedPosts((prev) => {
      const isLiked = !prev[id];
      setPosts((pList) =>
        pList.map((p) =>
          p.id === id ? { ...p, likes: p.likes + (isLiked ? 1 : -1) } : p
        )
      );
      return { ...prev, [id]: isLiked };
    });
  };

  const toggleSave = (id: string) => {
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newRemedy.trim()) return;

    const newPost: CommunityPost = {
      id: `p-${Date.now()}`,
      author: "You",
      avatar: "YU",
      title: newTitle.trim(),
      remedy: newRemedy.trim(),
      likes: 1,
      comments: 0,
      tags: newTag ? [newTag.trim()] : ["ayurveda", "wellness"],
      timeAgo: "Just now",
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewRemedy("");
    setNewTag("");
    setShowNewPostModal(false);
  };

  return (
    <div className="min-h-screen bg-cream-300 pb-28">
      {/* Top Header */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft cursor-pointer hover:bg-cream-200 transition-colors"
          >
            <ChevronLeft size={20} className="text-saffron-600" />
          </button>
          <div>
            <h1 className="font-display font-extrabold text-2xl text-charcoal-900">
              Vedic Community
            </h1>
            <p className="text-xs text-charcoal-500">
              Remedies from the community
            </p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center shadow-soft cursor-pointer hover:bg-cream-200 transition-colors">
          <Search size={18} className="text-saffron-600" />
        </button>
      </div>

      {/* Trending Remedies Carousel */}
      <div className="mb-5">
        <div className="px-6 mb-3">
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-saffron-600" />
            <h3 className="font-display font-bold text-lg text-charcoal-900">
              Trending Remedies
            </h3>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
          {trendingRemedies.map((remedy, idx) => (
            <motion.div
              key={remedy.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              className="flex-shrink-0 w-44 card p-4 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-saffron-100 flex items-center justify-center mb-2">
                  <Flame size={18} className="text-saffron-600" />
                </div>
                <p className="font-semibold text-charcoal-900 text-sm line-clamp-1">
                  {remedy.title}
                </p>
                <p className="text-xs text-charcoal-500 mt-1">{remedy.condition}</p>
              </div>
              <p className="text-xs text-saffron-600 font-semibold mt-3">
                {remedy.saves} saved
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-bold text-lg text-charcoal-900">
            Recent Posts
          </h3>
          <span className="text-sm text-saffron-600 font-semibold">Filter</span>
        </div>

        <CardGroup className="space-y-4">
          {posts.map((post) => {
            const isLiked = likedPosts[post.id];
            const isSaved = savedPosts[post.id];

            return (
              <CardItem key={post.id}>
                <div className="card p-4">
                  {/* Author */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white font-bold text-sm shadow-soft">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-charcoal-900 text-sm">
                        {post.author}
                      </p>
                      <p className="text-xs text-charcoal-400">{post.timeAgo}</p>
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h4 className="font-display font-bold text-charcoal-900 mb-2 text-base">
                    {post.title}
                  </h4>
                  <p className="text-sm text-charcoal-600 leading-relaxed mb-3">
                    {post.remedy}
                  </p>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-cream-200 text-saffron-600 px-2 py-0.5 rounded-full font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Interactions */}
                  <div className="flex items-center gap-5 text-charcoal-400 pt-1 border-t border-cream-400/40">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors cursor-pointer ${
                        isLiked ? "text-red-500 font-bold" : "hover:text-saffron-600"
                      }`}
                    >
                      <Heart
                        size={16}
                        fill={isLiked ? "currentColor" : "none"}
                      />
                      <span>{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-1.5 text-sm hover:text-saffron-600 transition-colors cursor-pointer">
                      <MessageCircle size={16} />
                      <span>{post.comments}</span>
                    </button>

                    <button
                      onClick={() => toggleSave(post.id)}
                      className={`flex items-center gap-1.5 text-sm ml-auto transition-colors cursor-pointer ${
                        isSaved ? "text-saffron-600 font-bold" : "hover:text-saffron-600"
                      }`}
                    >
                      <Bookmark
                        size={16}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                      <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                  </div>
                </div>
              </CardItem>
            );
          })}
        </CardGroup>
      </div>

      {/* Floating Add Post Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowNewPostModal(true)}
        className="fixed right-6 bottom-28 w-14 h-14 rounded-full bg-saffron-600 flex items-center justify-center shadow-saffron z-30 cursor-pointer text-white hover:bg-saffron-700 transition-colors"
      >
        <Plus size={24} />
      </motion.button>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-6 w-full max-w-sm relative"
            >
              <button
                onClick={() => setShowNewPostModal(false)}
                className="absolute top-4 right-4 text-charcoal-400 hover:text-charcoal-700"
              >
                <X size={20} />
              </button>

              <h3 className="font-display font-bold text-xl text-charcoal-900 mb-1">
                Share a Vedic Remedy
              </h3>
              <p className="text-xs text-charcoal-500 mb-4">
                Help the community with your traditional wellness wisdom
              </p>

              <form onSubmit={handleCreatePost} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-charcoal-600 mb-1 block">
                    Remedy Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Cumin tea for indigestion"
                    className="w-full bg-cream-200 border-0 rounded-xl px-3 py-2 text-sm text-charcoal-900 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-600 mb-1 block">
                    How to prepare & use
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newRemedy}
                    onChange={(e) => setNewRemedy(e.target.value)}
                    placeholder="Describe ingredients and steps..."
                    className="w-full bg-cream-200 border-0 rounded-xl px-3 py-2 text-sm text-charcoal-900 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-charcoal-600 mb-1 block">
                    Tag (e.g. pitta, detox, throat)
                  </label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="pitta"
                    className="w-full bg-cream-200 border-0 rounded-xl px-3 py-2 text-sm text-charcoal-900 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
                  >
                    <span>Post Remedy</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
