import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const student = MOCK_STUDENTS[0];
const studentLogs = MOCK_LOGS.filter(l => l.studentName === student.name);

const progressData = [
  { name: "progress", value: (student.weeksCompleted / student.totalWeeks) * 100, fill: "hsl(217, 72%, 50%)" },
];

function getLogStatusBadge(status) {
  const map = {
    PENDING: "bg-warning/15 text-warning border-warning/30",
    ACCEPTED: "bg-success/15 text-success border-success/30",
    REJECTED: "bg-destructive/15 text-destructive border-destructive/30",
  };
  return <Badge variant="outline" className={map[status]}>{status}</Badge>;
}

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Internship</h1>
        <p className="text-muted-foreground mt-1">Welcome back, {student.name} — {student.company}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Weeks Completed" value={`${student.weeksCompleted}/${student.totalWeeks}`} icon={Clock} variant="primary" />
        <StatCard title="Logs Submitted" value={student.logsSubmitted} subtitle={`${student.logsApproved} approved`} icon={FileText} variant="success" />
        <StatCard title="Overall Score" value={student.overallScore ? `${student.overallScore}%` : "PENDING"} icon={BookOpen} variant={student.overallScore && student.overallScore >= 70 ? "success" : "warning"} />
        <StatCard title="Grade" value={student.grade || "PENDING"} icon={CheckCircle2} variant="default" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Internship Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={progressData} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" background cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <p className="text-2xl font-bold text-foreground -mt-6">{Math.round((student.weeksCompleted / student.totalWeeks) * 100)}%</p>
            <p className="text-sm text-muted-foreground mt-1">{student.weeksCompleted} of {student.totalWeeks} weeks</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Score Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {[
              { label: "Workplace Supervisor (40%)", score: student.workplaceScore },
              { label: "Academic Supervisor (30%)", score: student.academicScore },
              { label: "Log Completion (30%)", score: student.logsSubmitted && student.totalWeeks ? Math.round((student.logsApproved / student.totalWeeks) * 100) : null },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium text-foreground">{item.score != null ? `${item.score}%` : "PENDING"}</span>
                </div>
                <Progress value={item.score || 0} className="h-2.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">My Weekly Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {studentLogs.length > 0 ? (
            <div className="space-y-3">
              {studentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/40 border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground text-sm">Week {log.weekNumber}</span>
                      {getLogStatusBadge(log.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{log.activities}</p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground ml-4">
                    <p>{log.hoursWorked}h</p>
                    <p>{log.submittedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No logs found.</p>
          )}
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Placement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["User", student.username],
              ["internship", student.internship],
              ["week_start", student.week_start],
              ["week_number", student.week_number],
              ["Content", student.content],
              ["submitted_at", student.submitted_at],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-muted-foreground text-xs">{label}</p>
                <p className="font-medium text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}