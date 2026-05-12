"use client";

import { useState, useEffect } from "react";
import { Loader2, X, Plus, Trash2 } from "lucide-react";
import ImageUploader from "@/app/components/ui/ImageUploader";

export function MembershipManager() {
  const [membershipPlans, setMembershipPlans] = useState<any[]>([]);
  const [isLoadingMembershipPlans, setIsLoadingMembershipPlans] = useState(false);
  const [isSubmittingMembershipPlan, setIsSubmittingMembershipPlan] = useState(false);
  const [membershipPlanImage, setMembershipPlanImage] = useState("");
  const [membershipPlanCloudinaryId, setMembershipPlanCloudinaryId] = useState("");
  const [membershipPlanBuyNowLink, setMembershipPlanBuyNowLink] = useState("https://pages.razorpay.com/stores/singhdentalcare");
  const [deleteMembershipPlanId, setDeleteMembershipPlanId] = useState<string | null>(null);

  useEffect(() => {
    fetchMembershipPlans();
  }, []);

  const fetchMembershipPlans = async () => {
    setIsLoadingMembershipPlans(true);
    try {
      const res = await fetch("/api/admin/membership-plans");
      const data = await res.json();
      if (res.ok) setMembershipPlans(data);
    } catch (err) {
      console.error("Failed to fetch membership plans");
    } finally {
      setIsLoadingMembershipPlans(false);
    }
  };

  const handleMembershipPlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingMembershipPlan(true);
    try {
      const res = await fetch("/api/admin/membership-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: membershipPlanImage,
          cloudinaryId: membershipPlanCloudinaryId,
          buyNowLink: membershipPlanBuyNowLink,
          order: membershipPlans.length,
        }),
      });
      if (res.ok) {
        setMembershipPlanImage("");
        setMembershipPlanCloudinaryId("");
        setMembershipPlanBuyNowLink("https://pages.razorpay.com/stores/singhdentalcare");
        fetchMembershipPlans();
      }
    } catch (err) {
      console.error("Failed to save membership plan");
    } finally {
      setIsSubmittingMembershipPlan(false);
    }
  };

  const handleDeleteMembershipPlan = async () => {
    if (!deleteMembershipPlanId) return;
    try {
      await fetch(`/api/admin/membership-plans/${deleteMembershipPlanId}`, { method: "DELETE" });
      setDeleteMembershipPlanId(null);
      fetchMembershipPlans();
    } catch (err) {
      console.error("Failed to delete membership plan");
    }
  };

  return (
    <>
      {deleteMembershipPlanId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Membership Plan?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the poster and link from the membership page.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteMembershipPlanId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeleteMembershipPlan} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
            <h3 className="apple-title-md mb-2">Add Membership Plan</h3>
            <p className="apple-body text-[#6e6e73] mb-8 text-[15px]">Upload a poster and set the payment link.</p>
            <form onSubmit={handleMembershipPlanSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-2">Plan Poster</label>
                {membershipPlanImage ? (
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden group">
                    <img src={membershipPlanImage} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => {setMembershipPlanImage(""); setMembershipPlanCloudinaryId("");}} className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-red-500 shadow-sm"><X size={16} /></button>
                  </div>
                ) : (
                  <ImageUploader onUploadSuccess={(url, id) => { setMembershipPlanImage(url); setMembershipPlanCloudinaryId(id); }} />
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-2">Buy Now Link</label>
                <input 
                  type="url" 
                  required 
                  value={membershipPlanBuyNowLink} 
                  onChange={(e) => setMembershipPlanBuyNowLink(e.target.value)} 
                  className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all" 
                  placeholder="https://pages.razorpay.com/..."
                />
              </div>
              <button type="submit" disabled={isSubmittingMembershipPlan || !membershipPlanImage} className="w-full apple-btn-primary !rounded-xl flex items-center justify-center gap-2">
                {isSubmittingMembershipPlan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Save Plan
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
            <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50">
              <h3 className="apple-title-md !text-[19px]">Active Plans</h3>
            </div>
            {isLoadingMembershipPlans ? (
              <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {membershipPlans.map((plan) => (
                  <div key={plan._id} className="group relative bg-[#f5f5f7] rounded-2xl overflow-hidden border border-[#d2d2d7] transition-all hover:shadow-md">
                    <div className="aspect-[4/5] relative">
                      <img src={plan.image} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button 
                          onClick={() => setDeleteMembershipPlanId(plan._id)} 
                          className="p-3 bg-white text-red-500 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete Plan"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white border-t border-[#d2d2d7]">
                      <p className="text-[10px] font-bold text-[#6e6e73] uppercase tracking-widest mb-1">Buy Now Link</p>
                      <p className="text-xs text-[#0071e3] truncate font-medium">{plan.buyNowLink}</p>
                    </div>
                  </div>
                ))}
                {membershipPlans.length === 0 && (
                  <div className="col-span-full py-12 text-center text-[#6e6e73] apple-body">No membership plans added yet.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
