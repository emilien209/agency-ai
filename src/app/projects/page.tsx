
"use client";

import React, { useState, useEffect } from 'react';
import { Code2, Globe, Zap, Github, CheckCircle, Loader2, Download, MessageSquare, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateCodeStreaming } from '@/app/actions';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Link from 'next/link';
import { CodeAILogo } from '@/components/icons';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

interface ProjectConfig {
  projectName: string;
  framework: string;
  language: string;
  features: string[];
  database?: string;
  authentication?: boolean;
  deployment?: string;
  description: string;
}

interface GeneratedProject {
  code: string;
  files: Array<{ name: string; content: string }>;
  githubUrl?: string;
  deploymentUrl?: string;
}

interface DesignIdea {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  projectContext?: string;
}

const FRAMEWORKS = [
  { value: 'next', label: 'Next.js', description: 'React framework with server-side rendering' },
  { value: 'react', label: 'React', description: 'Modern JavaScript library for building user interfaces' },
  { value: 'vue', label: 'Vue.js', description: 'Progressive framework for building user interfaces' },
  { value: 'angular', label: 'Angular', description: 'Platform for building mobile and desktop web applications' },
  { value: 'express', label: 'Express.js', description: 'Fast, unopinionated web framework for Node.js' },
  { value: 'vanilla', label: 'Vanilla HTML/CSS/JS', description: 'Pure HTML, CSS, and JavaScript' },
];

const LANGUAGES = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'rw', label: 'Kinyarwanda', flag: '🇷🇼' },
  { value: 'fr', label: 'French', flag: '🇫🇷' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸' },
  { value: 'de', label: 'German', flag: '🇩🇪' },
  { value: 'zh', label: 'Chinese', flag: '🇨🇳' },
  { value: 'ja', label: 'Japanese', flag: '🇯🇵' },
];

const FEATURES = [
  { value: 'authentication', label: 'User Authentication', icon: '🔐' },
  { value: 'database', label: 'Database Integration', icon: '💾' },
  { value: 'api', label: 'REST API', icon: '🔌' },
  { value: 'responsive', label: 'Responsive Design', icon: '📱' },
  { value: 'darkmode', label: 'Dark Mode', icon: '🌙' },
  { value: 'realtime', label: 'Real-time Features', icon: '⚡' },
  { value: 'payments', label: 'Payment Integration', icon: '💳' },
  { value: 'analytics', label: 'Analytics Dashboard', icon: '📊' },
  { value: 'search', label: 'Search Functionality', icon: '🔍' },
  { value: 'notifications', label: 'Push Notifications', icon: '🔔' },
];

const DATABASES = [
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'firebase', label: 'Firebase' },
  { value: 'supabase', label: 'Supabase' },
];

const DEPLOYMENT_PLATFORMS = [
  { value: 'vercel', label: 'Vercel', description: 'Frontend applications' },
  { value: 'netlify', label: 'Netlify', description: 'Static sites and JAMstack' },
  { value: 'render', label: 'Render', description: 'Full-stack applications' },
  { value: 'railway', label: 'Railway', description: 'Backend services' },
  { value: 'fly', label: 'Fly.io', description: 'Global deployment' },
];

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [config, setConfig] = useState<ProjectConfig>({
    projectName: '',
    framework: 'next',
    language: 'en',
    features: [],
    deployment: 'vercel',
    description: ''
  });
  
  const [generatedProject, setGeneratedProject] = useState<GeneratedProject | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<'config' | 'generating' | 'complete'>('config');
  const [generationLog, setGenerationLog] = useState<string[]>([]);
  const [designIdeas, setDesignIdeas] = useState<DesignIdea[]>([]);
  const [showDesignIdeas, setShowDesignIdeas] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaContent, setNewIdeaContent] = useState('');
  const [editingIdea, setEditingIdea] = useState<string | null>(null);

  const addToLog = (message: string) => {
    setGenerationLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedIdeas = localStorage.getItem('designIdeas');
      if (savedIdeas) {
        try {
          setDesignIdeas(JSON.parse(savedIdeas));
        } catch (error) {
          console.error('Failed to parse saved design ideas:', error);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('designIdeas', JSON.stringify(designIdeas));
    }
  }, [designIdeas]);

  const addDesignIdea = () => {
    if (!newIdeaTitle.trim() && !newIdeaContent.trim()) return;
    
    const newIdea: DesignIdea = {
      id: Date.now().toString(),
      title: newIdeaTitle.trim() || 'Untitled Idea',
      content: newIdeaContent.trim(),
      timestamp: new Date().toISOString(),
      projectContext: config.projectName || 'No project selected'
    };

    setDesignIdeas(prev => [newIdea, ...prev]);
    setNewIdeaTitle('');
    setNewIdeaContent('');
  };

  const deleteDesignIdea = (id: string) => {
    setDesignIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  const updateDesignIdea = (id: string, title: string, content: string) => {
    setDesignIdeas(prev => 
      prev.map(idea => 
        idea.id === id 
          ? { ...idea, title: title.trim() || 'Untitled Idea', content: content.trim() }
          : idea
      )
    );
    setEditingIdea(null);
  };

  const generateProject = async () => {
    if (!config.projectName || !config.framework) {
      alert('Please fill in project name and select a framework');
      return;
    }

    setIsGenerating(true);
    setCurrentStep('generating');
    setGenerationLog([]);
    
    addToLog('🚀 Starting AI code generation...');

    try {
      addToLog('🤖 Analyzing project requirements...');
      let fullPrompt = `Project: ${config.projectName}\nFramework: ${config.framework}\nContent Language: ${config.language}\nFeatures: ${config.features.join(', ')}\nDatabase: ${config.database || 'None'}\nAuthentication: ${config.authentication ? 'Yes' : 'No'}\nDeployment: ${config.deployment}`;
      if(config.description) {
        fullPrompt += `\nDescription: ${config.description}`;
      }
      
      const stream = await generateCodeStreaming({
        description: fullPrompt,
        features: config.features,
        framework: config.framework
      });
      
      addToLog('💡 Generating code architecture...');
      let projectCode = '';
      for (const chunk of stream) {
        projectCode += chunk;
      }

      addToLog('✅ Code generation completed');
      addToLog('📁 Parsing generated files...');
      
      const files = parseGeneratedCode(projectCode);
      
      addToLog(`📄 Generated ${files.length} project files`);

      addToLog('🐙 Creating GitHub repository (simulation)...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const githubUrl = `https://github.com/ai-generated/${config.projectName.toLowerCase().replace(/\s+/g, '-')}`;
      
      addToLog('🚀 Setting up deployment pipeline (simulation)...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      const deploymentUrl = `https://${config.projectName.toLowerCase().replace(/\s+/g, '-')}.${config.deployment}.app`;
      
      addToLog('🎉 Project successfully generated and deployed!');

      setGeneratedProject({
        code: projectCode,
        files,
        githubUrl,
        deploymentUrl
      });

      setCurrentStep('complete');
    } catch (error) {
      console.error('❌ Project generation failed:', error);
      addToLog(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      alert('Failed to generate project. Please try again.');
      setCurrentStep('config');
    } finally {
      setIsGenerating(false);
    }
  };

  const parseGeneratedCode = (code: string): Array<{ name: string; content: string }> => {
    const files: Array<{ name: string; content: string }> = [];
    
    // This regex is a bit more robust to handle filenames with dots and paths
    const fileBlocks = code.split(/(?=```(?:[a-zA-Z0-9]+)?\s*\/\/\s*[\w\/\.-]+)/g);
    
    fileBlocks.forEach(block => {
      // Regex to capture language (optional), filename, and content
      const match = block.match(/```(?:[a-zA-Z0-9]+)?\s*\/\/\s*([\w\/\.-]+)\s*\n([\s\S]*?)```/);
      if (match && match[1] && match[2]) {
        files.push({
          name: match[1].trim(),
          content: match[2].trim()
        });
      }
    });

    if (files.length === 0 && code.trim().length > 0) {
        files.push({ name: 'app/page.tsx', content: code.trim() });
        files.push({ name: 'package.json', content: `{\n  "name": "${config.projectName.toLowerCase().replace(/\s+/g, '-')}",\n  "version": "1.0.0",\n "description": "Generated by CodeAI"\n}` });
        files.push({ name: 'README.md', content: `# ${config.projectName}\n\nThis project was generated by CodeAI.` });
    }

    return files;
  };

  const downloadProject = async () => {
    if (!generatedProject) return;

    addToLog('📦 Creating ZIP file...');
    const zip = new JSZip();
    generatedProject.files.forEach(file => {
      zip.file(file.name, file.content);
    });
    
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${config.projectName.toLowerCase().replace(/\s+/g, '-')}.zip`);
      addToLog('✅ Download started.');
    } catch (error) {
      console.error("Error creating zip file", error);
      addToLog('❌ Failed to create ZIP file.');
    }
  };

  const resetGenerator = () => {
    setConfig({
      projectName: '',
      framework: 'next',
      language: 'en',
      features: [],
      deployment: 'vercel',
      description: '',
    });
    setGeneratedProject(null);
    setCurrentStep('config');
    setGenerationLog([]);
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <Loader2 className="h-12 w-12 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CodeAILogo className="h-8 w-8" />
            <span className="font-bold sm:inline-block text-lg">
              CodeAI
            </span>
          </Link>
          <div className="flex flex-1 items-center justify-end">
            <Button asChild>
              <Link href="/project/sample-project">My Workspace</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {currentStep === 'config' && (
          <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                Project Configuration
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={config.projectName}
                    onChange={(e) => setConfig(prev => ({ ...prev, projectName: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="My Awesome App"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Content Language
                  </label>
                  <select
                    value={config.language}
                    onChange={(e) => setConfig(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.value} value={lang.value}>
                        {lang.flag} {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

               <div className="mt-6">
                 <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Description
                  </label>
                  <textarea
                    value={config.description}
                    onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the application you want to build..."
                    rows={3}
                  />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Framework / Technology
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FRAMEWORKS.map(fw => (
                    <button
                      key={fw.value}
                      onClick={() => setConfig(prev => ({ ...prev, framework: fw.value }))}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        config.framework === fw.value
                          ? 'border-blue-500 bg-blue-500/20 text-blue-200'
                          : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-medium">{fw.label}</div>
                      <div className="text-sm text-slate-400 mt-1">{fw.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Features to Include
                  </label>
                  <select
                    value={config.features.length > 0 ? config.features[config.features.length - 1] : ''}
                    onChange={(e) => {
                      const selectedFeature = e.target.value;
                      if (selectedFeature && !config.features.includes(selectedFeature)) {
                        setConfig(prev => ({ ...prev, features: [...prev.features, selectedFeature] }));
                      }
                      e.target.value = '';
                    }}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a feature to add</option>
                    {FEATURES.filter(feature => !config.features.includes(feature.value)).map(feature => (
                      <option key={feature.value} value={feature.value}>
                        {feature.icon} {feature.label}
                      </option>
                    ))}
                  </select>
                  {config.features.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-slate-400 mb-2">Selected features:</p>
                      <div className="flex flex-wrap gap-1">
                        {config.features.map(featureValue => {
                          const feature = FEATURES.find(f => f.value === featureValue);
                          return feature ? (
                            <span
                              key={featureValue}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded border border-green-500/30"
                            >
                              {feature.icon} {feature.label}
                              <button
                                onClick={() => setConfig(prev => ({ ...prev, features: prev.features.filter(f => f !== featureValue) }))}
                                className="ml-1 text-green-300 hover:text-green-100"
                              >
                                ×
                              </button>
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Database (Optional)
                  </label>
                  <select
                    value={config.database || ''}
                    onChange={(e) => setConfig(prev => ({ ...prev, database: e.target.value || undefined }))}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">No Database</option>
                    {DATABASES.map(db => (
                      <option key={db.value} value={db.value}>{db.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Deployment Platform
                  </label>
                  <select
                    value={config.deployment}
                    onChange={(e) => setConfig(prev => ({ ...prev, deployment: e.target.value }))}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {DEPLOYMENT_PLATFORMS.map(platform => (
                      <option key={platform.value} value={platform.value}>
                        {platform.label} - {platform.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={generateProject}
                  disabled={!config.projectName || !config.framework}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Generate Project with AI
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Design Ideas & Notes
                </h2>
                <button
                  onClick={() => setShowDesignIdeas(!showDesignIdeas)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {showDesignIdeas ? 'Hide' : 'Show'} ({designIdeas.length})
                </button>
              </div>

              {showDesignIdeas && (
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Idea title (optional)"
                        value={newIdeaTitle}
                        onChange={(e) => setNewIdeaTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Share your design ideas, feature suggestions, or any thoughts..."
                        value={newIdeaContent}
                        onChange={(e) => setNewIdeaContent(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={addDesignIdea}
                          disabled={!newIdeaTitle.trim() && !newIdeaContent.trim()}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Idea
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {designIdeas.length === 0 ? (
                      <div className="text-center py-8 text-slate-400">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No design ideas yet. Add your first idea above!</p>
                      </div>
                    ) : (
                      designIdeas.map((idea) => (
                        <div
                          key={idea.id}
                          className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
                        >
                          {editingIdea === idea.id ? (
                            <EditIdeaForm
                              idea={idea}
                              onSave={updateDesignIdea}
                              onCancel={() => setEditingIdea(null)}
                            />
                          ) : (
                            <>
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-medium text-white">{idea.title}</h3>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingIdea(idea.id)}
                                    className="text-slate-400 hover:text-blue-400 transition-colors"
                                    title="Edit idea"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteDesignIdea(idea.id)}
                                    className="text-slate-400 hover:text-red-400 transition-colors"
                                    title="Delete idea"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              {idea.content && (
                                <p className="text-slate-300 text-sm mb-3 whitespace-pre-wrap">
                                  {idea.content}
                                </p>
                              )}
                              <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Project: {idea.projectContext}</span>
                                <span>{new Date(idea.timestamp).toLocaleDateString()} at {new Date(idea.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 'generating' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating Your Project...
              </h2>
              
              <div className="bg-slate-900/50 rounded-lg p-4 h-64 overflow-y-auto">
                <div className="font-mono text-sm">
                  {generationLog.map((log, index) => (
                    <div key={index} className="text-slate-300 mb-1">
                      {log}
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="text-blue-400 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Processing...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'complete' && generatedProject && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Project Generated Successfully!
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub Repository
                    </h3>
                    <a
                      href={generatedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 break-all"
                    >
                      {generatedProject.githubUrl}
                    </a>
                  </div>
                  
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Live Website
                    </h3>
                    <a
                      href={generatedProject.deploymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 break-all"
                    >
                      {generatedProject.deploymentUrl}
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Project Files</h3>
                    <div className="text-sm text-slate-300">
                      {generatedProject.files.length} files generated
                    </div>
                    <div className="mt-2 space-y-1">
                      {generatedProject.files.slice(0, 5).map((file, index) => (
                        <div key={index} className="text-xs text-slate-400">
                          📄 {file.name}
                        </div>
                      ))}
                      {generatedProject.files.length > 5 && (
                        <div className="text-xs text-slate-500">
                          ... and {generatedProject.files.length - 5} more files
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={downloadProject}
                  className="flex-1 bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Project Files
                </button>
                
                <button
                  onClick={resetGenerator}
                  className="flex-1 bg-slate-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Generate Another Project
                </button>
              </div>

              <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Generation Log</h3>
                <div className="font-mono text-xs max-h-40 overflow-y-auto">
                  {generationLog.map((log, index) => (
                    <div key={index} className="text-slate-400 mb-1">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              Powered by CodeAI • Built with Next.js
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <span>🚀 Automatic GitHub deployment</span>
              <span>⚡ AI-powered code generation</span>
              <span>🌍 Multi-language support</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function EditIdeaForm({ 
  idea, 
  onSave, 
  onCancel 
}: { 
  idea: DesignIdea;
  onSave: (id: string, title: string, content: string) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(idea.title);
  const [content, setContent] = useState(idea.content);

  const handleSave = () => {
    onSave(idea.id, title, content);
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Idea title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Idea content"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="text-slate-400 hover:text-white px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
        >
          <Save className="w-3 h-3" />
          Save
        </button>
      </div>
    </div>
  );
}

    