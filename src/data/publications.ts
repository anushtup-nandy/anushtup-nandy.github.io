export interface Publication {
  title: string;
  /** Author list as HTML — `<strong>` wraps Anushtup. */
  authors: string;
  venue: string;
  pdf: string;
}

export const publications: Publication[] = [
  {
    title: 'Heuristic Search for Path Finding With Refuelling',
    authors: 'S. Zhao, <strong>A. Nandy</strong>, H. Choset, S. Rathinam and Z. Ren',
    venue: 'IEEE Robotics and Automation Letters, vol. 10, no. 4, April 2025',
    pdf: '/pdfs/Heuristic search .pdf',
  },
  {
    title: 'Maze Solving Using Deep Q-Network',
    authors: '<strong>Anushtup Nandy</strong>, Subash Sehsashtri, Abhishek Sarkar',
    venue: 'Advances In Robotics - 6th Intl. Conference of The Robotics Society (AIR 2023)',
    pdf: '/pdfs/DQN_maze_solver.pdf',
  },
  {
    title: 'DMS*: Towards Minimizing Makespan for Multi-Agent Combinatorial Path Finding',
    authors: 'Zhongqiang Ren, <strong>Anushtup Nandy</strong>, Sivakumar Rathinam, and Howie Choset',
    venue: 'IEEE Robotics and Automation Letters 9.9 (2024)',
    pdf: '/pdfs/DMS_Minimizing Makespan Multi-Agent Combinatorial Path Finding.pdf',
  },
];
