import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, AlertCircle, Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function AdminDashboard() {
  //  State to hold fetched data (no more constants!)
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingLogs: 0,
    averageProgress: 0,
    activePlacements: 0
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching the data from your server
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Replace with your real API endpoints
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data.summary);
        setStudents(data.studentList);
      } catch (err) {
        console.error("Failed to load admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <div className="p-8">Loading Overview...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Program Management</h1>
        <p className="text-muted-foreground">Monitoring {stats.totalStudents} active internships.</p>
      </div>

      {/*  Reusing your StatCard with dynamic values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Interns" 
          value={stats.totalStudents} 
          icon={Users} 
          variant="primary" 
        />
        <StatCard 
          title="Pending Logs" 
          value={stats.pendingLogs} 
          subtitle="Awaiting review" 
          icon={Clock} 
          variant="warning" 
        />
        <StatCard 
          title="Avg. Progress" 
          value={`${stats.averageProgress}%`} 
          icon={AlertCircle} 
          variant={stats.averageProgress < 50 ? "destructive" : "success"} 
        />
        <StatCard 
          title="Placements" 
          value={stats.activePlacements} 
          icon={Building2} 
          variant="default" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Performance Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Student Progress Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((s) => (
                <div key={s.id} className="space-y-2 border-b pb-3 last:border-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-muted-foreground">{s.company}</span>
                    <span className="font-mono">{s.progress}%</span>
                  </div>
                  <Progress value={s.progress} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.pendingLogs > 0 && (
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-sm text-warning flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {stats.pendingLogs} logs need your approval.
              </div>
            )}
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
              Export Cohort Report
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



