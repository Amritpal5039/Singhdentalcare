"use client";

import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import ImageUploader from "@/app/components/ui/ImageUploader";
import TiptapEditor from "@/app/components/ui/TiptapEditor";
import { 
  Loader2, Trash2, Edit3, Plus, ArrowLeft, 
  X, UserPlus, Search, Users, LayoutDashboard,
  ChevronUp, ChevronDown, Check, Download, Calendar, FileText, Phone
} from "lucide-react";
import Image from "next/image";

type ViewState = "OVERVIEW" | "MANAGE_DISEASES" | "CREATE_DISEASE" | "EDIT_DISEASE" | "MANAGE_USERS" | "MANAGE_DOCTORS" | "MANAGE_TESTIMONIALS" | "MANAGE_APPOINTMENTS" | "MANAGE_PODCASTS";

export default function AdminDashboard() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [currentView, setCurrentView] = useState<ViewState>("OVERVIEW");
  
  // Appointments State
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [appointmentFilter, setAppointmentFilter] = useState("all");
  const [appointmentStartDate, setAppointmentStartDate] = useState("");
  const [appointmentEndDate, setAppointmentEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  
  // Testimonials State
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(false);
  const [isSubmittingTestimonial, setIsSubmittingTestimonial] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialTitle, setTestimonialTitle] = useState("");
  const [testimonialVideoUrl, setTestimonialVideoUrl] = useState("");
  const [deleteTestimonialId, setDeleteTestimonialId] = useState<string | null>(null);

  // Podcasts State
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(false);
  const [isSubmittingPodcast, setIsSubmittingPodcast] = useState(false);
  const [editingPodcastId, setEditingPodcastId] = useState<string | null>(null);
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastVideoUrl, setPodcastVideoUrl] = useState("");
  const [deletePodcastId, setDeletePodcastId] = useState<string | null>(null);

  // Diseases State
  const [diseases, setDiseases] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isLoadingDiseases, setIsLoadingDiseases] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDiseases, setTotalDiseases] = useState(0);

  // Doctors State
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(false);
  const [isSubmittingDoctor, setIsSubmittingDoctor] = useState(false);
  const [editingDoctorId, setEditingDoctorId] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [doctorCredentials, setDoctorCredentials] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");
  const [doctorExperience, setDoctorExperience] = useState("");
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorCloudinaryId, setDoctorCloudinaryId] = useState("");
  const [deleteDoctorId, setDeleteIdDoctor] = useState<string | null>(null);

  // User Management State
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPermissions, setNewUserPermissions] = useState<string[]>(["appointments", "doctors", "diseases", "testimonials"]);
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
    { id: "users", label: "User Management" },
  ];

  const hasPermission = (permission: string) => {
    if (!session?.user) return false;
    // @ts-ignore - custom fields. Default to "all" for legacy accounts
    const userPermissions = (session.user as any).permissions || "all";
    if (userPermissions === "all") return true;
    return userPermissions.split(",").includes(permission);
  };

  // Disease Form State
  const [editingDiseaseId, setEditingDiseaseId] = useState<string | null>(null);
  const [diseaseName, setDiseaseName] = useState("");
  const [diseaseDescription, setDiseaseDescription] = useState<any>(null);
  const [diseasePictureLink, setDiseasePictureLink] = useState("");
  const [diseaseCloudinaryId, setDiseaseCloudinaryId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Delete Confirmation State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (currentView === "MANAGE_DISEASES") {
      fetchDiseases(currentPage, selectedLetter);
    } else if (currentView === "MANAGE_USERS") {
      fetchUsers();
    } else if (currentView === "MANAGE_DOCTORS") {
      fetchDoctors();
    } else if (currentView === "MANAGE_TESTIMONIALS") {
      fetchTestimonials();
    } else if (currentView === "MANAGE_APPOINTMENTS") {
      fetchAppointments();
    } else if (currentView === "MANAGE_PODCASTS") {
      fetchPodcasts();
    }
  }, [currentView, currentPage, selectedLetter, appointmentFilter, appointmentStartDate, appointmentEndDate]);

  const fetchAppointments = async () => {
    setIsLoadingAppointments(true);
    try {
      let url = `/api/admin/appointments?filter=${appointmentFilter}`;
      if (appointmentStartDate) url += `&startDate=${appointmentStartDate}`;
      if (appointmentEndDate) url += `&endDate=${appointmentEndDate}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch appointments");
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleToggleContacted = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isContacted: !currentStatus }),
      });
      if (res.ok) {
        setAppointments(appointments.map(a => a._id === id ? { ...a, isContacted: !currentStatus } : a));
      }
    } catch (err) {
      console.error("Failed to update appointment");
    }
  };

  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      const { utils, writeFile } = await import("xlsx");
      
      const dataToExport = appointments.map(a => ({
        "Name": a.name,
        "Phone": a.phoneNumber,
        "Location": a.location,
        "Country": a.country,
        "Treatment": a.treatment,
        "Medical History": a.medicalHistory || "N/A",
        "Medication": a.medication || "N/A",
        "Contacted": a.isContacted ? "Yes" : "No",
        "Date": new Date(a.createdAt).toLocaleDateString()
      }));

      const ws = utils.json_to_sheet(dataToExport);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Appointments");
      writeFile(wb, `Appointments_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const fetchTestimonials = async () => {
    setIsLoadingTestimonials(true);
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      if (res.ok) setTestimonials(data);
    } catch (err) {
      console.error("Failed to fetch testimonials");
    } finally {
      setIsLoadingTestimonials(false);
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingTestimonial(true);
    try {
      const url = editingTestimonialId ? `/api/admin/testimonials/${editingTestimonialId}` : "/api/admin/testimonials";
      const method = editingTestimonialId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: testimonialTitle,
          videoUrl: testimonialVideoUrl,
          order: editingTestimonialId ? undefined : testimonials.length,
        }),
      });
      if (res.ok) {
        setTestimonialTitle("");
        setTestimonialVideoUrl("");
        setEditingTestimonialId(null);
        fetchTestimonials();
      }
    } catch (err) {
      console.error("Failed to save testimonial");
    } finally {
      setIsSubmittingTestimonial(false);
    }
  };

  const handleDeleteTestimonial = async () => {
    if (!deleteTestimonialId) return;
    try {
      await fetch(`/api/admin/testimonials/${deleteTestimonialId}`, { method: "DELETE" });
      setDeleteTestimonialId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to delete testimonial");
    }
  };

  const updateTestimonialOrder = async (id: string, newOrder: number) => {
    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchTestimonials();
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const moveTestimonial = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= testimonials.length) return;
    const t1 = testimonials[index];
    const t2 = testimonials[newIndex];
    updateTestimonialOrder(t1._id, newIndex);
    updateTestimonialOrder(t2._id, index);
  };

  const fetchPodcasts = async () => {
    setIsLoadingPodcasts(true);
    try {
      const res = await fetch("/api/admin/podcasts");
      const data = await res.json();
      if (res.ok) setPodcasts(data);
    } catch (err) {
      console.error("Failed to fetch podcasts");
    } finally {
      setIsLoadingPodcasts(false);
    }
  };

  const handlePodcastSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingPodcast(true);
    try {
      const url = editingPodcastId ? `/api/admin/podcasts/${editingPodcastId}` : "/api/admin/podcasts";
      const method = editingPodcastId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: podcastTitle,
          videoUrl: podcastVideoUrl,
          order: editingPodcastId ? undefined : podcasts.length,
        }),
      });
      if (res.ok) {
        setPodcastTitle("");
        setPodcastVideoUrl("");
        setEditingPodcastId(null);
        fetchPodcasts();
      }
    } catch (err) {
      console.error("Failed to save podcast");
    } finally {
      setIsSubmittingPodcast(false);
    }
  };

  const handleDeletePodcast = async () => {
    if (!deletePodcastId) return;
    try {
      await fetch(`/api/admin/podcasts/${deletePodcastId}`, { method: "DELETE" });
      setDeletePodcastId(null);
      fetchPodcasts();
    } catch (err) {
      console.error("Failed to delete podcast");
    }
  };

  const updatePodcastOrder = async (id: string, newOrder: number) => {
    try {
      await fetch(`/api/admin/podcasts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchPodcasts();
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const movePodcast = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= podcasts.length) return;
    const p1 = podcasts[index];
    const p2 = podcasts[newIndex];
    updatePodcastOrder(p1._id, newIndex);
    updatePodcastOrder(p2._id, index);
  };

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

  const fetchDoctors = async () => {
    setIsLoadingDoctors(true);
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      if (res.ok) setDoctors(data.doctors);
    } catch (err) {
      console.error("Failed to fetch doctors");
    } finally {
      setIsLoadingDoctors(false);
    }
  };

  const handleDoctorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingDoctor(true);
    try {
      const url = editingDoctorId ? `/api/doctors/${editingDoctorId}` : "/api/doctors";
      const method = editingDoctorId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: doctorName,
          credentials: doctorCredentials,
          specialty: doctorSpecialty,
          experience: doctorExperience,
          image: doctorImage,
          cloudinaryId: doctorCloudinaryId,
          order: editingDoctorId ? undefined : doctors.length, // Only set default order for new ones
        }),
      });
      if (res.ok) {
        resetDoctorForm();
        fetchDoctors();
      }
    } catch (err) {
      console.error("Failed to save doctor");
    } finally {
      setIsSubmittingDoctor(false);
    }
  };

  const resetDoctorForm = () => {
    setDoctorName("");
    setDoctorCredentials("");
    setDoctorSpecialty("");
    setDoctorExperience("");
    setDoctorImage("");
    setDoctorCloudinaryId("");
    setEditingDoctorId(null);
  };

  const handleEditDoctor = (d: any) => {
    setEditingDoctorId(d._id);
    setDoctorName(d.name);
    setDoctorCredentials(d.credentials);
    setDoctorSpecialty(d.specialty);
    setDoctorExperience(d.experience);
    setDoctorImage(d.image);
    setDoctorCloudinaryId(d.cloudinaryId);
  };

  const handleDeleteDoctor = async () => {
    if (!deleteDoctorId) return;
    try {
      await fetch(`/api/doctors/${deleteDoctorId}`, { method: "DELETE" });
      setDeleteIdDoctor(null);
      fetchDoctors();
    } catch (err) {
      console.error("Failed to delete doctor");
    }
  };

  const updateDoctorOrder = async (doctorId: string, newOrder: number) => {
    try {
      await fetch(`/api/doctors/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder }),
      });
      fetchDoctors();
    } catch (err) {
      console.error("Failed to update order");
    }
  };

  const moveDoctor = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= doctors.length) return;

    const doctor1 = doctors[index];
    const doctor2 = doctors[newIndex];

    // Swap orders
    updateDoctorOrder(doctor1._id, newIndex);
    updateDoctorOrder(doctor2._id, index);
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
        setNewUserPermissions(["appointments", "doctors", "diseases", "testimonials"]);
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

  const fetchDiseases = async (page: number = 1, letter: string | null = null) => {
    setIsLoadingDiseases(true);
    try {
      let url = `/api/diseases-conditions?page=${page}&limit=12`;
      if (letter) url += `&letter=${letter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setDiseases(data.diseases);
        setTotalPages(data.pagination.totalPages);
        setTotalDiseases(data.pagination.total);
      }
    } catch (err) {
      console.error("Failed to fetch diseases");
    } finally {
      setIsLoadingDiseases(false);
    }
  };

  const filteredDiseases = searchQuery.length > 0 
    ? diseases.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.slug.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : diseases;

  const resetForm = () => {
    setDiseaseName("");
    setDiseaseDescription(null);
    setDiseasePictureLink("");
    setDiseaseCloudinaryId("");
    setEditingDiseaseId(null);
    setSubmitMessage("");
    setSubmitError("");
    setSearchQuery("");
    setSelectedLetter(null);
    setCurrentPage(1);
  };

  const handleDiseaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!diseasePictureLink) {
      setSubmitError("Please upload an image first.");
      return;
    }
    if (!diseaseDescription) {
      setSubmitError("Please provide a description.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    const url = editingDiseaseId 
      ? `/api/diseases-conditions/${editingDiseaseId}`
      : "/api/diseases-conditions";
    
    const method = editingDiseaseId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: diseaseName,
          description: diseaseDescription,
          pictureLink: diseasePictureLink,
          cloudinaryId: diseaseCloudinaryId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitMessage(`Disease ${editingDiseaseId ? "updated" : "added"} successfully!`);
        if (!editingDiseaseId) resetForm();
        fetchDiseases(currentPage, selectedLetter);
      } else {
        setSubmitError(data.error || "Failed to save disease.");
      }
    } catch (err) {
      setSubmitError("An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (disease: any) => {
    setIsLoadingDiseases(true);
    try {
      const res = await fetch(`/api/diseases-conditions/${disease._id}`);
      const data = await res.json();
      if (res.ok) {
        const d = data.disease;
        setEditingDiseaseId(d._id);
        setDiseaseName(d.name);
        setDiseaseDescription(d.description);
        setDiseasePictureLink(d.pictureLink);
        setDiseaseCloudinaryId(d.cloudinaryId);
        setCurrentView("EDIT_DISEASE");
      }
    } catch (err) {
      console.error("Failed to fetch disease details");
    } finally {
      setIsLoadingDiseases(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/diseases-conditions/${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        setDiseases(diseases.filter(d => d._id !== deleteId));
        setDeleteId(null);
        fetchDiseases(currentPage, selectedLetter);
      }
    } catch (err) {
      console.error("Failed to delete disease");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <div className="animate-spin h-8 w-8 border-4 border-[#0071e3] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/Admin/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      {/* Delete Confirmation Overlays */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Delete Permanently?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the entry and its image from Cloudinary. This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDelete} disabled={isDeleting} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteDoctorId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Doctor?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the doctor from the website directory.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteIdDoctor(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeleteDoctor} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

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

      {deleteTestimonialId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Testimonial?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the patient testimonial from the website.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteTestimonialId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeleteTestimonial} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {deletePodcastId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-[24px] max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
            <h3 className="apple-title-md mb-2">Remove Podcast?</h3>
            <p className="apple-body text-[#6e6e73] mb-8">This will remove the video from the podcast page.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeletePodcastId(null)} className="flex-1 px-6 py-3 rounded-full bg-gray-100 font-medium hover:bg-gray-200 transition-all">Cancel</button>
              <button onClick={handleDeletePodcast} className="flex-1 px-6 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-all flex items-center justify-center">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar/Nav */}
      <nav className="bg-white border-b border-[#d2d2d7] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setCurrentView("OVERVIEW")}>
          <h1 className="apple-title-md !mb-0 tracking-tight">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-6">
          <span className="apple-caption text-[#6e6e73]">Logged in as <span className="font-semibold text-[#1d1d1f]">{session.user.email}</span></span>
          <button onClick={async () => { await authClient.signOut(); router.push("/Admin/login"); }} className="text-[#0071e3] apple-caption hover:underline font-medium">Sign Out</button>
        </div>
      </nav>

      <div className="apple-container py-12">
        {/* View Header */}
        <div className="apple-heading-group mb-12 flex justify-between items-end">
          <div>
            <p className="apple-eyebrow">
              {currentView === "OVERVIEW" ? "Overview" : 
               currentView === "MANAGE_USERS" ? "User Management" : 
               currentView === "MANAGE_DOCTORS" ? "Medical Team" : 
               currentView === "MANAGE_APPOINTMENTS" ? "Patient Bookings" : "Diseases & Conditions"}
            </p>
            <h2 className="apple-title-xl">
              {currentView === "OVERVIEW" && `Welcome back, ${session.user.name || "Admin"}.`}
              {currentView === "MANAGE_DISEASES" && "Manage Directory"}
              {currentView === "CREATE_DISEASE" && "Add New Entry"}
              {currentView === "EDIT_DISEASE" && "Edit Entry"}
              {currentView === "MANAGE_USERS" && "System Administrators"}
              {currentView === "MANAGE_DOCTORS" && "Meet The Dentists"}
              {currentView === "MANAGE_APPOINTMENTS" && "Appointments"}
              {currentView === "MANAGE_TESTIMONIALS" && "Patient Reviews"}
            </h2>
          </div>
          {currentView !== "OVERVIEW" && (
            <button onClick={() => { 
                if (currentView === "CREATE_DISEASE" || currentView === "EDIT_DISEASE") setCurrentView("MANAGE_DISEASES"); 
                else setCurrentView("OVERVIEW"); 
                resetForm(); 
              }} className="flex items-center text-[#0071e3] font-medium hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
          )}
        </div>

        {currentView === "OVERVIEW" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hasPermission("appointments") && (
              <div 
                onClick={() => setCurrentView("MANAGE_APPOINTMENTS")}
                className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
              >
                <h3 className="apple-title-md mb-2">Appointments</h3>
                <p className="apple-body text-[#6e6e73] mb-6">Manage patient bookings and schedules.</p>
                <span className="text-[#0071e3] apple-body hover:underline flex items-center">View all <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span></span>
              </div>
            )}
            
            {hasPermission("doctors") && (
              <div 
                onClick={() => setCurrentView("MANAGE_DOCTORS")}
                className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer"
              >
                <h3 className="apple-title-md mb-2 text-[#1d1d1f]">Doctors</h3>
                <p className="apple-body text-[#6e6e73] mb-6">Update credentials and team roster.</p>
                <span className="text-[#0071e3] apple-body flex items-center">Manage Team <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span></span>
              </div>
            )}

            {hasPermission("diseases") && (
              <div onClick={() => setCurrentView("MANAGE_DISEASES")} className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer">
                <h3 className="apple-title-md mb-2">Diseases</h3>
                <p className="apple-body text-[#6e6e73] mb-6">Create, edit and delete directory entries.</p>
                <span className="text-[#0071e3] apple-body flex items-center">Manage Entries <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span></span>
              </div>
            )}

            {hasPermission("users") && (
              <div onClick={() => setCurrentView("MANAGE_USERS")} className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer">
                <h3 className="apple-title-md mb-2">Settings</h3>
                <p className="apple-body text-[#6e6e73] mb-6">Configure system and clinic preferences.</p>
                <span className="text-[#0071e3] apple-body flex items-center">Open settings <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span></span>
              </div>
            )}

            {hasPermission("testimonials") && (
              <div onClick={() => setCurrentView("MANAGE_TESTIMONIALS")} className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer">
                <h3 className="apple-title-md mb-2">Testimonials</h3>
                <p className="apple-body text-[#6e6e73] mb-6">Manage YouTube Shorts patient reviews.</p>
                <span className="text-[#0071e3] apple-body flex items-center">Manage Videos <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span></span>
              </div>
            )}

            {hasPermission("podcasts") && (
              <div onClick={() => setCurrentView("MANAGE_PODCASTS")} className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] hover:shadow-lg transition-all group cursor-pointer">
                <h3 className="apple-title-md mb-2">Podcast</h3>
                <p className="apple-body text-[#6e6e73] mb-6">Manage YouTube video links for Podcast page.</p>
                <span className="text-[#0071e3] apple-body flex items-center">Manage Videos <span className="ml-1 group-hover:translate-x-1 transition-transform">›</span></span>
              </div>
            )}
          </div>
        )}

        {currentView === "MANAGE_PODCASTS" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
                <h3 className="apple-title-md mb-2">{editingPodcastId ? "Edit Podcast" : "Add New Podcast"}</h3>
                <form onSubmit={handlePodcastSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Video Title</label>
                    <input type="text" value={podcastTitle} onChange={(e) => setPodcastTitle(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="e.g. Expert Talk on Aligners" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">YouTube URL</label>
                    <input type="text" required value={podcastVideoUrl} onChange={(e) => setPodcastVideoUrl(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="https://youtube.com/watch?v=..." />
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmittingPodcast || !podcastVideoUrl} className="w-full apple-btn-primary !rounded-xl">
                      {isSubmittingPodcast ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : editingPodcastId ? "Update Video" : "Add Video"}
                    </button>
                    {editingPodcastId && (
                      <button type="button" onClick={() => { setEditingPodcastId(null); setPodcastTitle(""); setPodcastVideoUrl(""); }} className="w-full mt-2 px-4 py-2 rounded-xl border border-[#d2d2d7] hover:bg-gray-50 transition-all">Cancel</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
                <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50 flex justify-between items-center">
                  <h3 className="apple-title-md !text-[19px]">Active Videos</h3>
                  <p className="text-xs text-[#6e6e73]">First video will be the main autoplay video</p>
                </div>
                {isLoadingPodcasts ? (
                  <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
                ) : (
                  <div className="divide-y divide-[#d2d2d7]">
                    {podcasts.map((p, index) => (
                      <div key={p._id} className="p-4 flex items-center gap-6 group hover:bg-gray-50/50 transition-all">
                        <div className="flex flex-col gap-1">
                          <button onClick={() => movePodcast(index, "up")} disabled={index === 0} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronUp size={16} /></button>
                          <button onClick={() => movePodcast(index, "down")} disabled={index === podcasts.length - 1} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronDown size={16} /></button>
                        </div>
                        <div className="w-32 aspect-video bg-gray-100 rounded-lg overflow-hidden border border-[#d2d2d7] flex-shrink-0">
                          <img src={`https://img.youtube.com/vi/${p.videoId}/mqdefault.jpg`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                             <p className="font-semibold text-[#1d1d1f] line-clamp-1">{p.title || "Untitled Video"}</p>
                             {index === 0 && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded">Main Video</span>}
                          </div>
                          <p className="text-xs text-[#6e6e73] truncate max-w-[200px]">{p.videoUrl}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => { setEditingPodcastId(p._id); setPodcastTitle(p.title || ""); setPodcastVideoUrl(p.videoUrl); }} className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-full"><Edit3 size={18} /></button>
                          <button onClick={() => setDeletePodcastId(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                    {podcasts.length === 0 && (
                      <div className="p-12 text-center text-[#6e6e73] apple-body">No videos added yet.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === "MANAGE_TESTIMONIALS" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
                <h3 className="apple-title-md mb-2">{editingTestimonialId ? "Edit Testimonial" : "Add New Testimonial"}</h3>
                <form onSubmit={handleTestimonialSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Short Title / Patient Name</label>
                    <input type="text" value={testimonialTitle} onChange={(e) => setTestimonialTitle(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="Optional" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">YouTube / Shorts URL</label>
                    <input type="text" required value={testimonialVideoUrl} onChange={(e) => setTestimonialVideoUrl(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" placeholder="https://youtube.com/shorts/..." />
                  </div>
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmittingTestimonial || !testimonialVideoUrl} className="w-full apple-btn-primary !rounded-xl">
                      {isSubmittingTestimonial ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : editingTestimonialId ? "Update Testimonial" : "Add Testimonial"}
                    </button>
                    {editingTestimonialId && (
                      <button type="button" onClick={() => { setEditingTestimonialId(null); setTestimonialTitle(""); setTestimonialVideoUrl(""); }} className="w-full mt-2 px-4 py-2 rounded-xl border border-[#d2d2d7] hover:bg-gray-50 transition-all">Cancel</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
                <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50 flex justify-between items-center">
                  <h3 className="apple-title-md !text-[19px]">Active Testimonials</h3>
                  <p className="text-xs text-[#6e6e73]">Drag or use arrows to reorder</p>
                </div>
                {isLoadingTestimonials ? (
                  <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
                ) : (
                  <div className="divide-y divide-[#d2d2d7]">
                    {testimonials.map((t, index) => (
                      <div key={t._id} className="p-4 flex items-center gap-6 group hover:bg-gray-50/50 transition-all">
                        <div className="flex flex-col gap-1">
                          <button onClick={() => moveTestimonial(index, "up")} disabled={index === 0} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronUp size={16} /></button>
                          <button onClick={() => moveTestimonial(index, "down")} disabled={index === testimonials.length - 1} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronDown size={16} /></button>
                        </div>
                        <div className="w-16 h-24 bg-gray-100 rounded-lg overflow-hidden border border-[#d2d2d7] flex-shrink-0">
                          <img src={`https://img.youtube.com/vi/${t.videoId}/mqdefault.jpg`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-[#1d1d1f] line-clamp-1">{t.title || "Untitled Testimonial"}</p>
                          <p className="text-xs text-[#6e6e73] truncate max-w-[200px]">{t.videoUrl}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => { setEditingTestimonialId(t._id); setTestimonialTitle(t.title || ""); setTestimonialVideoUrl(t.videoUrl); }} className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-full"><Edit3 size={18} /></button>
                          <button onClick={() => setDeleteTestimonialId(t._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                    {testimonials.length === 0 && (
                      <div className="p-12 text-center text-[#6e6e73] apple-body">No testimonials added yet.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === "MANAGE_DOCTORS" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-[24px] border border-[#d2d2d7] sticky top-24">
                <h3 className="apple-title-md mb-2">{editingDoctorId ? "Edit Doctor" : "Add New Doctor"}</h3>
                <form onSubmit={handleDoctorSubmit} className="space-y-4 mt-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Full Name</label>
                    <input type="text" required value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Credentials (e.g. BDS, MDS)</label>
                    <input type="text" required value={doctorCredentials} onChange={(e) => setDoctorCredentials(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Specialty</label>
                    <input type="text" required value={doctorSpecialty} onChange={(e) => setDoctorSpecialty(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Experience</label>
                    <input type="text" required value={doctorExperience} onChange={(e) => setDoctorExperience(e.target.value)} className="w-full px-4 py-2 border border-[#d2d2d7] rounded-xl outline-none focus:ring-2 focus:ring-[#0071e3]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1d1d1f] uppercase mb-2">Photo</label>
                    {doctorImage ? (
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
                        <img src={doctorImage} className="w-full h-full object-cover" />
                        <button onClick={() => {setDoctorImage(""); setDoctorCloudinaryId("");}} className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full text-red-500 shadow-sm"><X size={16} /></button>
                      </div>
                    ) : (
                      <ImageUploader onUploadSuccess={(url, id) => { setDoctorImage(url); setDoctorCloudinaryId(id); }} />
                    )}
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="submit" disabled={isSubmittingDoctor || !doctorImage} className="flex-1 apple-btn-primary !rounded-xl">
                      {isSubmittingDoctor ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : editingDoctorId ? "Update" : "Add Team Member"}
                    </button>
                    {editingDoctorId && <button type="button" onClick={resetDoctorForm} className="px-4 py-2 rounded-xl border border-[#d2d2d7] hover:bg-gray-50 transition-all">Cancel</button>}
                  </div>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden">
                <div className="p-6 border-b border-[#d2d2d7] bg-gray-50/50 flex justify-between items-center">
                  <h3 className="apple-title-md !text-[19px]">Display Order</h3>
                  <p className="text-xs text-[#6e6e73]">Use arrows to reorder</p>
                </div>
                {isLoadingDoctors ? (
                  <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
                ) : (
                  <div className="divide-y divide-[#d2d2d7]">
                    {doctors.map((d, index) => (
                      <div key={d._id} className="p-4 flex items-center gap-6 group hover:bg-gray-50/50 transition-all">
                        <div className="flex flex-col gap-1">
                          <button onClick={() => moveDoctor(index, "up")} disabled={index === 0} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronUp size={16} /></button>
                          <button onClick={() => moveDoctor(index, "down")} disabled={index === doctors.length - 1} className="p-1 hover:bg-white rounded disabled:opacity-20"><ChevronDown size={16} /></button>
                        </div>
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-[#d2d2d7]">
                          <img src={d.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-[#1d1d1f]">{d.name}</p>
                          <p className="text-xs text-[#6e6e73]">{d.specialty} • {d.experience}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={() => handleEditDoctor(d)} className="p-2 text-[#0071e3] hover:bg-blue-50 rounded-full"><Edit3 size={18} /></button>
                          <button onClick={() => setDeleteIdDoctor(d._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentView === "MANAGE_DISEASES" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[20px] border border-[#d2d2d7] space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 w-full max-w-md relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search diseases by name or slug..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-[#d2d2d7] rounded-full focus:ring-2 focus:ring-[#0071e3] outline-none transition-all" />
                </div>
                <div className="flex items-center gap-4">
                  <p className="apple-caption text-[#6e6e73]">Total: {totalDiseases}</p>
                  <button onClick={() => { resetForm(); setCurrentView("CREATE_DISEASE"); }} className="apple-btn-primary !py-2 !px-6 flex items-center"><Plus className="w-4 h-4 mr-2" />Add New</button>
                </div>
              </div>

              {/* Letter Filter */}
              <div className="flex flex-wrap gap-1 border-t border-gray-100 pt-4">
                <button
                  onClick={() => { setSelectedLetter(null); setCurrentPage(1); }}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${!selectedLetter ? "bg-[#0071e3] text-white" : "hover:bg-gray-100 text-[#6e6e73]"}`}
                >
                  All
                </button>
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").map((l) => (
                  <button
                    key={l}
                    onClick={() => { setSelectedLetter(l); setCurrentPage(1); }}
                    className={`w-8 h-8 rounded-md text-sm font-medium transition-all flex items-center justify-center ${selectedLetter === l ? "bg-[#0071e3] text-white" : "hover:bg-gray-100 text-[#6e6e73]"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {isLoadingDiseases ? (
              <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDiseases.map((d) => (
                    <div key={d._id} className="bg-white rounded-[24px] border border-[#d2d2d7] overflow-hidden group hover:shadow-md transition-all">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 bg-[#f5f5f7] rounded-xl overflow-hidden flex items-center justify-center">
                            {d.pictureLink ? (
                              <img src={d.pictureLink} alt={d.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl">🦷</span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(d)} className="p-2 rounded-full hover:bg-gray-100 text-[#6e6e73] transition-all"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => setDeleteId(d._id)} className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                        <h4 className="apple-title-md !text-[19px] mb-1 line-clamp-1">{d.name}</h4>
                        <p className="apple-caption text-[#6e6e73] mb-4">Slug: {d.slug}</p>
                        <Link href={`/disease/${d.slug}`} target="_blank" className="text-[#0071e3] text-sm font-medium hover:underline">View public page ›</Link>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredDiseases.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-white rounded-[24px] border border-dashed border-[#d2d2d7]">
                    <p className="apple-body text-[#6e6e73]">{searchQuery ? "No matching entries found." : "No entries found for this filter."}</p>
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12 pb-8">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className="p-2 rounded-full border border-[#d2d2d7] disabled:opacity-30 hover:bg-white transition-all"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <span className="apple-body font-medium">Page {currentPage} of {totalPages}</span>
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className="p-2 rounded-full border border-[#d2d2d7] disabled:opacity-30 hover:bg-white transition-all rotate-180"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {currentView === "MANAGE_USERS" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Edit Permissions Overlay */}
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
                              : current.filter(id => id !== p.id);
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
                          {u.email !== session.user.email && (
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
        )}

        {(currentView === "CREATE_DISEASE" || currentView === "EDIT_DISEASE") && (
          <div className="bg-white p-8 lg:p-12 rounded-[32px] border border-[#d2d2d7]">
            <form onSubmit={handleDiseaseSubmit} className="space-y-10 max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Disease / Condition Name</label>
                    <input type="text" required value={diseaseName} onChange={(e) => setDiseaseName(e.target.value)} className="w-full px-5 py-3 border border-[#d2d2d7] rounded-xl focus:ring-2 focus:ring-[#0071e3] focus:border-transparent outline-none transition-all apple-body" placeholder="e.g., Dental Caries" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Cover Image</label>
                    {diseasePictureLink ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#d2d2d7]">
                        <Image src={diseasePictureLink} alt="Preview" fill className="object-cover" />
                        <button type="button" onClick={() => { setDiseasePictureLink(""); setDiseaseCloudinaryId(""); }} className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-500 shadow-sm transition-all"><X className="w-5 h-5" /></button>
                      </div>
                    ) : (
                      <ImageUploader onUploadSuccess={(url, id) => { setDiseasePictureLink(url); setDiseaseCloudinaryId(id); }} />
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                   <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <h4 className="text-blue-800 font-semibold mb-2 flex items-center"><Plus className="w-4 h-4 mr-2" /> Pro Tip: Inline Images</h4>
                      <p className="text-blue-700 text-sm leading-relaxed">You can add more images inside the description area using the image icon in the editor toolbar. You can even resize them!</p>
                   </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Rich Content Description</label>
                <TiptapEditor value={diseaseDescription} onChange={(val) => setDiseaseDescription(val)} placeholder="Tell us more about this condition..." />
              </div>
              <div className="pt-6 border-t border-[#d2d2d7] flex flex-col sm:flex-row gap-4">
                <button type="submit" disabled={isSubmitting || !diseasePictureLink} className={`flex-1 px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center transition-all shadow-md ${isSubmitting || !diseasePictureLink ? "bg-black/50 cursor-not-allowed" : "bg-[#0071e3] hover:bg-[#005acc] hover:scale-[1.02]"}`}>
                  {isSubmitting && <Loader2 className="w-5 h-5 mr-3 animate-spin" />} {isSubmitting ? "Processing..." : editingDiseaseId ? "Update Published Entry" : "Publish Entry"}
                </button>
                <button type="button" onClick={() => { setCurrentView("MANAGE_DISEASES"); resetForm(); }} className="px-8 py-4 rounded-full border border-[#d2d2d7] font-semibold hover:bg-gray-50 transition-all text-[#1d1d1f]">Discard Changes</button>
              </div>
              {submitMessage && <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100 animate-in fade-in slide-in-from-top-2">{submitMessage}</div>}
              {submitError && <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 animate-in fade-in slide-in-from-top-2">{submitError}</div>}
            </form>
          </div>
        )}

        {currentView === "MANAGE_APPOINTMENTS" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[24px] border border-[#d2d2d7] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <button 
                  onClick={() => setAppointmentFilter("all")} 
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${appointmentFilter === "all" ? "bg-[#1d1d1f] text-white" : "bg-gray-100 text-[#6e6e73] hover:bg-gray-200"}`}
                >
                  All Requests
                </button>
                <button 
                  onClick={() => setAppointmentFilter("non-contacted")} 
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${appointmentFilter === "non-contacted" ? "bg-[#0071e3] text-white" : "bg-gray-100 text-[#6e6e73] hover:bg-gray-200"}`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setAppointmentFilter("contacted")} 
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${appointmentFilter === "contacted" ? "bg-green-600 text-white" : "bg-gray-100 text-[#6e6e73] hover:bg-gray-200"}`}
                >
                  Contacted
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-[#d2d2d7]">
                  <Calendar className="w-4 h-4 text-[#6e6e73]" />
                  <input type="date" value={appointmentStartDate} onChange={(e) => setAppointmentStartDate(e.target.value)} className="bg-transparent text-sm outline-none" />
                  <span className="text-[#d2d2d7]">to</span>
                  <input type="date" value={appointmentEndDate} onChange={(e) => setAppointmentEndDate(e.target.value)} className="bg-transparent text-sm outline-none" />
                </div>
                <button 
                  onClick={exportToExcel}
                  disabled={isExporting || appointments.length === 0}
                  className="bg-white border border-[#d2d2d7] px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Export
                </button>
              </div>
            </div>

            {isLoadingAppointments ? (
              <div className="p-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {appointments.map((a) => (
                  <div key={a._id} className={`bg-white p-6 rounded-[24px] border transition-all ${a.isContacted ? "border-[#d2d2d7] opacity-80" : "border-[#0071e3] shadow-sm shadow-blue-50"}`}>
                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="apple-title-md !text-[19px] !mb-0">{a.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${a.isContacted ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                            {a.isContacted ? "Contacted" : "New Request"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-[#6e6e73] mb-4">
                          <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {a.phoneNumber}</span>
                          <span className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">Treatment: {a.treatment}</span>
                          <span className="flex items-center gap-1.5">Location: {a.location}, {a.country}</span>
                          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(a.createdAt).toLocaleString()}</span>
                        </div>
                        {(a.medicalHistory || a.medication) && (
                          <div className="bg-[#f5f5f7] p-4 rounded-2xl space-y-2 border border-black/[0.03]">
                            {a.medicalHistory && <p className="text-sm"><span className="font-semibold text-[#1d1d1f]">Medical History:</span> {a.medicalHistory}</p>}
                            {a.medication && <p className="text-sm"><span className="font-semibold text-[#1d1d1f]">Medication:</span> {a.medication}</p>}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 lg:flex-col lg:justify-center">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div 
                            onClick={() => handleToggleContacted(a._id, a.isContacted)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${a.isContacted ? "bg-green-500 border-green-500 text-white" : "border-[#d2d2d7] group-hover:border-[#0071e3]"}`}
                          >
                            <Check className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-semibold lg:hidden">Mark as Contacted</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}

                {appointments.length === 0 && (
                  <div className="p-20 text-center bg-white rounded-[24px] border border-dashed border-[#d2d2d7]">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6e6e73]">
                      <FileText className="w-8 h-8" />
                    </div>
                    <p className="apple-body text-[#6e6e73]">No appointment requests found for this filter.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
