"use client";

import { useState } from "react";
import { sidebarData } from "@/data/sidebarData";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  const categories = sidebarData.filter(
    (item: any) => item.type === "category"
  );

  const goHome = () => {
    setSelectedCategory(null);
    setSelectedGroup(null);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b-2 border-purple-300 bg-purple-100">
          <h2 className="text-xl font-bold text-purple-900">
            Jain Library
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold text-purple-900 hover:text-red-600"
          >
            ✕
          </button>
        </div>

        <div className="h-[calc(100vh-72px)] overflow-y-auto p-4">

          {/* LEVEL 1 */}
          {selectedCategory === null && (
            <div className="space-y-2">
              {categories.map((category: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(i)}
                  className="w-full text-left p-4 rounded-xl border-2 border-purple-300 bg-white text-gray-900 font-semibold hover:bg-purple-50 hover:border-purple-500 transition"
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}

          {/* LEVEL 2 */}
          {selectedCategory !== null && selectedGroup === null && (
            <>
              <button
                onClick={goHome}
                className="mb-4 w-full text-left p-3 rounded-xl border-2 border-purple-300 bg-purple-50 text-purple-900 font-semibold hover:bg-purple-100"
              >
                ← Back
              </button>

              <div className="space-y-2">
                {categories[selectedCategory]?.children?.map(
                  (group: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setSelectedGroup(i)}
                      className="w-full text-left p-3 rounded-lg border-2 border-purple-200 bg-white text-gray-900 font-medium hover:bg-purple-50 hover:border-purple-400 transition"
                    >
                      {group.title}
                    </button>
                  )
                )}
              </div>
            </>
          )}

          {/* LEVEL 3 */}
          {selectedCategory !== null && selectedGroup !== null && (
            <>
              <button
                onClick={() => setSelectedGroup(null)}
                className="mb-4 w-full text-left p-3 rounded-xl border-2 border-purple-300 bg-purple-50 text-purple-900 font-semibold hover:bg-purple-100"
              >
                ← Back
              </button>

              <div className="space-y-1">
                {categories[selectedCategory]
                  ?.children?.[selectedGroup]
                  ?.children?.map((link: any, i: number) => (
                    <a
                      key={i}
                      href={link.href}
                      className="block p-3 rounded-lg border border-transparent text-gray-900 hover:bg-purple-50 hover:border-purple-300 transition"
                    >
                      {link.title}
                    </a>
                  ))}
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}