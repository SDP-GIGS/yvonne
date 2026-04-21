import { useEffect, useState } from "react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, CheckCircle2, FileText } from "lucide-react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

export function StudentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch individual student data
    const fetchStudentData = async () => {
      try {
        const response = await fetch("/api/student/me"); // Your actual endpoint
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading your progress...</div>;
  if (!data) return <div className="p-8 text-center">No internship data found.</div>;

  // Calculate dynamic progress for the Radial chart
  const progressPercent = Math.round((data.weeksCompleted / data.totalWeeks) * 100);
  const chartData = [{ name: "progress", value: progressPercent, fill: "hsl(var(--primary))" }];

  return (
    <div className="space-y-6">
      
      {/* Dynamic Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Internship</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {data.name} — {data.company}
        </p>
      </div>

      {/* Dynamic StatCards - No constant values! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Weeks Completed" 
          value={`${data.weeksCompleted}/${data.totalWeeks}`} 
          icon={Clock} 
          variant="primary" 
        />
        <StatCard 
          title="Logs Submitted" 
          value={data.logs.length} 
          subtitle={`${data.logs.filter(l => l.status === 'ACCEPTED').length} approved`} 
          icon={FileText} 
          variant="success" 
        />
        <StatCard 
          title="Overall Score" 
          value={data.overallScore ? `${data.overallScore}%` : "PENDING"} 
          icon={BookOpen} 
          variant={data.overallScore >= 70 ? "success" : "warning"} 
        />
        <StatCard 
          title="Current Grade" 
          value={data.grade || "TBD"} 
          icon={CheckCircle2} 
          variant="default" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress Chart */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Completion</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={chartData} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" background cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-2xl font-bold text-foreground -mt-6">{progressPercent}%</p>
          </CardContent>
        </Card>

        {/* Dynamic Score Breakdown */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader><CardTitle className="text-base font-semibold">Evaluation</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Workplace Supervisor", score: data.workplaceScore },
              { label: "Academic Supervisor", score: data.academicScore },
              { label: "Log Quality", score: data.logQualityScore }
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.score ? `${item.score}%` : "Pending"}</span>
                </div>
                <Progress value={item.score || 0} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Logs List  */}
      <Card>
        <CardHeader><CardTitle className="text-base font-semibold">Weekly Activity</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Week {log.weekNumber}</span>
                    <Badge variant={log.status === 'ACCEPTED' ? 'success' : 'secondary'}>{log.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{log.activities}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>{log.hoursWorked} hrs</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}