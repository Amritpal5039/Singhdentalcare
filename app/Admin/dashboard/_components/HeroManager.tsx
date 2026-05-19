"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, Loader2, Save, Film, Image as ImageIcon } from "lucide-react";
import HeroMediaUploader from "@/app/components/ui/HeroMediaUploader";
import Image from "next/image";

interface HeroItem {
  _id: string;
  type: 'image' | 'video';
  url: string;
  publicId: string;
  order: number;
  isActive: boolean;
}

export function HeroManager() {
  const [items, setItems] = useState<HeroItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<{ url: string; publicId: string; type: 'image' | 'video' }>({
    url: "",
    publicId: "",
    type: 'image'
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/admin/hero");
      const data = await res.json();
      if (Array.isArray(data)) {
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to fetch hero items", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.url) return;

    try {
      setIsSaving(true);
      const res = await fetch("/api/admin/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newItem,
          order: items.length,
          isActive: true
        })
      });

      if (res.ok) {
        const addedItem = await res.json();
        setItems([...items, addedItem]);
        setShowAddModal(false);
        setNewItem({ url: "", publicId: "", type: 'image' });
      }
    } catch (err) {
      console.error("Failed to add hero item", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`/api/admin/hero/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter(item => item._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete hero item", err);
    }
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= items.length) return;

    // Swap items
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];

    // Update orders locally
    const updatedItems = newItems.map((item, i) => ({ ...item, order: i }));
    setItems(updatedItems);

    // Save to database
    try {
      await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: updatedItems })
      });
    } catch (err) {
      console.error("Failed to update orders", err);
      fetchItems(); // Revert on failure
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="apple-title-md !mb-0">Hero Slider Items</h3>
        <button 
          onClick={() => setShowAddModal(true)}
          className="apple-btn-primary flex items-center gap-2 py-2 px-4 text-sm"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={item._id} className="bg-white rounded-2xl border border-[#d2d2d7] overflow-hidden shadow-sm flex flex-col">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {item.type === 'image' ? (
                <Image 
                  src={item.url} 
                  alt="Hero Item" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <video src={item.url} className="w-full h-full object-cover" muted />
              )}
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md rounded-full p-1.5 text-white">
                {item.type === 'video' ? <Film className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
              </div>
            </div>
            
            <div className="p-4 flex justify-between items-center bg-white mt-auto">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 hover:bg-gray-100 rounded-md disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === items.length - 1}
                  className="p-1.5 hover:bg-gray-100 rounded-md disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={() => handleDeleteItem(item._id)}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No hero items found. Add some to get started.</p>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Add Hero Media</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>
            
            <div className="p-6 space-y-6">
              <HeroMediaUploader 
                onUploadSuccess={(url, publicId, type) => {
                  setNewItem({ url, publicId, type });
                }} 
              />
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 apple-btn-secondary py-3"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddItem}
                  disabled={!newItem.url || isSaving}
                  className="flex-1 apple-btn-primary py-3 disabled:opacity-50"
                >
                  {isSaving ? "Adding..." : "Add to Slider"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
