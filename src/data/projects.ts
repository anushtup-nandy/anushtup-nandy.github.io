export type Category = 'robotics' | 'ai-ml' | 'web' | 'research';

export interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  github: string;
}

export interface Project {
  title: string;
  description: string;
  categories: Category[];
  /** Display label shown on the card tag. */
  badge: 'Robotics' | 'AI/ML' | 'Web' | 'Research';
  tags: string[];
  image?: string;
  github?: string;
  /** Use instead of a github link for publication-backed work. */
  publication?: string;
  featured?: boolean;
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'ChemsynthAI',
    description:
      'Comprehensive, AI-powered web platform fundamentally accelerating chemical synthesis research. Integrating literature analysis, hybrid synthesis planning, reaction optimization, and logistical cost analysis into a cohesive workflow blending cheminformatics with deep learning.',
    image: '/images/chemsynth_step.jpeg',
    alt: 'ChemsynthAI synthesis planning interface',
    tags: ['Foundation Model', 'Bayesian Opt', 'Retrosynthesis', 'Cheminformatics', 'Deep Learning', 'Reinforcement Learning'],
    github: 'https://github.com/anushtup-nandy/Chemsynth',
  },
  {
    title: 'Bio-Inspired Undulatory Fin',
    description:
      'Bio-mimetic underwater robot achieving locomotion through a stingray-inspired undulating fin mechanism. Engineered using Arduino/servos with a 3x3 factorial experiment in a water tunnel, quantifying thrust using NI DAQ and load cells for efficient underwater propulsion.',
    image: '/images/sample-prot.jpg',
    alt: 'Bio-inspired undulatory fin prototype',
    tags: ['Micro-Controller', 'Mechatronics', 'Controls', 'Fluid Dynamics', 'Experimental Design', 'Data Acquisition'],
    github: 'https://github.com/anushtup-nandy/Undulating-fin',
  },
];

export const projects: Project[] = [
  {
    title: 'ChemsynthAI',
    description:
      'AI-powered web platform designed to accelerate chemical synthesis research. Integrates literature analysis, multiple retrosynthesis strategies, reaction optimization via Bayesian methods, and logistical planning into a cohesive workflow.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['Retrosynthesis', 'Bayesian Optimization', 'Knowledge Graphs'],
    image: '/images/chemsynth.jpeg',
    github: 'https://github.com/anushtup-nandy/Chemsynth',
    featured: true,
  },
  {
    title: 'Transformer-based MPC for 7DoF Arm',
    description:
      'Transformer MPC controller achieving 97.5% MSE reduction and 84% RMSE improvement over baseline tracking — multi-head self-attention trained on 20K PyBullet samples, deployed in CasADi at a 0.05s control rate.',
    categories: ['robotics', 'research'],
    badge: 'Robotics',
    tags: ['Transformers', 'MPC', 'CasADi'],
    github: 'https://github.com/anushtup-nandy/Transformer-based-MPC-for-7DoF-Robotic-Arm',
  },
  {
    title: 'Heuristic Search for RSCPP',
    description:
      'Developed an A*-like algorithm in C++ to solve resource-constrained shortest path problems with fuel constraints, outperforming baselines by 2-8x.',
    categories: ['research'],
    badge: 'Research',
    tags: ['C++', 'Motion Planning', 'ROS2'],
    image: '/images/RFastar.png',
    publication: 'See Publication',
  },
  {
    title: 'Agentic Personal Assistant Team',
    description:
      'Multi-agent system with specialized AI agents working collaboratively to handle diverse personal assistant tasks using LLMs and tool-based reasoning.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['Multi-Agent Systems', 'LLMs', 'RAG'],
    github: 'https://github.com/anushtup-nandy/Agentic-Personal-Assistant-team',
  },
  {
    title: 'ScholarSync',
    description:
      'Collaboration platform for researchers featuring real-time document editing, reference management, and automated citation formatting for academic teams.',
    categories: ['web'],
    badge: 'Web',
    tags: ['React', 'WebSockets', 'MongoDB'],
    github: 'https://github.com/anushtup-nandy/ScholarSync',
  },
  {
    title: 'Bio-Inspired Undulatory Fin',
    description:
      'Designed a robotic fin mimicking stingray motion for efficient, low-acoustic underwater propulsion, securing ₹2 lakhs funding.',
    categories: ['robotics'],
    badge: 'Robotics',
    tags: ['Arduino', 'CAD', 'Controls'],
    image: '/images/sample-prot.jpg',
    github: 'https://github.com/anushtup-nandy/Undulating-fin',
  },
  {
    title: 'NeuroSymbolic AI Research',
    description:
      'Combining neural networks with symbolic reasoning to create hybrid AI systems capable of both learning from data and logical inference.',
    categories: ['ai-ml', 'research'],
    badge: 'AI/ML',
    tags: ['Neural-Symbolic', 'Logic', 'PyTorch'],
    github: 'https://github.com/anushtup-nandy/NeuroSymbolicAI-Personal',
  },
  {
    title: 'VitalMesh',
    description:
      'Intelligent healthcare communication with AI voice agents for triage, real-time EHR integration, and multi-agent processing using Coral MCP protocol.',
    categories: ['ai-ml', 'web'],
    badge: 'Web',
    tags: ['HealthTech', 'MCP', 'Voice AI'],
    image: '/images/VitalMesh.png',
    github: 'https://github.com/anushtup-nandy/VitalMesh',
  },
  {
    title: 'Tribal Knowledge Vision',
    description:
      'Computer vision system for capturing and digitizing tacit manufacturing knowledge, enabling knowledge transfer and process optimization in industrial settings.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['Computer Vision', 'OpenCV', 'Knowledge Capture'],
    github: 'https://github.com/anushtup-nandy/tribal-knowledge-vision',
  },
  {
    title: 'Haptic Teleoperation & Postural Control',
    description:
      'PD-based haptic teleoperation for the pWRAPS rehabilitation robot enabling remote SCI therapy — 3-DOF seated-posture impedance modeled via System ID and Gaussian processes (MoGP), with AR/VR feedback.',
    categories: ['robotics'],
    badge: 'Robotics',
    tags: ['Haptics', 'Gaussian Processes', 'HRI'],
    image: '/images/Haptic.png',
    publication: 'Publication Pending',
  },
  {
    title: 'Asclios',
    description:
      'AI-driven health monitoring system integrating wearable sensor data with predictive analytics for personalized wellness insights.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['IoT', 'ML', 'Data Analytics'],
    github: 'https://github.com/anushtup-nandy/Asclios',
  },
  {
    title: 'Stewart Platform Kinematics',
    description:
      'Interactive 3D visualization tool for 6-DOF parallel manipulator with real-time IK solver and stability analysis.',
    categories: ['robotics'],
    badge: 'Robotics',
    tags: ['Parallel Kinematics', 'Control', 'Stability'],
    image: '/images/stewart.png',
    github: 'https://github.com/anushtup-nandy/stewart-platform-IK-gui/tree/main',
  },
  {
    title: 'Cognitive Digital Twin',
    description:
      'AI-powered digital twin framework for real-time manufacturing optimization using LLMs and reinforcement learning for adaptive decision-making.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['Digital Twin', 'LLMs', 'RL'],
    github: 'https://github.com/anushtup-nandy/cognitive-digital-twin',
  },
  {
    title: 'Path Planning via Deep RL',
    description:
      'Formulated a DQN-based planning algorithm for mobile robots in unknown environments, leading to an ACM AIR 2023 publication.',
    categories: ['ai-ml', 'research'],
    badge: 'Research',
    tags: ['Reinforcement Learning', 'PyTorch'],
    image: '/images/rl-dqn.png',
    publication: 'See Publication',
  },
  {
    title: 'Sunnovation Platform',
    description:
      'Web application for solar energy optimization and monitoring with real-time analytics and predictive maintenance features.',
    categories: ['web'],
    badge: 'Web',
    tags: ['React', 'IoT', 'Analytics'],
    github: 'https://github.com/anushtup-nandy/sunnovation-app',
  },
  {
    title: 'Validation of DMS* & MS*',
    description:
      'Validated combinatorial search algorithms on ROSbots, proving DMS* is 2x faster by better distributing intermediate targets.',
    categories: ['research'],
    badge: 'Research',
    tags: ['Path Planning', 'ROS'],
    image: '/images/dms.png',
    publication: 'See Publication',
  },
  {
    title: 'Image-2-3D Reconstruction',
    description:
      'Deep learning pipeline for generating 3D models from 2D images using neural radiance fields and diffusion models.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['NeRF', 'Diffusion Models', '3D Vision'],
    github: 'https://github.com/anushtup-nandy/Image-2-3D',
  },
  {
    title: 'Local LLM Personal Assistant',
    description:
      'Privacy-focused personal assistant running LLMs locally with tool integration, knowledge base, and task automation capabilities.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['LLMs', 'Local Inference', 'Ollama'],
    github: 'https://github.com/anushtup-nandy/localllm-personal-assistant',
  },
  {
    title: 'Single Legged Raibert Hopper',
    description:
      'Designed a Raibert Hopper in URDF and implemented a PID controller for balance and navigation using an inverted pendulum gait.',
    categories: ['robotics'],
    badge: 'Robotics',
    tags: ['Legged Robotics', 'Controls', 'URDF'],
    image: '/images/hopper.png',
    github: 'https://github.com/anushtup-nandy/Hopper_robot',
  },
  {
    title: 'Delta Parallel Robot',
    description:
      'Developed a Delta robot from concept to hardware using 3D printing, acrylics, and a PID controller with an Arduino Mega.',
    categories: ['robotics'],
    badge: 'Robotics',
    tags: ['Parallel Robotics', 'CAD', 'Arduino'],
    image: '/images/Delta_img.jpg',
    github: 'https://github.com/anushtup-nandy/Delta-Robot-project',
  },
  {
    title: 'LLM Aero Input Generator',
    description:
      'LLM-based tool for generating CFD simulation inputs and parameter configurations for aerospace applications using natural language.',
    categories: ['ai-ml'],
    badge: 'AI/ML',
    tags: ['LLMs', 'CFD', 'Code Generation'],
    github: 'https://github.com/anushtup-nandy/llm-aero-input-generator',
  },
];
