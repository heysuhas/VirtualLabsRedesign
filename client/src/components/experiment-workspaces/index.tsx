import SortingWorkspace from "./sorting-workspace";
import DataStructureWorkspace from "./data-structure-workspace";
import CryptographyWorkspace from "./cryptography-workspace";
import NlpWorkspace from "./nlp-workspace";
import GraphWorkspace from "./graph-workspace";
import type { Experiment } from "@shared/schema";

interface ExperimentWorkspaceProps {
  experiment: Experiment;
}

export default function ExperimentWorkspace({ experiment }: ExperimentWorkspaceProps) {
  // Choose the appropriate workspace based on experiment title/type
  switch (experiment.title) {
    case "Bubble Sort":
    case "Merge Sort":
      return <SortingWorkspace experiment={experiment} />;

    case "Stacks and Queues":
    case "Linked Lists":
      return <DataStructureWorkspace experiment={experiment} />;

    case "Breaking the Shift Cipher":
    case "Symmetric Key Encryption Standards (DES)":
      return <CryptographyWorkspace experiment={experiment} />;

    case "Word Analysis":
      return <NlpWorkspace experiment={experiment} />;

    case "Depth First Search":
      return <GraphWorkspace experiment={experiment} />;

    default:
      return <div>Experiment workspace not found</div>;
  }
}