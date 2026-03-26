import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut, Calendar, MapPin, Mail, Phone, User, MessageSquare,
  Clock, CheckCircle, XCircle, Loader2, Search, Filter,
  LayoutDashboard, ChevronDown
} from "lucide-react";

type Booking = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  service_type: string;
  event_date: string | null;
  location: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchBookings();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate("/admin");
      toast.error("Access denied");
    }
  };

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load bookings");
      console.error(error);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Booking ${status}`);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.full_name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.service_type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground/5 px-6 md:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard size={22} className="text-primary" />
            <h1 className="text-xl font-display font-bold text-foreground">
              Admin <span className="italic text-primary">Dashboard</span>
            </h1>
          </div>
          <motion.button
            whileHover={{ x: 2 }}
            onClick={handleLogout}
            className="flex items-center gap-2 text-foreground/40 hover:text-primary font-body text-sm uppercase tracking-[0.15em] transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </motion.button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total", value: stats.total, icon: Calendar },
            { label: "Pending", value: stats.pending, icon: Clock },
            { label: "Confirmed", value: stats.confirmed, icon: CheckCircle },
            { label: "Cancelled", value: stats.cancelled, icon: XCircle },
          ].map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-foreground/5 rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon size={14} className="text-primary" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body">
                  {label}
                </span>
              </div>
              <span className="text-3xl font-display font-bold text-foreground">
                {value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground/20"
            />
            <input
              type="text"
              placeholder="Search by name, email, or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-b-2 border-foreground/10 pl-7 pr-0 py-3 text-foreground font-body placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-all duration-500 text-sm"
            />
          </div>
          <div className="relative">
            <Filter
              size={14}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground/20"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-b-2 border-foreground/10 pl-6 pr-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary transition-all cursor-pointer appearance-none"
            >
              <option value="all" className="bg-background">All Status</option>
              <option value="pending" className="bg-background">Pending</option>
              <option value="confirmed" className="bg-background">Confirmed</option>
              <option value="cancelled" className="bg-background">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Calendar size={40} className="mx-auto text-foreground/10 mb-4" />
            <p className="text-foreground/30 font-body">No bookings found</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.03 }}
                  className="border border-foreground/5 rounded-xl overflow-hidden hover:border-foreground/10 transition-colors"
                >
                  {/* Row summary */}
                  <button
                    onClick={() =>
                      setExpandedId(
                        expandedId === booking.id ? null : booking.id
                      )
                    }
                    className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-body font-medium text-foreground truncate">
                          {booking.full_name}
                        </span>
                        <span
                          className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-body ${
                            statusColors[booking.status] || statusColors.pending
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-foreground/30 text-xs font-body">
                        <span>{booking.service_type}</span>
                        <span>
                          {new Date(booking.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-foreground/20 transition-transform duration-300 ${
                        expandedId === booking.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expandedId === booking.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-foreground/5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-sm font-body">
                              <Mail size={14} className="text-primary" />
                              <span className="text-foreground/60">
                                {booking.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-body">
                              <Phone size={14} className="text-primary" />
                              <span className="text-foreground/60">
                                {booking.phone}
                              </span>
                            </div>
                            {booking.event_date && (
                              <div className="flex items-center gap-2 text-sm font-body">
                                <Calendar size={14} className="text-primary" />
                                <span className="text-foreground/60">
                                  {new Date(
                                    booking.event_date
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                            {booking.location && (
                              <div className="flex items-center gap-2 text-sm font-body">
                                <MapPin size={14} className="text-primary" />
                                <span className="text-foreground/60">
                                  {booking.location}
                                </span>
                              </div>
                            )}
                          </div>

                          {booking.message && (
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-2">
                                <MessageSquare
                                  size={14}
                                  className="text-primary"
                                />
                                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body">
                                  Message
                                </span>
                              </div>
                              <p className="text-foreground/50 text-sm font-body leading-relaxed">
                                {booking.message}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            {booking.status !== "confirmed" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "confirmed")
                                }
                                className="flex items-center gap-2 text-green-400 text-xs font-body uppercase tracking-[0.15em] hover:text-green-300 transition-colors"
                              >
                                <CheckCircle size={14} />
                                Confirm
                              </button>
                            )}
                            {booking.status !== "cancelled" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "cancelled")
                                }
                                className="flex items-center gap-2 text-red-400 text-xs font-body uppercase tracking-[0.15em] hover:text-red-300 transition-colors"
                              >
                                <XCircle size={14} />
                                Cancel
                              </button>
                            )}
                            {booking.status !== "pending" && (
                              <button
                                onClick={() =>
                                  updateStatus(booking.id, "pending")
                                }
                                className="flex items-center gap-2 text-yellow-400 text-xs font-body uppercase tracking-[0.15em] hover:text-yellow-300 transition-colors"
                              >
                                <Clock size={14} />
                                Pending
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
