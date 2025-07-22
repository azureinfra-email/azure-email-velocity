import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, Calendar, TrendingUp, Mail, Clock, Download, Info, Link, Copy } from "lucide-react";

const WarmupCalculator = () => {
  // Helper function to get URL parameters
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      mailboxes: parseInt(params.get('mailboxes') || '1'),
      maxPerDay: parseInt(params.get('maxPerDay') || '10'),
      duration: parseInt(params.get('duration') || '8'),
      weekdaysOnly: params.get('weekdaysOnly') !== 'false',
      readEmulation: params.get('readEmulation') !== 'false',
      customTracking: params.get('customTracking') === 'true',
      increasePerDay: parseInt(params.get('increasePerDay') || '1'),
      replyRate: parseInt(params.get('replyRate') || '80'),
      openRate: parseInt(params.get('openRate') || '100'),
      spamProtection: parseInt(params.get('spamProtection') || '100'),
      markImportant: parseInt(params.get('markImportant') || '100'),
      slowWarmup: params.get('slowWarmup') === 'true',
      dailyLimit: parseInt(params.get('dailyLimit') || '10'),
      waitTime: parseInt(params.get('waitTime') || '15'),
      slowRamp: params.get('slowRamp') !== 'false',
      inboxTestLimit: parseInt(params.get('inboxTestLimit') || '3')
    };
  };

  // Initialize state from URL parameters
  const urlParams = getUrlParams();
  
  // Basic Settings
  const [mailboxes, setMailboxes] = useState(urlParams.mailboxes);
  const [maxPerDay, setMaxPerDay] = useState(urlParams.maxPerDay);
  const [duration, setDuration] = useState(urlParams.duration);
  
  // Advanced Settings
  const [weekdaysOnly, setWeekdaysOnly] = useState(urlParams.weekdaysOnly);
  const [readEmulation, setReadEmulation] = useState(urlParams.readEmulation);
  const [customTracking, setCustomTracking] = useState(urlParams.customTracking);
  const [increasePerDay, setIncreasePerDay] = useState(urlParams.increasePerDay);
  const [replyRate, setReplyRate] = useState([urlParams.replyRate]);
  const [openRate, setOpenRate] = useState([urlParams.openRate]);
  const [spamProtection, setSpamProtection] = useState([urlParams.spamProtection]);
  const [markImportant, setMarkImportant] = useState([urlParams.markImportant]);
  const [slowWarmup, setSlowWarmup] = useState(urlParams.slowWarmup);
  
  // Campaign Settings
  const [dailyLimit, setDailyLimit] = useState(urlParams.dailyLimit);
  const [waitTime, setWaitTime] = useState(urlParams.waitTime);
  const [slowRamp, setSlowRamp] = useState(urlParams.slowRamp);
  const [inboxTestLimit, setInboxTestLimit] = useState(urlParams.inboxTestLimit);

  // Update URL when state changes
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    
    // Only add parameters that differ from defaults
    if (mailboxes !== 1) params.set('mailboxes', mailboxes.toString());
    if (maxPerDay !== 10) params.set('maxPerDay', maxPerDay.toString());
    if (duration !== 8) params.set('duration', duration.toString());
    if (!weekdaysOnly) params.set('weekdaysOnly', 'false');
    if (!readEmulation) params.set('readEmulation', 'false');
    if (customTracking) params.set('customTracking', 'true');
    if (increasePerDay !== 1) params.set('increasePerDay', increasePerDay.toString());
    if (replyRate[0] !== 80) params.set('replyRate', replyRate[0].toString());
    if (openRate[0] !== 100) params.set('openRate', openRate[0].toString());
    if (spamProtection[0] !== 100) params.set('spamProtection', spamProtection[0].toString());
    if (markImportant[0] !== 100) params.set('markImportant', markImportant[0].toString());
    if (slowWarmup) params.set('slowWarmup', 'true');
    if (dailyLimit !== 10) params.set('dailyLimit', dailyLimit.toString());
    if (waitTime !== 15) params.set('waitTime', waitTime.toString());
    if (!slowRamp) params.set('slowRamp', 'false');
    if (inboxTestLimit !== 3) params.set('inboxTestLimit', inboxTestLimit.toString());

    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [
    mailboxes, maxPerDay, duration, weekdaysOnly, readEmulation, customTracking,
    increasePerDay, replyRate, openRate, spamProtection, markImportant, slowWarmup,
    dailyLimit, waitTime, slowRamp, inboxTestLimit
  ]);

  // Update URL whenever any state changes
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  function getAdvancedRampUpPlan() {
    const plan = [];
    const workingDaysMultiplier = weekdaysOnly ? 5/7 : 1;
    const slowMultiplier = slowWarmup ? 0.7 : 1;
    
    for (let week = 1; week <= duration; week++) {
      let dailyVolume;
      
      if (slowRamp) {
        // Gradual exponential ramp
        const progress = (week - 1) / (duration - 1);
        const exponentialProgress = Math.pow(progress, 0.7); // Slower curve
        dailyVolume = Math.round(5 + (maxPerDay - 5) * exponentialProgress);
      } else {
        // Linear ramp
        dailyVolume = Math.round(5 + ((maxPerDay - 5) * (week - 1)) / (duration - 1));
      }
      
      dailyVolume = Math.round(dailyVolume * slowMultiplier);
      dailyVolume = Math.min(dailyVolume, dailyLimit > 0 ? dailyLimit : maxPerDay);
      
      const weeklyVolume = Math.round(dailyVolume * (weekdaysOnly ? 5 : 7));
      const totalDaily = dailyVolume * mailboxes;
      const totalWeekly = weeklyVolume * mailboxes;
      
      plan.push({
        week,
        perMailboxDaily: dailyVolume,
        perMailboxWeekly: weeklyVolume,
        totalDaily,
        totalWeekly,
        estimatedOpens: Math.round(totalDaily * (openRate[0] / 100)),
        estimatedReplies: Math.round(totalDaily * (replyRate[0] / 100))
      });
    }
    return plan;
  }

  const plan = getAdvancedRampUpPlan();

  // Export functions
  const exportToCSV = () => {
    const headers = ['Week', 'Per Mailbox/Day', 'Per Mailbox/Week', 'Total Daily', 'Total Weekly', 'Est. Opens', 'Est. Replies'];
    const csvContent = [
      headers.join(','),
      ...plan.map(row => [
        `Week ${row.week}`,
        row.perMailboxDaily,
        row.perMailboxWeekly,
        row.totalDaily,
        row.totalWeekly,
        row.estimatedOpens,
        row.estimatedReplies
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warmup-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const exportData = {
      settings: {
        mailboxes,
        maxPerDay,
        duration,
        weekdaysOnly,
        readEmulation,
        customTracking,
        increasePerDay,
        replyRate: replyRate[0],
        openRate: openRate[0],
        spamProtection: spamProtection[0],
        markImportant: markImportant[0],
        slowWarmup,
        dailyLimit,
        waitTime,
        slowRamp,
        inboxTestLimit
      },
      schedule: plan,
      compatible: ['Instantly', 'SmartLead', 'Apollo', 'Outreach']
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'warmup-strategy.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Copy current configuration URL to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
      alert('Configuration link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Configuration link copied to clipboard!');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left Column - Calculator Settings */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle>Warmup Strategy Planner</CardTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            Plan your warmup strategy and export settings to sequencers like Instantly, SmartLead, or Apollo.
          </p>
          
          
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Basic Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Basic Settings
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="mailboxes">Number of Mailboxes</Label>
                <Input 
                  id="mailboxes"
                  type="number" 
                  min={1} 
                  value={mailboxes} 
                  onChange={e => setMailboxes(Number(e.target.value))} 
                />
              </div>
              <div>
                <Label htmlFor="maxPerDay">Target Max Emails/Day/Mailbox</Label>
                <Input 
                  id="maxPerDay"
                  type="number" 
                  min={10} 
                  value={maxPerDay} 
                  onChange={e => setMaxPerDay(Number(e.target.value))} 
                />
              </div>
              <div>
                <Label htmlFor="duration">Warmup Duration (weeks)</Label>
                <Input 
                  id="duration"
                  type="number" 
                  min={2} 
                  value={duration} 
                  onChange={e => setDuration(Number(e.target.value))} 
                />
              </div>
            </div>
          </div>

          {/* Warmup Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Warmup Settings
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekdaysOnly" className="text-sm font-medium">Weekdays only</Label>
                    <p className="text-xs text-muted-foreground">Only send warmup emails on weekdays for a more natural sending pattern</p>
                  </div>
                  <Switch 
                    id="weekdaysOnly"
                    checked={weekdaysOnly} 
                    onCheckedChange={setWeekdaysOnly} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="readEmulation" className="text-sm font-medium">Read emulation</Label>
                    <p className="text-xs text-muted-foreground">Spend time and scroll through your warmup email to emulate human-like reading</p>
                  </div>
                  <Switch 
                    id="readEmulation"
                    checked={readEmulation} 
                    onCheckedChange={setReadEmulation} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="customTracking" className="text-sm font-medium">Warm custom tracking domain</Label>
                    <p className="text-xs text-muted-foreground">Include your custom tracking domain in your warmup emails to further improve deliverability</p>
                  </div>
                  <Switch 
                    id="customTracking"
                    checked={customTracking} 
                    onCheckedChange={setCustomTracking} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="slowWarmup" className="text-sm font-medium">Disable slow warmup</Label>
                    <p className="text-xs text-muted-foreground">Use standard warmup pace instead of conservative approach</p>
                  </div>
                  <Switch 
                    id="slowWarmup"
                    checked={slowWarmup} 
                    onCheckedChange={setSlowWarmup} 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="increasePerDay">Increase per day</Label>
                  <p className="text-xs text-muted-foreground mb-2">Suggested: 1</p>
                  <Input 
                    id="increasePerDay"
                    type="number" 
                    min={1} 
                    max={10} 
                    value={increasePerDay} 
                    onChange={e => setIncreasePerDay(Number(e.target.value))} 
                  />
                </div>
                
                <div>
                  <Label>Reply rate %</Label>
                  <p className="text-xs text-muted-foreground mb-2">Suggested: 30</p>
                  <div className="flex items-center gap-4">
                    <Slider
                      value={replyRate}
                      onValueChange={setReplyRate}
                      max={100}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{replyRate[0]}%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Sliders */}
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label>Open Rate</Label>
                <p className="text-xs text-muted-foreground mb-2">How many of your warm up emails to open</p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={openRate}
                    onValueChange={setOpenRate}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{openRate[0]}%</span>
                </div>
              </div>
              
              <div>
                <Label>Spam Protection</Label>
                <p className="text-xs text-muted-foreground mb-2">How many of your warm up emails to save from spam folder</p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={spamProtection}
                    onValueChange={setSpamProtection}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{spamProtection[0]}%</span>
                </div>
              </div>
              
              <div>
                <Label>Mark Important</Label>
                <p className="text-xs text-muted-foreground mb-2">Percentage of emails to mark as important</p>
                <div className="flex items-center gap-4">
                  <Slider
                    value={markImportant}
                    onValueChange={setMarkImportant}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-12">{markImportant[0]}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Campaign Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Campaign Settings
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dailyLimit">Daily campaign limit</Label>
                  <p className="text-xs text-muted-foreground mb-2">Daily sending limit</p>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="dailyLimit"
                      type="number" 
                      min={0} 
                      max={1000} 
                      value={dailyLimit} 
                      onChange={e => setDailyLimit(Number(e.target.value))} 
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">emails</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="slowRamp" className="text-sm font-medium">Campaign slow ramp</Label>
                    <p className="text-xs text-muted-foreground">Gradually increase the number of campaign emails sent per day</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="slowRamp"
                      checked={slowRamp} 
                      onCheckedChange={setSlowRamp} 
                    />
                    {slowRamp && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Recommended</span>}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="waitTime">Minimum wait time</Label>
                  <p className="text-xs text-muted-foreground mb-2">When used with multiple campaigns</p>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="waitTime"
                      type="number" 
                      min={1} 
                      max={120} 
                      value={waitTime} 
                      onChange={e => setWaitTime(Number(e.target.value))} 
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">minute(s)</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="inboxTestLimit">Daily Inbox Placement test limit</Label>
                  <p className="text-xs text-muted-foreground mb-2">Maximum number of inbox placement tests per day</p>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="inboxTestLimit"
                      type="number" 
                      min={0} 
                      max={20} 
                      value={inboxTestLimit} 
                      onChange={e => setInboxTestLimit(Number(e.target.value))} 
                      className="flex-1"
                    />
                    <span className="text-sm text-muted-foreground">test emails</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column - Results */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle>Your Warmup Schedule</CardTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            Export this schedule to implement in your preferred email sequencer
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="px-2 py-2 text-left">Week</th>
                  <th className="px-2 py-2 text-left">Per Day</th>
                  <th className="px-2 py-2 text-left">Total Daily</th>
                  <th className="px-2 py-2 text-left">Opens</th>
                  <th className="px-2 py-2 text-left">Replies</th>
                </tr>
              </thead>
              <tbody>
                {plan.map(row => (
                  <tr key={row.week} className="border-t hover:bg-muted/30">
                    <td className="px-2 py-2 font-medium">W{row.week}</td>
                    <td className="px-2 py-2">{row.perMailboxDaily}</td>
                    <td className="px-2 py-2 font-medium">{row.totalDaily}</td>
                    <td className="px-2 py-2 text-green-600">{row.estimatedOpens}</td>
                    <td className="px-2 py-2 text-blue-600">{row.estimatedReplies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3 mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{plan[plan.length - 1]?.perMailboxDaily || 0}</div>
              <div className="text-xs text-muted-foreground">Final Daily</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{plan.reduce((sum, week) => sum + week.totalWeekly, 0)}</div>
              <div className="text-xs text-muted-foreground">Total Emails</div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-4 mt-6">
           
            
            {/* Export Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={exportToCSV} variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                CSV
              </Button>
              <Button onClick={exportToJSON} variant="outline" size="sm" className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                JSON
              </Button>
              <Button onClick={copyLink} variant="outline" size="sm" className="flex items-center gap-1">
                <Copy className="w-3 h-3" />
                Link
              </Button>
            </div>
            
            {/* Implementation Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-xs">
                <strong>Next Steps:</strong> Import into your sequencer. 
                <a href="/warmup-guide" className="underline hover:no-underline ml-1">
                  View guide →
                </a>
              </p>
            </div>
            
            {/* URL Sharing Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-xs">
                <strong>💡 Pro Tip:</strong> Your configuration is automatically saved in the URL. 
                Use the "Link" button to copy and share your exact settings with team members.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WarmupCalculator;
