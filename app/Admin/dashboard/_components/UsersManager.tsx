"use client";

import { useState, useEffect } from "react";
import { Loader2, UserPlus, Edit3, Trash2 } from "lucide-react";

interface UsersManagerProps {
  currentUserEmail: string;
}

export function UsersManager({ currentUserEmail }: UsersManagerProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPermissions, setNewUserPermissions] = useState<string[]>(["appointments", "doctors", "diseases", "testimonials", "careers"]);
  const [userSubmitMessage, setUserSubmitMessage] = useState("");
  const [userSubmitError, setUserSubmitError] = useState("");
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Edit User Permissions State
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [isUpdatingPermissions, setIsUpdatingPermissions] = useState(false);

  const AVAILABLE_PERMISSIONS = [
    { id: "appointments", label: "Appointments" },
    { id: "doctors", label: "Medical Team" },
    { id: "diseases", label: "Diseases Directory" },
    { id: "testimonials", label: "Testimonials" },
    { id: "podcasts", label: "Podcasts" },
    { id: "membership", label: "Membership Plans" },
    { id: "blogs", label: "Blogs" },
    { id: "users", label: "User Management" },
    { id: "careers", label: "Careers & Jobs" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok) setUsers(data.users);
    } catch (err) {
      console.error("Failed to fetch users");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingUser(true);
    setUserSubmitError("");
    setUserSubmitMessage("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUserEmail,
          name: newUserName,
          password: newUserPassword,
          permissions: newUserPermissions.join(","),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserSubmitMessage("Admin user created successfully!");
        setNewUserEmail("");
        setNewUserName("");
        setNewUserPassword("");
        setNewUserPermissions(["appointments", "doctors", "diseases", "testimonials", "careers"]);
        fetchUsers();
      } else {
        setUserSubmitError(data.error || "Failed to create user.");
      }
    } catch (err) {
      setUserSubmitError("An error occurred.");
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleUpdatePermissions = async (userId: string, permissions: string[]) => {
    setIsUpdatingPermissions(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: userId,
          permissions: permissions.join(","),
        }),
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, permissions: permissions.join(",") } : u));
        setEditingUser(null);
      }
    } catch (err) {
      console.error("Failed to update permissions");
    } finally {
      setIsUpdatingPermissions(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    setIsDeletingUser(true);
    try {
      const res = await fetch(`/api/admin/users?id=${deleteUserId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== deleteUserId));
        setDeleteUserId(null);
      }
    } catch (err) {
      console.error("Failed to delete user");
    } finally {
      setIsDeletingUser(false);
    }
  };

  return (
    <>
      {/* Delete Overlay */}
      {deleteUserId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Administrator?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This user will no longer have access to the Admin Dashboard.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteUserId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeleteUser} disabled={isDeletingUser} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">
                {isDeletingUser ? <Loader2 className="w-5 h-5 animate-spin" /> : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Overlay */}
      {editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Edit Permissions</h3>
            <p className="apple-body text-[#6e6e73] mb-6">Update access for <span className="font-semibold text-[#1d1d1f]">{editingUser.email}</span></p>
            
            <div className="space-y-3 mb-8">
              {AVAILABLE_PERMISSIONS.map((p) => (
                <label key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-[#d2d2d7] hover:bg-gray-50 cursor-pointer transition-all">
                  <input 
                    type="checkbox" 
                    checked={editingUser.permissions?.split(",").includes(p.id) || editingUser.permissions === "all"} 
                    onChange={(e) => {
                      const current = editingUser.permissions === "all" ? AVAILABLE_PERMISSIONS.map(ap => ap.id) : (editingUser.permissions?.split(",") || []);
                      const next = e.target.checked 
                        ? [...current, p.id]
                        : current.filter((id: string) => id !== p.id);
                      setEditingUser({ ...editingUser, permissions: next.join(",") });
                    }}
                    className="w-5 h-5 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-[#0071e3]"
                  />
                  <span className="apple-body text-[15px]">{p.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setEditingUser(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button 
                onClick={() => handleUpdatePermissions(editingUser.id, editingUser.permissions.split(","))} 
                disabled={isUpdatingPermissions} 
                className="flex-1 px-6 py-3 rounded-full bg-[#0071e3] text-white font-medium hover:bg-[#005acc] transition-all flex items-center justify-center"
              >
                {isUpdatingPermissions ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
            <h3 className="apple-title-md mb-2">Add New Admin</h3>
            <p className="apple-body text-[#6e6e73] mb-8 text-[15px]">Create a new account for administrative access.</p>
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-2">Name</label>
                <input type="text" required value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" required value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-2">Password</label>
                <input type="password" required value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3] transition-all" />
              </div>
              
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider mb-3">Permissions</label>
                <div className="space-y-2">
                  {AVAILABLE_PERMISSIONS.map((p) => (
                    <label key={p.id} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={newUserPermissions.includes(p.id)} 
                        onChange={(e) => {
                          if (e.target.checked) setNewUserPermissions([...newUserPermissions, p.id]);
                          else setNewUserPermissions(newUserPermissions.filter(id => id !== p.id));
                        }}
                        className="w-4 h-4 rounded border-[#d2d2d7] text-[#0071e3] focus:ring-[#0071e3]"
                      />
                      <span className="text-sm text-[#6e6e73] group-hover:text-[#1d1d1f] transition-colors">{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={isAddingUser} className="w-full apple-btn-primary !rounded-xl flex items-center justify-center gap-2 pt-4">
                {isAddingUser ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />} Create Account
              </button>
              {userSubmitMessage && <p className="text-sm text-green-600 mt-2">{userSubmitMessage}</p>}
              {userSubmitError && <p className="text-sm text-red-600 mt-2">{userSubmitError}</p>}
            </form>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
            <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50">
              <h3 className="apple-title-md !text-[19px]">Existing Administrators</h3>
            </div>
            {isLoadingUsers ? (
              <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
            ) : (
              <div className="divide-y divide-[#d2d2d7]">
                {users.map((u) => (
                  <div key={u.id} className="p-6 flex justify-between items-center group hover:bg-gray-50/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-bold">
                        {u.name?.charAt(0) || u.email.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#1d1d1f]">{u.name || "N/A"}</p>
                        <p className="text-sm text-[#6e6e73] mb-1">{u.email}</p>
                        <div className="flex flex-wrap gap-1">
                          {(u.permissions === "all" ? AVAILABLE_PERMISSIONS.map(p => p.id) : (u.permissions?.split(",") || [])).map((p: string) => (
                            <span key={p} className="px-2 py-0.5 bg-blue-50 text-[#0071e3] text-[10px] font-bold uppercase rounded-md border border-blue-100">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setEditingUser(u)} 
                        className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                        title="Edit Permissions"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {u.email !== currentUserEmail && (
                        <button 
                          onClick={() => setDeleteUserId(u.id)} 
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
