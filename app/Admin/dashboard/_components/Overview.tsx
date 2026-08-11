"use client";

interface OverviewProps {
  hasPermission: (p: string) => boolean;
  onNavigate: (view: any) => void;
}

export function Overview({ hasPermission, onNavigate }: OverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {hasPermission("appointments") && (
        <div 
          onClick={() => onNavigate("MANAGE_APPOINTMENTS")}
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Appointments</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Manage patient bookings and schedules.</p>
          <span className="text-[#0071e3] apple-body hover:underline flex items-center">
            View all <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}
      
      {hasPermission("doctors") && (
        <div 
          onClick={() => onNavigate("MANAGE_DOCTORS")}
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2 text-[#1d1d1f]">Doctors</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Update credentials and team roster.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Team <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("diseases") && (
        <div 
          onClick={() => onNavigate("MANAGE_DISEASES")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Diseases</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Create, edit and delete directory entries.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Entries <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("users") && (
        <div 
          onClick={() => onNavigate("MANAGE_USERS")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Settings</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Configure system and clinic preferences.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Open settings <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("testimonials") && (
        <div 
          onClick={() => onNavigate("MANAGE_TESTIMONIALS")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Testimonials</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Manage YouTube Shorts patient reviews.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Videos <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("podcasts") && (
        <div 
          onClick={() => onNavigate("MANAGE_PODCASTS")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Podcast</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Manage YouTube video links for Podcast page.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Videos <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("membership") && (
        <div 
          onClick={() => onNavigate("MANAGE_MEMBERSHIP")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Membership</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Manage posters and links for membership plans.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Posters <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("blogs") && (
        <div 
          onClick={() => onNavigate("MANAGE_BLOGS")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Blogs</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Create, edit and delete blog posts for SEO.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Blogs <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("all") && (
        <div 
          onClick={() => onNavigate("MANAGE_HERO")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Hero Slider</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Manage videos and images on the home page.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Slider <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}

      {hasPermission("careers") && (
        <div 
          onClick={() => onNavigate("MANAGE_CAREERS")} 
          className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
        >
          <h3 className="apple-title-md mb-2">Careers</h3>
          <p className="apple-body text-[#6e6e73] mb-6">Manage job postings and applications.</p>
          <span className="text-[#0071e3] apple-body flex items-center">
            Manage Careers <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span>
          </span>
        </div>
      )}
    </div>
  );
}
