export interface Role {
  period: string;
  title: string;
  org: string;
  detail: string;
}

export const experience: Role[] = [
  {
    period: 'Jan 2026 - Present',
    title: 'Control Systems Engineer',
    org: 'ARMATRIX · Full-time',
    detail:
      'At ARMATRIX, I lead a team of 5 engineers, architecting the end-to-end software stack for the robotic arm. I designed a hierarchical 3-layer control stack running at 20 Hz that cut tracking error by 96% and MPC solve time by 82%, with recursive feasibility guaranteed via convex decomposition and geometric refinement for safe navigation at sub-5 cm clearance. I developed deterministic 24-DOF SE(3) path planning with real-time collision checking using Sobol-sampled D-PRM*, and architected a zero-copy POSIX shared-memory transport layer, lock-free seqlock reads for the C++ real-time loops with a semaphore-blocked Python bridge, hardened by compile-time schema validation to eliminate silent memory corruption. I also engineered a high-fidelity MuJoCo simulation environment, bridging the Sim2Real gap through physics modeling and system identification.',
  },
  {
    period: 'May 2025 - Aug 2025',
    title: 'Robotics Intern',
    org: 'Neocis Inc.',
    detail:
      "As a Robotics Intern at Neocis, I engineered an analytical dynamic model for the 7-DOF YOMI surgical robot arm, leveraging RNEA, CRBA, and System ID techniques. This high-fidelity model was instrumental in implementing Computed Torque control, which enabled advanced compliant behaviors. My contributions directly supported a strategic initiative to reduce the YOMI's production cost by 20%. I also designed critical CAD models for PCB fixtures to integrate new encoders into the arm's control system.",
  },
  {
    period: 'Mar 2023 - Dec 2023',
    title: 'Research Scholar',
    org: 'Carnegie Mellon University',
    detail:
      'During my research at Carnegie Mellon University, I architected and implemented a novel Heuristic-Search algorithm in C++ to solve resource-constrained shortest path problems. By incorporating advanced techniques like dominance criteria and partial path pruning, my solution achieved a 2-8x performance increase over the existing baseline. Moreover, I also worked on testing algorithms developed by a colleague and to validate these findings in a real-world context, I developed a ROS2 framework to benchmark my algorithm against others, proving its superior efficiency in autonomous systems.',
  },
  {
    period: 'June 2022 - July 2022',
    title: 'Design Intern',
    org: 'Pacify Medical Technologies',
    detail:
      'At Pacify Medical Technologies, I led the design of a compact syringe-gun injection mechanism. Using SolidWorks, I engineered a new holder and nozzle assembly that achieved a 25% reduction in size. To enhance device reliability, I integrated a force-sensitive resistor with an Arduino to provide active load measurement, effectively preventing breakage under operational stress. My role also involved collaborating with suppliers to source materials, which successfully reduced a potential budget overrun by 5%.',
  },
];

/** The career-transition highlight rendered between the first and second roles. */
export const careerBreak = {
  heading: 'Strategic Career Move',
  body:
    "Following my time at Columbia and CMU, I've chosen to return to India to focus on deep-tech robotics. For me, this move is about prioritizing engineering substance over geography. My experiences in the US, from developing surgical robotics to engineering advanced pathfinding algorithms, honed my ability to bridge first-principles math with real-world hardware deployment. I'm excited to bring that technical rigor home to solve complex problems and contribute to the growth of India's robotics ecosystem.",
  note: 'Bringing learnings from the USA back home',
};
