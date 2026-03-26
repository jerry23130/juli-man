import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has admin role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");

      if (roleError) throw roleError;

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        throw new Error("Access denied. Admin privileges required.");
      }

      toast.success("Welcome back, Admin!");
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <div className="mb-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.3 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
          >
            <Lock size={28} className="text-primary" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Admin <span className="italic text-primary">Portal</span>
          </h1>
          <p className="text-foreground/35 font-body mt-3 text-sm">
            Sign in to manage bookings
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body mb-2">
              <Mail size={12} className="text-primary" />
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-foreground/10 px-0 py-4 text-foreground font-body placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-all duration-500 hover:border-foreground/20"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-body mb-2">
              <Lock size={12} className="text-primary" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border-b-2 border-foreground/10 px-0 py-4 pr-10 text-foreground font-body placeholder:text-foreground/20 focus:outline-none focus:border-primary transition-all duration-500 hover:border-foreground/20"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/30 hover:text-foreground/60 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-6">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ x: loading ? 0 : 4 }}
              className="group flex items-center gap-4 text-primary font-body font-medium text-lg uppercase tracking-[0.15em] hover:text-coral-light transition-colors duration-500 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform duration-500"
                  />
                </>
              )}
            </motion.button>
            <div className="w-full h-px bg-foreground/10 mt-6" />
          </div>
        </form>

        <p className="text-foreground/20 text-xs font-body text-center mt-10">
          Authorized personnel only
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
