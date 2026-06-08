import { useState, useEffect } from 'react';
import { 
  ShieldAlert, Mail, AlertTriangle, UploadCloud, 
  Terminal, ShieldCheck, Fingerprint, Activity, CheckCircle2, XCircle,
  Link2, Globe, Layers, Plus, Trash2, Server, Crosshair, MapPin, Brain, Cpu, BarChart3,
  GraduationCap, Award, CheckCircle, ShieldAlert as RiskIcon,
  Users, Key, Shield, UserCheck, Clock, Briefcase,
  FileSpreadsheet, FileText, Download, TrendingUp, PieChart, Info
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function App() {
  const [activeTab, setActiveTab] = useState('email'); // 'email', 'url', 'domain', 'ml', 'training', 'users', 'analytics'
  const [loading, setLoading] = useState(false);

  // --- STATE CONTROL MANAGEMENT ---
  const [emailHeader, setEmailHeader] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [singleUrl, setSingleUrl] = useState('');
  const [bulkUrls, setBulkUrls] = useState<string[]>(['']);
  const [inputTarget, setInputTarget] = useState('');
  const [mlPayload, setMlPayload] = useState('');

  // --- 1. FULL EMAIL ANALYSIS DATA DATASET ---
  const [emailResult, setEmailResult] = useState<any>({
    authenticityScore: 34,
    status: "HIGHLY SUSPICIOUS",
    validation: { spf: "FAIL", dkim: "FAIL" },
    emailParsing: {
      sender: "security-alert@paypaI-update.com",
      recipient: "victim-user@corporate.com",
      subject: "Urgent: Security Verification Required",
      date: "2026-06-05 15:40:12 UTC"
    },
    dnsValidation: {
      spf: "PASS",
      dkim: "FAIL",
      dmarc: "FAIL"
    },
    spoofingDetection: {
      isSpoofed: true,
      mismatchedHeaders: "From: envelope domain mismatch detected against Return-Path data routing paths.",
      replyToMismatch: "Reply-To header routing forced to external unauthorized node: admin@secure-routing.xyz"
    },
    redFlags: [
      "Artificial panic signature detected ('Urgent action required within 24 hours').",
      "Lookalike character variance used in domain name (paypaI using uppercase 'I').",
      "Cryptographic DKIM signature failed verification test deployment."
    ],
    headerAnalysisRaw: [
      "Delivered-To: victim-user@corporate.com",
      "Received: from mx.spoofed-node.net ([185.220.101.5]) by mail.corporate.com",
      "From: PayPal Security <security-alert@paypaI-update.com>",
      "Reply-To: admin@secure-routing.xyz",
      "X-Spam-Score: 8.4"
    ]
  });

  // --- 2. FULL URL ANALYSIS DATA DATASET ---
  const [urlResult, setUrlResult] = useState<any>({
    safetyScore: 18,
    reputation: "Malignant Credential Harvester landing page blocklisted via OSINT threat feeds.",
    domainAge: "9 Days Active (Registered on 2026-05-27)",
    sslValidation: {
      isValid: false,
      issuer: "Let's Encrypt Refused / Self-Signed Configuration Profile",
      status: "EXPIRED / REVOKED HANDSHAKE PROFILE"
    },
    suspiciousDetection: [
      "Deep directory payload nesting used to mask primary execution route.",
      "Base64 encoded authentication parameters found within query strings."
    ],
    typosquatting: {
      isTargeted: true,
      spoofedBrand: "PayPal Service Engine",
      detectedMutation: "paypa1-security-check.com"
    },
    bulkResults: [
      { id: 1, url: "https://paypa1-security-check.com/login", score: 18, status: "MALICIOUS" },
      { id: 2, url: "https://secure-portal-update.net", score: 45, status: "SUSPICIOUS" },
      { id: 3, url: "https://google.com/safety", score: 100, status: "CLEAN" }
    ]
  });

  // --- 3. FULL DOMAIN & IP INTELLIGENCE DATA DATASET ---
  const [domainIntel, setDomainIntel] = useState<any>({
    threatScore: 78,
    whois: {
      registrar: "NameCheap, Inc.",
      creationDate: "2025-11-12",
      expirationDate: "2026-11-12",
      nameServers: ["ns1.rogue-dns.com", "ns2.rogue-dns.com"]
    },
    geolocation: {
      ipAddress: "185.220.101.5",
      country: "Netherlands (NL)",
      city: "Amsterdam",
      isp: "Tor Exit Node Provider via Zscaler",
      asn: "AS202424"
    },
    dnsRecords: {
      a: "185.220.101.5 [Flagged Malicious Cluster]",
      mx: "0 inbound-smtp.rogue-routing.net",
      txt: "v=spf1 -all (Strict Drop Configuration)"
    },
    reverseDns: "exit-node-05.torproject.org",
    security: { spf: "FAIL", dmarc: "NONE", tldRisk: "SUSPICIOUS" } // Fallback for initialization
  });

  // --- 4. MACHINE LEARNING DETECTION DATA DATASET ---
  const [mlResult, setMlResult] = useState<any>({
    verdict: "PHISHING DETECTED",
    phishingScore: 89,
    confidenceLevel: 94.2,
    modelType: "Random Forest Classifier (Ensemble)",
    score: "89%",
    confidence: "94.2%",
    featureExtraction: {
      urlsCount: 4,
      urgencyWords: ["Immediate", "Action Required", "Verify Now"],
      grammarErrors: 3,
      suspiciousTld: true,
      entropyScore: "High Lexical Variation"
    },
    featureImportance: [
      { name: "URL Nesting & Path Depth", weight: "High" },
      { name: "Urgency / Panic Weight Index", weight: "High" },
      { name: "Grammatical & Syntax Irregularities", weight: "Medium" }
    ],
    details: "Random Forest Model execution analysis verified parameters against threat infrastructure vectors."
  });

  // --- 5. TRAINING & QUIZZES DATA DATASET ---
  const [quizState, setQuizState] = useState({
    score: 0,
    currentIndex: 0,
    totalSamples: 5,
    isFinished: false,
    feedback: "Start the assessment to test your detection skills.",
    samples: [
      { id: 1, sender: "ceo@netfIix-support.com", subject: "Billing Alert", isPhishing: true },
      { id: 2, sender: "hr@company.com", subject: "Vacation Policy", isPhishing: false },
      { id: 3, sender: "bank@secure-update.net", subject: "Account Lock", isPhishing: true },
      { id: 4, sender: "team@internal-msg.com", subject: "Meeting Reminder", isPhishing: false },
      { id: 5, sender: "admin@global-login.xyz", subject: "Urgent Password Reset", isPhishing: true }
    ]
  });

  // --- 6. USER MANAGEMENT SYSTEM STATE DATASET ---
  const [userManagement, setUserManagement] = useState<any>(() => {
    const saved = localStorage.getItem('phishMasterUser');
    return saved ? JSON.parse(saved) : {
      currentUser: {
        uid: "USR-9942",
        name: "Zeeshan Ahmed",
        email: "z.ahmed@corporate-sec.com",
        role: "TRAINER",
        department: "Cyber Security Operations",
        jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulation-node-active-payload...",
        globalProgress: 74
      },
      analysisHistory: [
        { id: "TX-401", target: "paypaI-update.com", type: "EMAIL", risk: "CRITICAL", date: "2026-06-05" },
        { id: "TX-309", target: "https://secure-portal.net", type: "URL", risk: "SUSPICIOUS", date: "2026-06-03" },
        { id: "TX-102", target: "google.com", type: "DOMAIN", risk: "CLEAN", date: "2026-05-29" }
      ],
      departmentMetrics: [
        { name: "Finance Desk", vulnerability: "High Risk", compliance: "45%" },
        { name: "Human Resources", vulnerability: "Medium Risk", compliance: "71%" },
        { name: "Engineering DevOps", vulnerability: "Low Risk", compliance: "94%" }
      ]
    };
  });

  // --- 7. NEW! ANALYTICS & REPORTS STATE DATASET ---
  const [analyticsData, setAnalyticsData] = useState({
    realTimeMetrics: { totalSimulations: 0, phishingClickRate: "0%", reportingRate: "0%", avgResponseTime: "0ms" },
    performanceTimeline: [
      { period: 'JAN', score: 45 }, { period: 'FEB', score: 52 },
      { period: 'MAR', score: 68 }, { period: 'APR', score: 61 },
      { period: 'MAY', score: 74 }, { period: 'JUN', score: 89 }
    ],
    departmentRiskScores: [
      { department: 'FINANCE DESK', risk: 75, trend: 'UP' },
      { department: 'HUMAN RESOURCES', risk: 42, trend: 'DOWN' },
      { department: 'ENGINEERING DEVOPS', risk: 18, trend: 'STABLE' }
    ]
  });

  // Real-time Update Logic inside Analytics 
  useEffect(() => {
    const history = userManagement.analysisHistory; 
    const total = history.length; 
    const critical = history.filter((h: any) => h.risk === 'CRITICAL' || h.risk === 'MALICIOUS').length; 
    
    setAnalyticsData(prev => ({
      ...prev,
      realTimeMetrics: {
        totalSimulations: total, 
        phishingClickRate: total > 0 ? `${((critical / total) * 100).toFixed(0)}%` : "0%", 
        reportingRate: total > 0 ? "88%" : "0%", 
        avgResponseTime: total > 0 ? "142ms" : "0ms" 
      }
    }));
  }, [userManagement.analysisHistory]); 

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('phishMasterUser', JSON.stringify(userManagement));
  }, [userManagement]);

  // Central Correlation Log Function
  const addHistoryLog = (target: string, type: string, risk: string) => {
    const newLog = {
      id: `TX-${Date.now().toString().slice(-3)}`,
      target,
      type,
      risk,
      date: new Date().toISOString().split('T')[0]
    };
    setUserManagement((prev: any) => ({
      ...prev,
      analysisHistory: [newLog, ...prev.analysisHistory]
    }));
  };

  const analyzeEmailHeader = (headerText: string) => {
    setLoading(true);
    setTimeout(() => {
      const isSpoofed = /spoof|fake|unauthorized/i.test(headerText) || headerText.length < 50;
      const spfPass = headerText.includes("spf=pass");
      const dkimPass = headerText.includes("dkim=pass");
      
      let score = 100;
      if (!spfPass) score -= 40;
      if (!dkimPass) score -= 30;
      if (isSpoofed) score -= 50;

      const finalScore = Math.max(score, 0);
      const calculatedRisk = finalScore > 60 ? "CLEAN" : "CRITICAL";

      setEmailResult({
        authenticityScore: finalScore,
        status: finalScore > 60 ? "AUTHENTIC" : "HIGHLY SUSPICIOUS",
        emailParsing: {
          sender: "Extracted Header Node Data",
          recipient: userManagement.currentUser?.email || "internal-user@corp.com",
          subject: "Dynamic Forensic Analysis Log Stream",
          date: new Date().toISOString()
        },
        redFlags: [
          !spfPass ? "SPF record missing/failed" : null,
          !dkimPass ? "DKIM signature invalid" : null,
          isSpoofed ? "Header routing inconsistency detected" : null
        ].filter(Boolean),
        validation: { spf: spfPass ? "PASS" : "FAIL", dkim: dkimPass ? "PASS" : "FAIL" }
      });

      addHistoryLog("Uploaded Email File Header", "EMAIL", calculatedRisk);
      setLoading(false);
    }, 1000);
  };

const analyzeUrl = async (targetUrl: string = singleUrl) => {
  if (!targetUrl) return;
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8000/api/analyze-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: targetUrl }),
    });
    const data = await response.json();
    
    setUrlResult({
      url: data.url,
      safetyScore: data.safetyScore,
      ssl: data.ssl,
      age: data.age,
      typosquatting: data.typosquatting,
      status: data.status,
      threatSource: data.threatSource,
    });
    
    // Push into your audit ledger history automatically [cite: 55]
    addHistoryLog(targetUrl, "URL", data.status === "MALICIOUS" ? "CRITICAL" : "CLEAN");
  } catch (error) {
    console.error("API Error connecting to Python:", error);
  } finally {
    setLoading(false);
  }
};

const traceDomain = async () => {
  if (!inputTarget) return;
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8000/api/analyze-domain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain: inputTarget }),
    });
    const data = await response.json();
    
    setDomainIntel(data);
    addHistoryLog(inputTarget, "DOMAIN", data.threatScore > 50 ? "CRITICAL" : "CLEAN");
  } catch (error) {
    console.error("Domain API connection error:", error);
  } finally {
    setLoading(false);
  }
};

const analyzeWithML = async () => {
  if (!mlPayload) return;
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8000/api/analyze-ml", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: mlPayload }),
    });
    const data = await response.json();
    
    setMlResult({
      verdict: data.verdict,
      score: data.score,
      confidence: data.confidence,
      featureImportance: data.featureImportance,
      details: data.details,
    });
  } catch (error) {
    console.error("Machine Learning Node connection offline:", error);
  } finally {
    setLoading(false);
  }
};

  const handleQuizSelection = (choice: 'PHISHING' | 'LEGITIMATE') => {
    const current = quizState.samples[quizState.currentIndex];
    if (!current) return;

    const isCorrect = (choice === 'PHISHING') === current.isPhishing;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    const nextIndex = quizState.currentIndex + 1;

    if (nextIndex < quizState.totalSamples) {
      setQuizState(prev => ({
        ...prev,
        score: newScore,
        currentIndex: nextIndex,
        feedback: isCorrect ? "CORRECT! Well spotted." : "INCORRECT. Check the domain carefully."
      }));
    } else {
      setQuizState(prev => ({
        ...prev,
        score: newScore,
        isFinished: true,
        feedback: `Test Completed! You scored ${newScore}/${prev.totalSamples}.`
      }));
      // Correlate finished Quiz Result to the User Telemetry Dashboard Ledger Logs
      addHistoryLog(`Training Quiz Assessment Profile Result: ${newScore}/${quizState.totalSamples}`, "QUIZ", newScore >= 3 ? "CLEAN" : "SUSPICIOUS");
    }
  };

  const handleBulkUrlChange = (index: number, value: string) => {
    const updated = [...bulkUrls];
    updated[index] = value;
    setBulkUrls(updated);
  };

  const addBulkUrlField = () => setBulkUrls([...bulkUrls, '']);
  const removeBulkUrlField = (index: number) => {
    if (bulkUrls.length > 1) setBulkUrls(bulkUrls.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setEmailHeader(content);
    };
    reader.readAsText(file);
  };

  const createAccount = (name: string, email: string, department: string) => {
    const newUser = {
      uid: `USR-${Math.floor(Math.random() * 10000)}`,
      name,
      email,
      department,
      role: "ANALYST",
      jwtToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.generated-token-x",
      globalProgress: 100
    };
    setUserManagement({ currentUser: newUser, analysisHistory: [], departmentMetrics: userManagement.departmentMetrics });
  };

  const logoutUser = () => {
    setUserManagement({ currentUser: null, analysisHistory: [], departmentMetrics: userManagement.departmentMetrics });
  };

  const exportCSV = () => {
    const data = userManagement.analysisHistory;
    const csvRows = [
      ["Transaction ID", "Target Intel", "Module Node Type", "Risk Evaluation Status", "Timestamp Log"],
      ...data.map((log: any) => [log.id, log.target, log.type, log.risk, log.date || "2026-06-07"])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `security_audit_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans antialiased">
      
      {/* ================= SIDEBAR GLOBAL SYSTEM ================= */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 border-b border-slate-800 pb-5 mb-6">
            <ShieldAlert className="text-red-500 w-8 h-8" />
            <div>
              <span className="text-xl font-black tracking-wider text-white block">PHISHMASTER-X</span>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Cyber Security Suite</span>
            </div>
          </div>
          <nav className="space-y-1.5 font-mono text-xs">
            <button onClick={() => setActiveTab('email')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition ${activeTab === 'email' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
              <Mail size={16} /> 1. EMAIL ANALYSIS LAB
            </button>
            <button onClick={() => setActiveTab('url')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition ${activeTab === 'url' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
              <Link2 size={16} /> 2. URL ANALYSIS LAB
            </button>
            <button onClick={() => setActiveTab('domain')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition ${activeTab === 'domain' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
              <Crosshair size={16} /> 3. DOMAIN & IP INTEL
            </button>
            <button onClick={() => setActiveTab('ml')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition ${activeTab === 'ml' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
              <Brain size={16} /> 4. ML DETECTION LAB
            </button>
            <button onClick={() => setActiveTab('training')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition ${activeTab === 'training' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
              <GraduationCap size={16} /> 5. TRAINING & QUIZZES
            </button>
            <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition ${activeTab === 'users' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
              <Users size={16} /> 6. USER MANAGEMENT
            </button>
            <button onClick={() => setActiveTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition ${activeTab === 'analytics' ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-900/50 hover:text-white'}`}>
              <BarChart3 size={16} /> 7. ANALYTICS & REPORTS
            </button>
          </nav>
        </div>
        <div className="text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-4 flex items-center gap-2">
  <Activity size={12} className="text-red-500 animate-pulse" /> 
  created by: <span className="text-white font-black tracking-widest uppercase">cyberwolf</span>
</div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* ================= 1. EMAIL ANALYSIS TAB UI ================= */}
        {activeTab === 'email' && (
          <div className="space-y-6">
            <header className="border-b border-slate-800 pb-5">
              <h1 className="text-3xl font-black text-white font-mono">EMAIL HEADER FORENSICS</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">Upload .eml File</label>
                <input type="file" accept=".eml" onChange={handleFileUpload} className="w-full text-xs text-slate-400 file:bg-blue-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded" />
                <textarea value={emailHeader} onChange={(e) => setEmailHeader(e.target.value)} className="w-full h-40 bg-slate-900 border border-slate-800 p-4 rounded text-xs font-mono text-white" placeholder="Paste email headers here or upload .eml..." />
                <button onClick={() => analyzeEmailHeader(emailHeader)} className="w-full bg-blue-600 py-3 rounded text-xs font-bold uppercase hover:bg-blue-700 transition">
                  {loading ? "PARSING DATASTREAMS..." : "RUN FORENSICS"}
                </button>
              </div>

              {emailResult && (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-black text-red-500">{emailResult.status}</h2>
                    <span className="text-2xl font-black text-blue-500">{emailResult.authenticityScore}/100</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">SPF Node Validation: <span className={emailResult.validation?.spf === "PASS" ? "text-green-400" : "text-red-500"}>{emailResult.validation?.spf}</span></div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">DKIM Core Signature: <span className={emailResult.validation?.dkim === "PASS" ? "text-green-400" : "text-red-500"}>{emailResult.validation?.dkim}</span></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Detected Red Flags Matrix</p>
                    {emailResult.redFlags?.map((flag: string, i: number) => (
                      <p key={i} className="text-red-400 text-xs font-mono">⚠️ {flag}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 2. URL ANALYSIS TAB UI ================= */}
        {activeTab === 'url' && (
          <div className="space-y-6">
            <header className="border-b border-slate-800 pb-5">
              <h1 className="text-3xl font-black text-white font-mono">URL REPUTATION & ANALYSIS</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Single URL Scan Execution</label>
                  <div className="flex gap-2">
                    <input value={singleUrl} onChange={(e) => setSingleUrl(e.target.value)} className="flex-1 bg-slate-900 border border-slate-800 p-2 rounded text-xs text-white" placeholder="https://example.com" />
                    <button onClick={() => analyzeUrl(singleUrl)} className="bg-blue-600 px-4 py-2 rounded text-xs font-bold">SCAN NODE</button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-900 space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Bulk URL Multi-Threat Scanner</label>
                  {bulkUrls.map((url, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input value={url} onChange={(e) => handleBulkUrlChange(idx, e.target.value)} className="flex-1 bg-slate-900 border border-slate-800 p-2 rounded text-xs text-white" placeholder="Paste verification payload URL..." />
                      {bulkUrls.length > 1 && <button onClick={() => removeBulkUrlField(idx)} className="text-red-500 px-2 text-xs font-mono">X</button>}
                    </div>
                  ))}
                  <button onClick={addBulkUrlField} className="text-[10px] text-blue-400 font-mono">+ Add Diagnostic Entry Row</button>
                </div>
              </div>

              {urlResult.url && (
                <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                    <span className="text-[10px] font-mono text-slate-400 break-all">{urlResult.url}</span>
                    <div className={`px-3 py-1 rounded text-[10px] font-bold ${urlResult.status === "SAFE" ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"}`}>
                      {urlResult.status}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-3 rounded">
                      <p className="text-[9px] text-slate-500 uppercase">Safety Score Vector</p>
                      <p className="text-xl font-black text-white">{urlResult.safetyScore}/100</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded">
                      <p className="text-[9px] text-slate-500 uppercase">Threat OSINT Intelligence Source</p>
                      <p className="text-xs font-mono text-slate-300">{urlResult.threatSource}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">SSL Validation Handshake: {urlResult.ssl}</div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">Domain Operational Age: {urlResult.age}</div>
                    <div className="bg-slate-900 p-3 rounded col-span-2 border border-slate-800">Brand Typosquatting Detection: {urlResult.typosquatting}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 3. DOMAIN & IP INTELLIGENCE TAB UI ================= */}
        {activeTab === 'domain' && (
          <div className="space-y-6">
            <header className="border-b border-slate-800 pb-5">
              <h1 className="text-3xl font-black text-white font-mono">DOMAIN & IP INTELLIGENCE</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
                <input value={inputTarget} onChange={(e) => setInputTarget(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded p-3 text-xs font-mono text-white focus:border-red-600 outline-none" placeholder="domain.com" />
                <button onClick={traceDomain} className="w-full bg-blue-600 py-3 rounded text-xs font-bold uppercase hover:bg-blue-700 transition">Run Intel Analysis</button>
              </div>

              <div className="lg:col-span-2 bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-[10px] text-slate-500 uppercase">Cryptographic SPF & DMARC Mapping</p>
                    <p className="text-sm font-mono text-white">SPF Vector: {domainIntel.security?.spf}</p>
                    <p className="text-sm font-mono text-white">DMARC Record Matrix: {domainIntel.security?.dmarc}</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-[10px] text-slate-500 uppercase">TLD Extension & Age Risk Index</p>
                    <p className="text-sm font-mono text-red-400">Extension TLD Structural Risk: {domainIntel.security?.tldRisk}</p>
                    <p className="text-sm font-mono text-slate-300">WHOIS Records Security State: {domainIntel.whois?.ageRisk}</p>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded font-mono text-[11px] space-y-2 border border-slate-800">
                  <p className="text-slate-400 border-b border-slate-800 pb-1 uppercase tracking-wider">Passive DNS Records Ledger</p>
                  <p><span className="text-slate-500">A Record:</span> {domainIntel.dnsRecords?.a}</p>
                  <p><span className="text-slate-500">MX Routing Record:</span> {domainIntel.dnsRecords?.mx}</p>
                  <p><span className="text-slate-500">TXT Verification String:</span> {domainIntel.dnsRecords?.txt}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. MACHINE LEARNING DETECTION TAB UI ================= */}
        {activeTab === 'ml' && (
          <div className="space-y-6">
            <header className="border-b border-slate-800 pb-5">
              <h1 className="text-3xl font-black text-white font-mono flex items-center gap-3">
                <Brain className="text-purple-500" /> ML PHISHING CLASSIFIER (RANDOM FOREST)
              </h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
                <textarea value={mlPayload} onChange={(e) => setMlPayload(e.target.value)} className="w-full h-48 bg-slate-900 border border-slate-800 rounded-lg p-4 text-xs font-mono text-white focus:border-purple-600 outline-none" placeholder="Enter URL payload data string or raw corporate email body text for machine learning feature extraction models..." />
                <button onClick={analyzeWithML} disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold text-xs text-white transition disabled:opacity-50">
                  {loading ? "EXTRACTING VECTORS & DEPLOYING ENSEMBLE FORESTS..." : "EXECUTE RANDOM FOREST PREDICTION"}
                </button>
              </div>

              {mlResult.verdict && (
                <div className="bg-slate-950 border border-purple-900/50 p-6 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <span className={`text-xl font-black ${mlResult.verdict.includes("PHISHING") ? "text-red-500" : "text-green-500"}`}>{mlResult.verdict}</span>
                    <span className="text-2xl font-mono font-bold text-purple-400">{mlResult.score}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">Model Precision Confidence: {mlResult.confidence}</div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-800">Model Structural Class: Random Forest v2.4</div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Feature Weight Extraction Mapping</p>
                    {mlResult.featureImportance?.map((f: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs font-mono bg-slate-900 p-2 rounded border border-slate-800">
                        <span>{f.name}</span>
                        <span className={f.weight === "High" ? "text-red-400 font-bold" : "text-slate-400"}>{f.weight}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 italic mt-4 border-t border-slate-900 pt-2">{mlResult.details}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 5. TRAINING & QUIZZES TAB UI ================= */}
        {activeTab === 'training' && (
          <div className="space-y-6 text-white">
            {!quizState.isFinished ? (
              <div className="bg-slate-950 p-8 rounded-xl border border-slate-800">
                <h2 className="text-xl font-bold mb-4 font-mono">Sample Node Verification {quizState.currentIndex + 1} of {quizState.totalSamples}</h2>
                <div className="bg-slate-900 p-6 rounded border border-slate-800 mb-6 font-mono">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Metadata Vector Sender</p>
                  <p className="text-sm font-mono mb-4 text-red-400">{quizState.samples[quizState.currentIndex].sender}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Payload Subject Line</p>
                  <p className="text-lg font-bold text-white">{quizState.samples[quizState.currentIndex].subject}</p>
                </div>
                
                <div className="flex gap-4">
                  <button onClick={() => handleQuizSelection('PHISHING')} className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold text-xs uppercase tracking-wider font-mono transition">Flag Malicious Phishing</button>
                  <button onClick={() => handleQuizSelection('LEGITIMATE')} className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded font-bold text-xs uppercase tracking-wider font-mono transition">Verify Legitimate Node</button>
                </div>
                <p className="mt-4 text-amber-400 font-mono text-sm border-t border-slate-900 pt-3">System Feedback: {quizState.feedback}</p>
              </div>
            ) : (
              <div className="bg-slate-950 p-10 text-center rounded-xl border border-slate-800">
                <h2 className="text-3xl font-black mb-2 font-mono">Final Assessment Score: {quizState.score}/{quizState.totalSamples}</h2>
                <p className="text-slate-400 text-xs font-mono max-w-md mx-auto mb-6">Your training node score metric has been successfully dispatched to the security management control ledger database.</p>
                <button onClick={() => setQuizState({...quizState, score: 0, currentIndex: 0, isFinished: false, feedback: "Assessment reset initialized."})} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded font-bold font-mono text-xs uppercase tracking-wider transition">
                  Restart Training Module
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= 6. USER MANAGEMENT TAB UI ================= */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <header className="border-b border-slate-800 pb-5">
              <h1 className="text-3xl font-black text-white font-mono flex items-center gap-3">
                <Users className="text-red-500" /> IDENTITY & ACCESS CONTROL
              </h1>
            </header>

            {!userManagement.currentUser ? (
              <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 max-w-lg mx-auto mt-10">
                <h2 className="text-lg font-bold text-white mb-6 uppercase font-mono">Initialize Security Analyst Profile</h2>
                <input id="nameInput" placeholder="Full Professional Name" className="w-full bg-slate-900 p-3 mb-4 rounded border border-slate-700 text-white font-mono text-xs outline-none" />
                <input id="emailInput" placeholder="Corporate Email Address" className="w-full bg-slate-900 p-3 mb-4 rounded border border-slate-700 text-white font-mono text-xs outline-none" />
                <input id="deptInput" placeholder="Operations Department Node" className="w-full bg-slate-900 p-3 mb-6 rounded border border-slate-700 text-white font-mono text-xs outline-none" />
                <button onClick={() => { 
                  const name = (document.getElementById('nameInput') as HTMLInputElement).value;
                  const email = (document.getElementById('emailInput') as HTMLInputElement).value;
                  const dept = (document.getElementById('deptInput') as HTMLInputElement).value;
                  if (name && email && dept) createAccount(name, email, dept);
                }} className="w-full bg-red-600 py-3 rounded font-bold text-white hover:bg-red-700 font-mono text-xs tracking-widest transition">
                  GENERATE SESSION TOKEN
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono">
                    <div className="flex items-center gap-3 border-b border-slate-900 pb-3 mb-3">
                      <div className="bg-red-950 p-2.5 rounded-lg text-red-400"><UserCheck size={20} /></div>
                      <div>
                        <span className="text-white font-bold block text-sm">{userManagement.currentUser.name}</span>
                        <span className="text-[10px] text-slate-500 block">{userManagement.currentUser.uid}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Role Token Clearance</p>
                    <p className="font-mono text-xs mb-3 text-purple-400 font-bold">{userManagement.currentUser.role}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Department</p>
                    <p className="text-amber-400 font-bold text-xs mb-4">{userManagement.currentUser.department}</p>
                    <button onClick={logoutUser} className="text-red-500 text-[10px] uppercase font-bold underline hover:text-red-400 block transition">Terminate Session Token</button>
                  </div>
                </div>

                <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono">
                  <div className="flex justify-between items-center mb-4 border-b border-slate-900 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Historic Cyber Audit Ledger</span>
                    <span className="text-[10px] bg-slate-900 px-2 py-1 rounded text-slate-500 font-bold">{userManagement.analysisHistory.length} DYNAMIC ENTRIES</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-[11px] text-left text-slate-300">
                      <thead>
                        <tr className="text-slate-500 uppercase border-b border-slate-900">
                          <th className="pb-2">ID Token</th>
                          <th className="pb-2">Target Asset</th>
                          <th className="pb-2">Module</th>
                          <th className="pb-2 text-right">Risk Evaluation State</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {userManagement.analysisHistory.map((log: any) => (
                          <tr key={log.id} className="hover:bg-slate-900/50 transition">
                            <td className="py-2.5 font-bold text-slate-400">{log.id}</td>
                            <td className="py-2.5 truncate max-w-xs text-white">{log.target}</td>
                            <td className="py-2.5 text-slate-500 text-[10px] font-bold"><span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">{log.type}</span></td>
                            <td className={`py-2.5 text-right font-black ${log.risk === 'CRITICAL' || log.risk === 'MALICIOUS' ? 'text-red-500' : (log.risk === 'SUSPICIOUS' ? 'text-amber-500' : 'text-green-400')}`}>
                              {log.risk}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 7. ADDED! ANALYTICS & REPORTS TAB UI ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <header className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-white font-mono flex items-center gap-3">
                  <BarChart3 className="text-red-500" /> SECURITY ANALYTICS & REPORTING HUB
                </h1>
                <p className="text-slate-500 font-mono text-[10px] tracking-wider mt-1 uppercase">Correlated system wide infrastructure monitoring node telemetry metrics data.</p>
              </div>
              <div className="flex gap-2 font-mono text-xs shrink-0">
                <button onClick={exportCSV} className="bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 px-4 py-2 rounded-lg flex items-center gap-1.5 font-bold transition shadow-md">
                  <FileSpreadsheet size={14} className="text-green-500" /> Export CSV Audit Ledger
                </button>
                <button onClick={() => window.print()} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1.5 font-bold transition shadow-lg">
                  <FileText size={14} /> Download System PDF Report
                </button>
              </div>
            </header>

            {/* Real-time Dashboard Analytics Indicators */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Total Cyber Exercises Run</span>
                <span className="text-2xl font-black text-white block mt-1">{analyticsData.realTimeMetrics.totalSimulations}</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Phishing Intrusion Click Rate</span>
                <span className="text-2xl font-black text-red-500 block mt-1">{analyticsData.realTimeMetrics.phishingClickRate}</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Telemetry Reporting Velocity</span>
                <span className="text-2xl font-black text-green-400 block mt-1">{analyticsData.realTimeMetrics.reportingRate}</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl relative">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Avg Security Alert Response</span>
                <span className="text-2xl font-black text-blue-400 block mt-1">{analyticsData.realTimeMetrics.avgResponseTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* 1. INTERACTIVE SIEM AREA CHART (Progression) */}
              <div className="lg:col-span-6 bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono space-y-4">
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-red-500" /> Compliance Performance Progression
                  </span>
                  <span className="text-[9px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-bold">LIVE METRICS</span>
                </div>

                <div className="h-56 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.performanceTimeline} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="period" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                        itemStyle={{ color: '#ef4444', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 2. INTERACTIVE SIEM BAR CHART (Department Vulnerability) */}
              <div className="lg:col-span-6 bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono space-y-4">
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                    <PieChart size={14} className="text-amber-500" /> Department Vulnerability Matrix
                  </span>
                  <span className="text-[9px] text-red-400 font-bold flex items-center gap-0.5 uppercase tracking-wider"><Info size={10} /> Operational Weights</span>
                </div>

                {/* The Interactive Bar Chart */}
                <div className="h-40 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={analyticsData.departmentRiskScores} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} stroke="#475569" fontSize={10} tickLine={false} axisLine={false} hide />
                      <YAxis dataKey="department" type="category" stroke="#94a3b8" fontSize={9} width={110} tickLine={false} axisLine={false} />
                      <Tooltip 
                        cursor={{ fill: '#0f172a' }}
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
                      />
                      <Bar dataKey="risk" radius={[0, 4, 4, 0]} barSize={16}>
                        {analyticsData.departmentRiskScores?.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.risk > 60 ? '#ef4444' : (entry.risk > 35 ? '#f59e0b' : '#4ade80')} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Progress Matrix inside the same card (Fixed Nesting) */}
                <div className="space-y-4 pt-4 border-t border-slate-900/50">
                  {analyticsData.departmentRiskScores?.map((dept: any, i: number) => (
                    <div key={i} className="text-xs space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-300 font-medium tracking-wide">{dept.department}</span>
                        <span className={`font-bold ${dept.risk > 60 ? 'text-red-500' : (dept.risk > 35 ? 'text-amber-400' : 'text-green-400')}`}>
                          Risk Vector Load: {dept.risk}% ({dept.trend})
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${dept.risk > 60 ? 'bg-red-600' : (dept.risk > 35 ? 'bg-amber-500' : 'bg-green-400')}`} 
                          style={{ width: `${dept.risk}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic History Table inside Analytics */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl font-mono">
              <h3 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">Latest Live Cyber Forensic Security Audits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-900 uppercase text-[10px]">
                      <th className="pb-2">Audit ID</th>
                      <th className="pb-2">Asset Target Node</th>
                      <th className="pb-2 text-right">Risk Evaluation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-[11px]">
                    {userManagement.analysisHistory.slice(0, 5).map((log: any) => {
                      const riskClass = log.risk === 'CRITICAL' || log.risk === 'MALICIOUS' ? 'text-red-500' : (log.risk === 'SUSPICIOUS' ? 'text-amber-500' : 'text-green-400');
                      return (
                        <tr key={log.id} className="hover:bg-slate-900/40 transition">
                          <td className="py-3 text-slate-500 font-bold">{log.id}</td>
                          <td className="py-3 text-white truncate max-w-xs">{log.target}</td>
                          <td className={`py-3 text-right font-black ${riskClass}`}>
                            {log.risk}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;